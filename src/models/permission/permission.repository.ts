import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class PermissionRepository {
  private readonly logger = new Logger(PermissionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    try {
      return await this.prisma.permission.create({
        data: createPermissionDto,
      });
    } catch (error) {
      this.logger.error(`Failed to create permission: ${error.message}`);
      throw new InternalServerErrorException('Failed to create permission');
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Permission[]; total: number }> {
    try {
      const [permissions, total] = await this.prisma.$transaction([
        this.prisma.permission.findMany({
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.permission.count(),
      ]);

      return {
        data: permissions,
        total,
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve permissions: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve permissions');
    }
  }

  async findOne(id: number): Promise<Permission | null> {
    try {
      return await this.prisma.permission.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to retrieve permission with id ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve permission');
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    try {
      return await this.prisma.permission.update({
        where: { id },
        data: updatePermissionDto,
      });
    } catch (error) {
      this.logger.error(`Failed to update permission with id ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to update permission');
    }
  }

  async remove(id: number): Promise<Permission> {
    try {
      return await this.prisma.permission.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete permission with id ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete permission');
    }
  }
}
