import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import logger from 'winston.config';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<{ data: Product }> {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          stock: createProductDto.stock,
          categoryId: createProductDto.categoryId,
        },
        include: { category: true }, 
      });
      return { data: newProduct };
    } catch (error) {
      logger.error(`Failed to create product: ${error.message}`);
      throw new InternalServerErrorException('Failed to create product');
    }
  }
  
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Product[], totalCount: number }> {
    try {
      const [products, totalCount] = await Promise.all([
        this.prisma.product.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: { category: true }, 
        }),
        this.prisma.product.count(),
      ]);
      return { data: products, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve products: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findOne(id: number): Promise<{ data: Product }> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: { category: true }, 
      });
      if (!product) {
        logger.warn(`Product with ID ${id} not found`);
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { data: product };
    } catch (error) {
      logger.error(`Failed to retrieve product with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to retrieve product with ID ${id}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<{ data: Product }> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          stock: updateProductDto.stock,
          categoryId: updateProductDto.categoryId,
        },
        include: { category: true }, 
      });
      return { data: updatedProduct };
    } catch (error) {
      logger.error(`Failed to update product with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update product with ID ${id}`);
    }
  }
  

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id); 
      await this.prisma.product.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(`Failed to remove product with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to remove product with ID ${id}`);
    }
  }
}
