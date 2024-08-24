import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Sample Product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the product',
    example: 'This is a sample product description.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 19.99,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'The ID of the category to which the product belongs',
    example: 1,  // Exemplo de ID da categoria
    required: true,  // Agora este campo é obrigatório
  })
  @IsNumber()
  categoryId: number; // Alterado para categoryId
}
