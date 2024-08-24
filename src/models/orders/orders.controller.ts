import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(createOrderDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1', 
    @Query('pageSize') pageSize: string = '10'
  ) {
    return this.ordersRepository.findAll(+page, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersRepository.remove(+id);
  }
}
