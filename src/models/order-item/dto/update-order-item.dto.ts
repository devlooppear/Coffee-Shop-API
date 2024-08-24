import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsNumber } from 'class-validator';

export class UpdateOrderItemDto {
  @ApiProperty({ description: 'ID do pedido associado', example: 1, required: false })
  @IsInt()
  @IsOptional()
  orderId?: number;

  @ApiProperty({ description: 'ID do produto associado', example: 2, required: false })
  @IsInt()
  @IsOptional()
  productId?: number;

  @ApiProperty({ description: 'Quantidade do produto no pedido', example: 5, required: false })
  @IsInt()
  @IsOptional()
  @IsPositive()
  quantity?: number;

  @ApiProperty({ description: 'Preço do produto no pedido', example: 29.99, required: false })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;
}
