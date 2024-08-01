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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StocksService } from '../../products/service/stocks.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../customers/domain/role.enum';
// import { OrderDetailAuthMapper } from '../mapper/order-detail-auth';
import { Order } from '../domain/order.domain';
import { CustomersService } from 'src/customers/service/customers.service';
import { CustomerMapper } from 'src/customers/mapper/customer.mapper';

// @Roles(Role.ADMIN, Role.CUSTOMER)
// @UseGuards(JwtGuard, RolesGuard)
@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly stockService: StocksService,
    private readonly orderMapper: OrderMapper,
    private readonly orderDetailsAuthMapper: OrderDetailMapper,
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    const customer = await this.customersService.findCustomerById(
      createOrderDTO.customerId,
    );

    // console.log('Creating order with:', createOrderDTO, customer);

    const orderEntity = OrderMapper.createDTOToEntity(createOrderDTO, customer);
    if (!orderEntity) {
      throw new Error('Failed to create order entity.');
    }

    // console.log('Order entity to be created:', orderEntity);
    // console.log(createOrderDTO.orderDetails);
    return await this.ordersService.create(
      orderEntity,
      createOrderDTO.orderDetails,
    );
  }
  // async create(
  //   @Body() createOrderAuthDTO: CreateOrderAuthDTO,
  // ): Promise<OrderAuthDTO> {
  //   // map all order details dto to order details
  //   // const orderDetails = this.orderDetailsAuthMapper.toDomains(
  //   //   createOrderDTO.orderDetails,
  //   // );
  //   // const orderDetails = [];
  //   // return this.ordersService.createOrder(
  //   //   this.orderAuthMapper.toDomain(createOrderAuthDTO),
  //     // orderDetails,
  //   );
  // }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All orders retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<OrderDTO[]> {
    const allOrders: Order[] = await this.ordersService.findAllOrders();
    console.log(allOrders.length);
    return await Promise.all(
      allOrders.map(async (order) => {
        const customer = await this.customersService.findCustomerById(
          order.customer.id,
        );
        return OrderMapper.toDTO(order, CustomerMapper.toDTO(customer));
      }),
    );
  }

  // @Get(':id')
  // @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  // @ApiResponse({ status: 404, description: 'Order not found.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async findOne(@Param('id') id: string): Promise<OrderDTO | null> {
  //   const order = await this.ordersService.findOrderById(id);
  //   return this.orderMapper.toDTO(order);
  // }

  // @Delete(':id')
  // @ApiResponse({ status: 204, description: 'Order deleted successfully.' })
  // @ApiResponse({ status: 404, description: 'Order not found.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.ordersService.removeOrder(id);
  // }
}
