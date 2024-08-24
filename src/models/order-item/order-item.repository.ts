import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import logger from 'winston.config';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const newOrderItem = await this.prisma.orderItem.create({
        data: createOrderItemDto,
      });
      return { data: newOrderItem };
    } catch (error) {
      logger.error(`Failed to create order item: ${error.message}`);
      throw new InternalServerErrorException('Failed to create order item');
    }
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const [orderItems, totalCount] = await Promise.all([
        this.prisma.orderItem.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        this.prisma.orderItem.count(),
      ]);
      return { data: orderItems, totalCount, page, pageSize };
    } catch (error) {
      logger.error(`Failed to retrieve order items: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve order items');
    }
  }

  async findOne(id: number) {
    try {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: { id },
      });
      if (!orderItem) {
        logger.warn(`Order item with ID ${id} not found`);
        throw new NotFoundException(`Order item with ID ${id} not found`);
      }
      return { data: orderItem };
    } catch (error) {
      logger.error(
        `Failed to retrieve order item with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to retrieve order item with ID ${id}`,
      );
    }
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const orderItem = await this.prisma.orderItem.update({
        where: { id },
        data: updateOrderItemDto,
      });
      return { data: orderItem };
    } catch (error) {
      if (error.code === 'P2025') {
        logger.warn(`Order item with ID ${id} not found for update`);
        throw new NotFoundException(`Order item with ID ${id} not found`);
      }
      logger.error(
        `Failed to update order item with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to update order item with ID ${id}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id); 
      await this.prisma.orderItem.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(
        `Failed to remove order item with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to remove order item with ID ${id}`,
      );
    }
  }
}
