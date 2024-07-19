import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../domain/order.domain';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(order: Order) {
    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: string) {
    return this.ordersRepository.findOneBy({ id });
  }

  async update(id: string, order: Order) {
    const newOrder: Order = await this.ordersRepository.findOneBy({ id });
    Object.assign(newOrder, order);
    return this.ordersRepository.save(newOrder);
  }

  remove(id: string) {
    this.ordersRepository.delete(id);
  }
}
