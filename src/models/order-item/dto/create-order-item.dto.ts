import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'ID do pedido associado', example: 1 })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: 'ID do produto associado', example: 2 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'Quantidade do produto no pedido', example: 5 })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'Preço do produto no pedido', example: 29.99 })
  @IsNumber()
  @IsPositive()
  price: number;
}
