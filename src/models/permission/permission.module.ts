import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionRepository, PrismaService],
})
export class PermissionModule {}
