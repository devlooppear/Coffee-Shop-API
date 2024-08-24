import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty({ description: 'ID do item do pedido' })
  id: number;

  @ApiProperty({ description: 'ID do pedido associado' })
  orderId: number;

  @ApiProperty({ description: 'ID do produto associado' })
  productId: number;

  @ApiProperty({ description: 'Quantidade do produto no pedido' })
  quantity: number;

  @ApiProperty({ description: 'Preço do produto no pedido' })
  price: number;

  @ApiProperty({
    description: 'Data de criação do item do pedido',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do item do pedido',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
