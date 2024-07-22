import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../domain/stock.domain';

@Injectable()
export class StocksRepository {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) {}

  create(stock: Stock) {
    return this.stocksRepository.save(stock);
  }

  findOne(locationId: string, productId: string) {
    return this.stocksRepository.findOne({
      where: { locationId, productsId: productId },
    });
  }

  findAll() {
    return this.stocksRepository.find();
  }

  async update(locationId: string, productId: string, stock: Stock) {
    const existingStock = await this.stocksRepository.findOne({
      where: { locationId, productsId: productId },
    });
    if (!existingStock) {
      throw new NotFoundException(
        `Stock with LocationId ${locationId} and ProductId ${productId} not found`,
      );
    }
    Object.assign(existingStock, stock);
    return this.stocksRepository.save(existingStock);
  }

  remove(locationId: string, productId: string) {
    return this.stocksRepository.delete({ locationId, productsId: productId });
  }
}
