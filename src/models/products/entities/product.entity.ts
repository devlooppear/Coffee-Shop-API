import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ description: 'Unique identifier for the product' })
  id: number;

  @ApiProperty({ description: 'Name of the product', example: 'Laptop' })
  name: string;

  @ApiProperty({ description: 'Description of the product', example: 'A high-performance laptop' })
  description?: string;

  @ApiProperty({ description: 'Price of the product in USD', example: 999.99 })
  price: number;

  @ApiProperty({ description: 'Available stock for the product', example: 50 })
  stock: number;

  @ApiProperty({ description: 'ID of the category to which the product belongs' })
  categoryId: number;

  @ApiProperty({ description: 'Date when the product was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the product was last updated' })
  updatedAt: Date;
}
