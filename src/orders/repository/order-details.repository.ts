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

  create(orderDetail: OrderDetail) {
    return this.orderDetailsRepository.save(orderDetail);
  }

  findOne(id: string) {
    return this.orderDetailsRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.orderDetailsRepository.find();
  }

  // async update(id: string, orderDetail: OrderDetail): Promise<OrderDetail> {
  //   await this.orderDetailsRepository.update(id, orderDetail);
  //   return this.findOne(id);
  // }

  remove(id: string) {
    this.orderDetailsRepository.delete(id);
  }
}
