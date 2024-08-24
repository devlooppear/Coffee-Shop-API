import { Module } from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesRepository, PrismaService],
})
export class EmployeesModule {}
