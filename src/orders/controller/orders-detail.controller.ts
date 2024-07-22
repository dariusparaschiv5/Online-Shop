import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from '../service/order-details.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { CreateOrderDetailDTO } from '../dto/create-order-detail.dto';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(
    private readonly orderDetailsService: OrderDetailsService,
    private orderDetailMapper: OrderDetailMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order details have been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createOrderDetailDto: CreateOrderDetailDTO,
  ): Promise<OrderDetailDTO> {
    const orderDetail = this.orderDetailMapper.toDomain(createOrderDetailDto);
    const createdOrderDetail =
      await this.orderDetailsService.create(orderDetail);
    return this.orderDetailMapper.toDto(createdOrderDetail);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Order details not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<OrderDetailDTO> {
    const orderDetail = await this.orderDetailsService.findOne(id);
    return this.orderDetailMapper.toDto(orderDetail);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All order details retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<OrderDetailDTO[]> {
    const orderDetails = await this.orderDetailsService.findAll();
    return orderDetails.map((orderDetail) =>
      this.orderDetailMapper.toDto(orderDetail),
    );
  }

  @ApiResponse({
    status: 204,
    description: 'Order details deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Order details not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderDetailsService.remove(id);
  }
}
