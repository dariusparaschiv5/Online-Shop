import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderDTO } from '../dto/order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StocksService } from 'src/products/service/stocks.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/customers/domain/role.enum';

@Roles(Role.ADMIN, Role.CUSTOMER)
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly stockService: StocksService,
    private readonly orderMapper: OrderMapper,
    private readonly orderDetailsMapper: OrderDetailMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    // map all order details dto to order details
    const orderDetails = this.orderDetailsMapper.toDomains(
      createOrderDTO.orderDetails,
    );
    return this.ordersService.createOrder(
      this.orderMapper.toDomain(createOrderDTO, orderDetails),
      orderDetails,
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

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.removeOrder(id);
  }
}
