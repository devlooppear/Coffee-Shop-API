import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsEnum,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID do cliente', example: 1, required: false })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'ID do funcionário',
    example: 2,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty({
    description: 'Valor total do pedido',
    example: 150.5,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'Status do pedido',
    enum: OrderStatus,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2024-08-21T18:25:43.511Z',
    required: false,
  })
  @IsNotEmpty()
  @IsDate()
  orderDate: Date;
}
