import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../domain/order-detail.domain';

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailsRepository.save(orderDetail);
  }

  async findOne(id: string): Promise<OrderDetail | null> {
    return this.orderDetailsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }

  async remove(id: string): Promise<void> {
    this.orderDetailsRepository.delete(id);
  }
}
