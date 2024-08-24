import { Module } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersRepository, PrismaService],
})
export class OrdersModule {}
