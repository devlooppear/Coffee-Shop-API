import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import logger from 'winston.config';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ data: Employee }> {
    try {
      const newEmployee = await this.prisma.employee.create({
        data: createEmployeeDto,
      });
      return { data: newEmployee };
    } catch (error) {
      logger.error(`Failed to create employee: ${error.message}`);
      throw new InternalServerErrorException('Failed to create employee');
    }
  }

  async findAll(): Promise<{ data: Employee[] }> {
    try {
      const employees = await this.prisma.employee.findMany({
        include: {
          orders: true,
          reviews: true,
          roles: true,
        },
      });
      return { data: employees };
    } catch (error) {
      logger.error(`Failed to retrieve employees: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve employees');
    }
  }

  async findOne(id: number): Promise<{ data: Employee }> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          orders: true,
          reviews: true,
          roles: true,
        },
      });
      if (!employee) {
        logger.warn(`Employee with ID ${id} not found`);
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      return { data: employee };
    } catch (error) {
      logger.error(
        `Failed to retrieve employee with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to retrieve employee with ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<{ data: Employee }> {
    try {
      const updatedEmployee = await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
      return { data: updatedEmployee };
    } catch (error) {
      logger.error(`Failed to update employee with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to update employee with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.employee.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(`Failed to remove employee with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to remove employee with ID ${id}`,
      );
    }
  }
}
