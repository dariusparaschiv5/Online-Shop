import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailsRepository } from '../repository/order-details.repository';
import { OrderDetail } from '../domain/order-detail.domain';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { LocationsRepository } from 'src/products/repository/locations.repository';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly producstRepository: ProductsRepository,
    private readonly locationsRepository: LocationsRepository,
  ) {}

  create(orderDetail: OrderDetail) {
    const products = this.producstRepository.findAll();
    const location = this.locationsRepository.findOne(orderDetail.location.id);
    const order = this.orderDetailsRepository.findOne(orderDetail.order.id);
    if (!products) {
      throw new NotFoundException(`Products not found`);
    }
    if (!location) {
      throw new NotFoundException(`Shipped from location not found`);
    }
    if (!order) {
      throw new NotFoundException(`Order not found`);
    }
    return this.orderDetailsRepository.create(orderDetail);
  }

  findOne(id: string) {
    const orderDetail = this.orderDetailsRepository.findOne(id);
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  findAll() {
    return this.orderDetailsRepository.findAll();
  }

  remove(id: string) {
    this.orderDetailsRepository.remove(id);
  }
}
