import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import logger from 'winston.config';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<{ data: Role }> {
    try {
      const newRole = await this.prisma.role.create({
        data: createRoleDto,
      });
      return { data: newRole };
    } catch (error) {
      logger.error(`Failed to create role: ${error.message}`);
      throw new InternalServerErrorException('Failed to create role');
    }
  }

  async findAll(): Promise<{ data: Role[] }> {
    try {
      const roles = await this.prisma.role.findMany();
      return { data: roles };
    } catch (error) {
      logger.error(`Failed to retrieve roles: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve roles');
    }
  }

  async findOne(id: number): Promise<{ data: Role }> {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id },
      });
      if (!role) {
        logger.warn(`Role with ID ${id} not found`);
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
      return { data: role };
    } catch (error) {
      logger.error(`Failed to retrieve role with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to retrieve role with ID ${id}`);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<{ data: Role }> {
    try {
      const updatedRole = await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });
      return { data: updatedRole };
    } catch (error) {
      logger.error(`Failed to update role with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update role with ID ${id}`);
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.role.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(`Failed to remove role with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to remove role with ID ${id}`);
    }
  }
}
