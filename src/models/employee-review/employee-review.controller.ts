import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeReviewRepository } from './employee-review.repository';
import { CreateEmployeeReviewDto } from './dto/create-employee-review.dto';
import { UpdateEmployeeReviewDto } from './dto/update-employee-review.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('employee-reviews')
export class EmployeeReviewController {
  constructor(
    private readonly employeeReviewRepository: EmployeeReviewRepository,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Employee review created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createEmployeeReviewDto: CreateEmployeeReviewDto) {
    return this.employeeReviewRepository.create(createEmployeeReviewDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of employee reviews.' })
  findAll() {
    return this.employeeReviewRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Employee review found.' })
  @ApiResponse({ status: 404, description: 'Employee review not found.' })
  findOne(@Param('id') id: string) {
    return this.employeeReviewRepository.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Employee review updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Employee review not found.' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeReviewDto: UpdateEmployeeReviewDto,
  ) {
    return this.employeeReviewRepository.update(+id, updateEmployeeReviewDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Employee review deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Employee review not found.' })
  remove(@Param('id') id: string) {
    return this.employeeReviewRepository.remove(+id);
  }
}
