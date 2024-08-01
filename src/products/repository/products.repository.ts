import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../domain/product.domain';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findAll(_p0: { relations: string[] }): Promise<Product[]> {
    return await this.productRepository.find(_p0);
  }

  async update(id: string, product: Product): Promise<Product> {
    const newProduct: Product = await this.productRepository.findOneBy({ id });
    Object.assign(newProduct, product);
    return this.productRepository.save(newProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
