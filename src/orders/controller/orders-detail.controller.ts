import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from '../service/order-details.service';
import { OrderDetailMapper } from '../mapper/order-detail.mapper';
import { CreateOrderDetailDto } from '../dto/create-order-detail.dto';
import { OrderDetailDto } from '../dto/order-detail.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(
    private readonly orderDetailsService: OrderDetailsService,
    private orderDetailMapper: OrderDetailMapper,
  ) {}

  @Post()
  async create(
    @Body() createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetailDto> {
    const orderDetail = this.orderDetailMapper.toDomain(createOrderDetailDto);
    const createdOrderDetail =
      await this.orderDetailsService.create(orderDetail);
    return this.orderDetailMapper.toDto(createdOrderDetail);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDetailDto> {
    const orderDetail = await this.orderDetailsService.findOne(id);
    return this.orderDetailMapper.toDto(orderDetail);
  }

  @Get()
  async findAll(): Promise<OrderDetailDto[]> {
    const orderDetails = await this.orderDetailsService.findAll();
    return orderDetails.map((orderDetail) =>
      this.orderDetailMapper.toDto(orderDetail),
    );
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateOrderDetailDto: CreateOrderDetailDto,
  // ): Promise<OrderDetailDto> {
  //   const orderDetail = this.orderDetailMapper.toDomain(updateOrderDetailDto);
  //   const updatedOrderDetail = await this.orderDetailsService.update(
  //     id,
  //     orderDetail,
  //   );
  //   return this.orderDetailMapper.toDto(updatedOrderDetail);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderDetailsService.remove(id);
  }
}
