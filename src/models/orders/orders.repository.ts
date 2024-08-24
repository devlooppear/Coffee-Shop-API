import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import logger from 'winston.config';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<{ data: Order }> {
    try {
      const newOrder = await this.prisma.order.create({
        data: createOrderDto,
      });
      return { data: newOrder };
    } catch (error) {
      logger.error(`Failed to create order: ${error.message}`);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Order[], totalCount: number }> {
    try {
      const [orders, totalCount] = await Promise.all([
        this.prisma.order.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        this.prisma.order.count(),
      ]);
      return { data: orders, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve orders: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async findOne(id: number): Promise<{ data: Order }> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!order) {
        logger.warn(`Order with ID ${id} not found`);
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return { data: order };
    } catch (error) {
      logger.error(`Failed to retrieve order with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to retrieve order with ID ${id}`);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<{ data: Order }> {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
      });
      return { data: updatedOrder };
    } catch (error) {
      logger.error(`Failed to update order with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update order with ID ${id}`);
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.order.delete({
        where: { id },
      });
      return { data: null }; 
    } catch (error) {
      logger.error(`Failed to remove order with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to remove order with ID ${id}`);
    }
  }
}
