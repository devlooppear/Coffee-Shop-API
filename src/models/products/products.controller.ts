import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      const result = await this.productsRepository.create(createProductDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
    @Res() res: Response
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page or pageSize parameters');
    }

    try {
      const result = await this.productsRepository.findAll(pageNumber, pageSizeNumber);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Error retrieving products:', error);
      throw new InternalServerErrorException('Failed to retrieve products: ' + error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.productsRepository.findOne(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error retrieving product with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to retrieve product with ID ${id}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productsRepository.update(+id, updateProductDto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to update product with ID ${id}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.productsRepository.remove(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error(`Error removing product with ID ${id}:`, error);
      throw new InternalServerErrorException(`Failed to remove product with ID ${id}`);
    }
  }
}
