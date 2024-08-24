import { Module } from '@nestjs/common';
import { EmployeeReviewRepository } from './employee-review.repository';
import { EmployeeReviewController } from './employee-review.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeeReviewController],
  providers: [EmployeeReviewRepository, PrismaService],
})
export class EmployeeReviewModule {}
