import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({ description: 'Unique identifier for the order' })
  id: number;

  @ApiProperty({ description: 'Unique identifier for the customer', example: 1 })
  customerId: number;

  @ApiProperty({ description: 'Total amount of the order', example: 99.99 })
  totalAmount: number;

  @ApiProperty({ description: 'Current status of the order', example: 'Pending' })
  status: string;

  @ApiProperty({ description: 'Date when the order was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the order was last updated' })
  updatedAt: Date;
}
