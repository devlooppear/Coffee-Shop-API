import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItem {
  @ApiProperty({ description: 'ID do item do pedido' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'ID do pedido associado' })
  @Column({ name: 'order_id' })
  orderId: number;

  @ApiProperty({ description: 'ID do produto associado' })
  @Column({ name: 'product_id' })
  productId: number;

  @ApiProperty({ description: 'Quantidade do produto no pedido' })
  @Column({ name: 'quantity' })
  quantity: number;

  @ApiProperty({ description: 'Preço do produto no pedido' })
  @Column({ name: 'price' })
  price: number;

  @ApiProperty({
    description: 'Data de criação do item do pedido',
    type: String,
    format: 'date-time',
  })
  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do item do pedido',
    type: String,
    format: 'date-time',
  })
  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
