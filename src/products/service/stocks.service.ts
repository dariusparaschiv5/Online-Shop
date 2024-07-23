import { Injectable, NotFoundException } from '@nestjs/common';
import { StocksRepository } from '../repository/stocks.repository';
import { Stock } from '../domain/stock.domain';
import { ProductsService } from './products.service';
import { LocationsService } from './locations.service';

@Injectable()
export class StocksService {
  constructor(
    private readonly stocksRepository: StocksRepository,
    private readonly producstService: ProductsService,
    private readonly locationsService: LocationsService,
  ) {}

  create(stock: Stock) {
    const products = this.producstService.findAllProducts();
    const location = this.locationsService.findOne(stock.locationId);
    if (!products) {
      throw new NotFoundException(`Products not found`);
    }
    if (!location) {
      throw new NotFoundException(`Location not found`);
    }
    return this.stocksRepository.create(stock);
  }

  findOne(locationId: string, productId: string) {
    return this.stocksRepository.findOne(locationId, productId);
  }

  findAll() {
    return this.stocksRepository.findAll();
  }

  async update(locationId: string, productId: string, stock: Stock) {
    const existingStock = await this.findOne(locationId, productId);
    Object.assign(existingStock, stock);
    return this.stocksRepository.update(locationId, productId, existingStock);
  }

  remove(locationId: string, productId: string) {
    return this.stocksRepository.remove(locationId, productId);
  }
}
