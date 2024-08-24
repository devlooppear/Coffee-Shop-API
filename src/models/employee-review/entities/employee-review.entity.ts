import { ApiProperty } from '@nestjs/swagger';

export class EmployeeReview {
  @ApiProperty({ description: 'Unique identifier for the employee review' })
  id: number;

  @ApiProperty({
    description: 'Unique identifier of the employee being reviewed',
  })
  employeeId: number;

  @ApiProperty({ description: 'Name of the reviewer', example: 'Jane Smith' })
  reviewerName: string;

  @ApiProperty({ description: 'Rating given to the employee', example: 5 })
  rating: number;

  @ApiProperty({
    description: 'Comments provided by the reviewer',
    nullable: true,
    example: 'Excellent performance!',
  })
  comments?: string;

  @ApiProperty({ description: 'Date when the review was conducted' })
  reviewDate: Date;

  @ApiProperty({ description: 'Date when the review was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the review was last updated' })
  updatedAt: Date;
}
