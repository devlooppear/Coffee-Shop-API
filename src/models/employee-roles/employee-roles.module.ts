import { Module } from '@nestjs/common';
import { EmployeeRolesRepository } from './employee-roles.repository';
import { EmployeeRolesController } from './employee-roles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesRepository, PrismaService],
})
export class EmployeeRolesModule {}
