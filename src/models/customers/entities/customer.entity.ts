import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ description: 'Unique identifier for the customer' })
  id: number;

  @ApiProperty({ description: 'Name of the customer', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Email address of the customer', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Phone number of the customer', example: '+1234567890', nullable: true })
  phone_number: string;

  @ApiProperty({ description: 'Address of the customer', example: '123 Main St, Anytown, USA', nullable: true })
  address: string;

  @ApiProperty({ description: 'Date when the customer was created' })
  created_at: Date;

  @ApiProperty({ description: 'Date when the customer was last updated' })
  updated_at: Date;
}
