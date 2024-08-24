import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmployeeRolesRepository } from './employee-roles.repository';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';
import logger from 'winston.config';

@Controller('employee-roles')
export class EmployeeRolesController {
  constructor(
    private readonly employeeRolesRepository: EmployeeRolesRepository,
  ) {}

  @Post()
  async create(@Body() createEmployeeRoleDto: CreateEmployeeRoleDto) {
    try {
      return await this.employeeRolesRepository.create(createEmployeeRoleDto);
    } catch (error) {
      logger.error(`Failed to create employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to create employee role');
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      return await this.employeeRolesRepository.findAll(page, limit);
    } catch (error) {
      logger.error(`Failed to retrieve employee roles: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to retrieve employee roles',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const employeeRole = await this.employeeRolesRepository.findOne(+id);
      if (!employeeRole) {
        throw new InternalServerErrorException('Employee role not found');
      }
      return employeeRole;
    } catch (error) {
      logger.error(`Failed to retrieve employee role: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to retrieve employee role',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeRoleDto: UpdateEmployeeRoleDto,
  ) {
    try {
      return await this.employeeRolesRepository.update(
        +id,
        updateEmployeeRoleDto,
      );
    } catch (error) {
      logger.error(`Failed to update employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to update employee role');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.employeeRolesRepository.remove(+id);
    } catch (error) {
      logger.error(`Failed to remove employee role: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove employee role');
    }
  }
}
