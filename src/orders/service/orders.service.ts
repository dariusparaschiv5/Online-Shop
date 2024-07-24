import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { Order } from '../domain/order.domain';
import { CustomersService } from '../../customers/service/customers.service';
import { OrderDetailsService } from './order-details.service';
import { StocksService } from '../../products/service/stocks.service';
import { OrderDetail } from '../domain/order-detail.domain';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private customersService: CustomersService,
    private orderDetailService: OrderDetailsService,
    private stockService: StocksService,
  ) {}

  async createOrder(order: Order, orderDetails: OrderDetail[]) {
    const customer = await this.customersService.findCustomerById(
      order.customer.id,
    );
    if (!customer) {
      throw new NotFoundException(`Customer not found`);
    }

    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        const stock = await this.stockService.findOne(
          orderDetail.location.id,
          orderDetail.product.id,
        );
        if (!stock || stock.quantity < orderDetail.quantity) {
          throw new BadRequestException('Not enough items in stock');
        } else {
          stock.quantity -= orderDetail.quantity;
          await this.stockService.update(
            orderDetail.location.id,
            orderDetail.product.id,
            stock,
          );
        }
      }),
    );

    const createdOrder = await this.ordersRepository.create(order);

    const details = orderDetails.map((detail) => ({
      ...detail,
      order: createdOrder,
    }));

    await Promise.all(
      details.map((detail) => this.orderDetailService.create(detail)),
    );

    return createdOrder;
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
