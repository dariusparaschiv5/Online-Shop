import { Injectable, NotFoundException } from '@nestjs/common';
import { StocksRepository } from '../repository/stocks.repository';
import { Stock } from '../domain/stock.domain';

@Injectable()
export class StocksService {
  constructor(private readonly stocksRepository: StocksRepository) {}

  create(stock: Stock) {
    return this.stocksRepository.create(stock);
  }

  findOne(locationId: string, productId: string) {
    const stock = this.stocksRepository.findOne(locationId, productId);
    if (!stock) {
      throw new NotFoundException(
        `Stock with LocationId ${locationId} and ProductId ${productId} not found`,
      );
    }
    return stock;
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
    const stock = this.findOne(locationId, productId);
    if (!stock) {
      throw new NotFoundException(
        `Stock with LocationId ${locationId} and ProductId ${productId} not found`,
      );
    }
    return this.stocksRepository.remove(locationId, productId);
  }
}
