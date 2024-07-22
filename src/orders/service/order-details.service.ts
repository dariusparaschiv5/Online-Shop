import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailsRepository } from '../repository/order-details.repository';
import { OrderDetail } from '../domain/order-detail.domain';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
  ) {}

  create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsRepository.create(orderDetail);
  }

  async findOne(id: string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailsRepository.findOne(id);
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.findAll();
  }

  // async update(id: string, orderDetail: OrderDetail): Promise<OrderDetail> {
  //   await this.findOne(id); // Ensure it exists
  //   return this.orderDetailsRepository.update(id, orderDetail);
  // }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.orderDetailsRepository.remove(id);
  }
}
