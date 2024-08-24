import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from '@prisma/client';
import logger from 'winston.config';

@Injectable()
export class RolePermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermission> {
    try {
      const newRolePermission = await this.prisma.rolePermission.create({
        data: createRolePermissionDto,
      });
      return newRolePermission;
    } catch (error) {
      logger.error(`Failed to create role-permission: ${error.message}`);
      throw new InternalServerErrorException('Failed to create role-permission');
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: RolePermission[]; totalCount: number }> {
    try {
      const [rolePermissions, totalCount] = await Promise.all([
        this.prisma.rolePermission.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        this.prisma.rolePermission.count(),
      ]);
      return { data: rolePermissions, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve role-permissions: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve role-permissions');
    }
  }

  async findOne(id: number): Promise<RolePermission> {
    try {
      const rolePermission = await this.prisma.rolePermission.findUnique({
        where: { id },
      });
      if (!rolePermission) {
        throw new NotFoundException(`RolePermission with ID ${id} not found`);
      }
      return rolePermission;
    } catch (error) {
      logger.error(`Failed to retrieve role-permission with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to retrieve role-permission with ID ${id}`);
    }
  }

  async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission> {
    try {
      const updatedRolePermission = await this.prisma.rolePermission.update({
        where: { id },
        data: updateRolePermissionDto,
      });
      return updatedRolePermission;
    } catch (error) {
      logger.error(`Failed to update role-permission with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update role-permission with ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.prisma.rolePermission.delete({
        where: { id },
      });
    } catch (error) {
      logger.error(`Failed to remove role-permission with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to remove role-permission with ID ${id}`);
    }
  }
}
