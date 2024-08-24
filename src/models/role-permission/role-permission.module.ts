import { Module } from '@nestjs/common';
import { RolePermissionRepository } from './role-permission.repository';
import { RolePermissionController } from './role-permission.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionRepository, PrismaService],
})
export class RolePermissionModule {}
