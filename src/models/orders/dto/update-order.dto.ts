import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsEnum, IsDate } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ description: 'ID do cliente', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @ApiProperty({
    description: 'ID do funcionário',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @ApiProperty({
    description: 'Valor total do pedido',
    example: 150.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({
    description: 'Status do pedido',
    enum: OrderStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2024-08-21T18:25:43.511Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  orderDate?: Date;
}
