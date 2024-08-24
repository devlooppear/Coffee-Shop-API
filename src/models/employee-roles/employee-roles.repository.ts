import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';
import { EmployeeRole } from './entities/employee-role.entity';
import logger from 'winston.config';

@Injectable()
export class EmployeeRolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeeRoleDto: CreateEmployeeRoleDto,
  ): Promise<EmployeeRole> {
    try {
      return await this.prisma.employeeRole.create({
        data: createEmployeeRoleDto,
      });
    } catch (error) {
      logger.error(`Failed to create employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to create employee role');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: EmployeeRole[]; total: number }> {
    try {
      const [employeeRoles, total] = await Promise.all([
        this.prisma.employeeRole.findMany({
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.employeeRole.count(),
      ]);
      return { data: employeeRoles, total };
    } catch (error) {
      logger.error(`Failed to retrieve employee roles: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to retrieve employee roles',
      );
    }
  }

  async findOne(id: number): Promise<EmployeeRole | null> {
    try {
      return await this.prisma.employeeRole.findUnique({
        where: { id },
      });
    } catch (error) {
      logger.error(`Failed to retrieve employee role: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to retrieve employee role',
      );
    }
  }

  async update(
    id: number,
    updateEmployeeRoleDto: UpdateEmployeeRoleDto,
  ): Promise<EmployeeRole> {
    try {
      return await this.prisma.employeeRole.update({
        where: { id },
        data: updateEmployeeRoleDto,
      });
    } catch (error) {
      logger.error(`Failed to update employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to update employee role');
    }
  }

  async remove(id: number): Promise<EmployeeRole> {
    try {
      return await this.prisma.employeeRole.delete({
        where: { id },
      });
    } catch (error) {
      logger.error(`Failed to remove employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove employee role');
    }
  }
}
