import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customer.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersRepository, PrismaService],
})
export class CustomersModule {}
