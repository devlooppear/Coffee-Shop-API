import { ApiProperty } from '@nestjs/swagger';

export class Employee {
  @ApiProperty({ description: 'Unique identifier for the employee' })
  id: number;

  @ApiProperty({ description: 'Name of the employee', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Email address of the employee', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Phone number of the employee', nullable: true, example: '+1234567890' })
  phone_number?: string;

  @ApiProperty({ description: 'Position of the employee in the organization', nullable: true, example: 'Software Engineer' })
  position?: string;

  @ApiProperty({ description: 'Date when the employee record was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the employee record was last updated' })
  updatedAt: Date;
}
