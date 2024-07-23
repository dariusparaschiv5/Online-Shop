import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../domain/stock.domain';

@Injectable()
export class StocksRepository {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) {}

  async create(stock: Stock): Promise<Stock> {
    return this.stocksRepository.save(stock);
  }

  async findOne(locationId: string, productId: string): Promise<Stock | null> {
    return this.stocksRepository.findOne({
      where: { locationId, productsId: productId },
    });
  }

  async findAll(): Promise<Stock[]> {
    return this.stocksRepository.find();
  }

  async update(
    locationId: string,
    productId: string,
    stock: Stock,
  ): Promise<Stock> {
    const existingStock = await this.stocksRepository.findOne({
      where: { locationId, productsId: productId },
    });
    Object.assign(existingStock, stock);
    return this.stocksRepository.save(existingStock);
  }

  async remove(locationId: string, productId: string): Promise<void> {
    this.stocksRepository.delete({ locationId, productsId: productId });
  }
}
