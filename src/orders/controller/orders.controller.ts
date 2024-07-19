import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderService } from '../service/orders.service';
import { Order } from '../domain/order.domain';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderDTO } from '../dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrderService,
    private orderMapper: OrderMapper,
  ) {}

  @Post()
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.ordersService.createOrder(
      this.orderMapper.toDomain(createOrderDTO),
    );
  }

  @Get()
  async findAll(): Promise<OrderDTO[]> {
    const orders = await this.ordersService.findAllOrders();
    return orders.map((order) => this.orderMapper.toDTO(order));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDTO | null> {
    const order = await this.ordersService.findOrderById(id);
    return this.orderMapper.toDTO(order);
  }

  // @Put(':id')
  // async updateOrder(
  //   @Param('id') id: string,
  //   @Body() newOrder: OrderDTO,
  // ): Promise<Order> {
  //   const order = this.orderMapper.toDomain(newOrder);
  //   return this.ordersService.updateOrder(id, order);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.removeOrder(id);
  }
}
