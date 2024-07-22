import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { Order } from '../domain/order.domain';
import { CustomersRepository } from 'src/customers/repository/customers.repository';

@Injectable()
export class OrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private customersRepository: CustomersRepository,
  ) {}

  createOrder(order: Order) {
    const customer = this.customersRepository.findOne(order.customer.id);
    if (!customer) {
      throw new NotFoundException(`Customer not found`);
    }
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
