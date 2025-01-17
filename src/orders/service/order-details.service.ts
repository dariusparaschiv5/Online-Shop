import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailsRepository } from '../repository/order-details.repository';
import { OrderDetail } from '../domain/order-detail.domain';
import { ProductsService } from '../../products/service/products.service';
import { LocationsService } from '../../products/service/locations.service';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly productsService: ProductsService,
    private readonly locationsService: LocationsService,
  ) {}

  create(orderDetail: OrderDetail) {
    const products = this.productsService.findAllProducts();
    const location = this.locationsService.findOne(orderDetail.location.id);
    if (!products) {
      throw new NotFoundException(`Products not found`);
    }
    if (!location) {
      throw new NotFoundException(`Shipped from location not found`);
    }
    return this.orderDetailsRepository.create(orderDetail);
  }

  findOne(productId: string, locationId: string) {
    const orderDetail = this.orderDetailsRepository.findOne(
      productId,
      locationId,
    );
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with not found`);
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
