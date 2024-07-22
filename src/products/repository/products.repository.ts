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

  create(product: Product) {
    return this.productRepository.save(product);
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  findAll() {
    return this.productRepository.find();
  }

  async update(id: string, product: Product) {
    const newProduct: Product = await this.productRepository.findOneBy({ id });
    Object.assign(newProduct, product);
    return this.productRepository.save(newProduct);
  }

  remove(id: string) {
    this.productRepository.delete(id);
  }
}
