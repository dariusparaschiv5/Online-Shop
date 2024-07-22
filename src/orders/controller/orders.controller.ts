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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrderService,
    private readonly orderMapper: OrderMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.ordersService.createOrder(
      this.orderMapper.toDomain(createOrderDTO),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All orders retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<OrderDTO[]> {
    const orders = await this.ordersService.findAllOrders();
    return orders.map((order) => this.orderMapper.toDTO(order));
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<OrderDTO | null> {
    const order = await this.ordersService.findOrderById(id);
    return this.orderMapper.toDTO(order);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateOrder(
    @Param('id') id: string,
    @Body() newOrder: CreateOrderDTO,
  ): Promise<Order> {
    const order = this.orderMapper.toDomain(newOrder);
    return this.ordersService.updateOrder(id, order);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.removeOrder(id);
  }
}
