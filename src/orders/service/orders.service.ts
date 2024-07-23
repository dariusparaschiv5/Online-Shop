import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { Order } from '../domain/order.domain';
import { CustomersService } from 'src/customers/service/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private customersService: CustomersService,
  ) {}

  createOrder(order: Order) {
    const customer = this.customersService.findCustomerById(order.customer.id);
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
