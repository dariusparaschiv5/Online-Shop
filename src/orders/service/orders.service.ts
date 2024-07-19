import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { Order } from '../domain/order.domain';

@Injectable()
export class OrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  createOrder(order: Order) {
    return this.ordersRepository.create(order);
  }

  findAllOrders() {
    return this.ordersRepository.findAll();
  }

  findOrderById(id: string) {
    return this.ordersRepository.findOne(id);
  }

  updateOrder(id: string, newOrder: Order) {
    const order = this.ordersRepository.findOne(id);
    if (!order) {
      throw new Error('The order has not been found.');
    }
    return this.ordersRepository.update(id, newOrder);
  }

  removeOrder(id: string) {
    this.ordersRepository.remove(id);
  }
}
