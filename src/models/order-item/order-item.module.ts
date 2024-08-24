import { Module } from '@nestjs/common';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemController } from './order-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemRepository, PrismaService],
})
export class OrderItemModule {}
