import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeReviewDto } from './dto/create-employee-review.dto';
import { UpdateEmployeeReviewDto } from './dto/update-employee-review.dto';
import { EmployeeReview } from '@prisma/client';
import logger from 'winston.config';

@Injectable()
export class EmployeeReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeeReviewDto: CreateEmployeeReviewDto,
  ): Promise<{ data: EmployeeReview }> {
    try {
      const newReview = await this.prisma.employeeReview.create({
        data: createEmployeeReviewDto,
      });
      return { data: newReview };
    } catch (error) {
      logger.error(`Failed to create employee review: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to create employee review',
      );
    }
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ data: EmployeeReview[]; totalCount: number }> {
    try {
      const [reviews, totalCount] = await Promise.all([
        this.prisma.employeeReview.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        this.prisma.employeeReview.count(),
      ]);
      return { data: reviews, totalCount };
    } catch (error) {
      logger.error(`Failed to retrieve employee reviews: ${error.message}`);
      throw new InternalServerErrorException(
        'Failed to retrieve employee reviews',
      );
    }
  }

  async findOne(id: number): Promise<{ data: EmployeeReview }> {
    try {
      const review = await this.prisma.employeeReview.findUnique({
        where: { id },
      });
      if (!review) {
        logger.warn(`Employee review with ID ${id} not found`);
        throw new NotFoundException(`Employee review with ID ${id} not found`);
      }
      return { data: review };
    } catch (error) {
      logger.error(
        `Failed to retrieve employee review with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to retrieve employee review with ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateEmployeeReviewDto: UpdateEmployeeReviewDto,
  ): Promise<{ data: EmployeeReview }> {
    try {
      const updatedReview = await this.prisma.employeeReview.update({
        where: { id },
        data: updateEmployeeReviewDto,
      });
      return { data: updatedReview };
    } catch (error) {
      logger.error(
        `Failed to update employee review with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to update employee review with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<{ data: null }> {
    try {
      await this.findOne(id);
      await this.prisma.employeeReview.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      logger.error(
        `Failed to remove employee review with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Failed to remove employee review with ID ${id}`,
      );
    }
  }
}
