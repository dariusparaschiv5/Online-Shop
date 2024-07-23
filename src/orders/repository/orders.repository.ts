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

  async create(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  async update(id: string, order: Order): Promise<Order> {
    const newOrder: Order = await this.ordersRepository.findOneBy({ id });
    Object.assign(newOrder, order);
    return this.ordersRepository.save(newOrder);
  }

  async remove(id: string): Promise<void> {
    this.ordersRepository.delete(id);
  }
}
