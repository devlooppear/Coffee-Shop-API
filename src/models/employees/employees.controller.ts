import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesRepository } from './employees.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesRepository: EmployeesRepository) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<{ data: Employee }> {
    return this.employeesRepository.create(createEmployeeDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10, 
  ): Promise<{ data: Employee[]; total: number }> {
    return this.employeesRepository.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ data: Employee }> {
    return this.employeesRepository.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<{ data: Employee }> {
    return this.employeesRepository.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ data: null }> {
    return this.employeesRepository.remove(+id);
  }
}
