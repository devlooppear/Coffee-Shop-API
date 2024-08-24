import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [RolesRepository, PrismaService],
})
export class RolesModule {}
