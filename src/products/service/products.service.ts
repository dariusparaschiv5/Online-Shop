import { Injectable } from '@nestjs/common';
import { Product } from '../domain/product.domain';
import { ProductRepository } from '../repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  createProduct(product: Product) {
    return this.productRepository.create(product);
  }

  findAllProductCategories() {
    return this.productRepository.findAll();
  }

  findProductById(id: string) {
    return this.productRepository.findOne(id);
  }

  updateProduct(id: string, newProduct: Product) {
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new Error('The product category has not been found.');
    }
    return this.productRepository.update(id, newProduct);
  }

  removeProduct(id: string) {
    this.productRepository.remove(id);
  }
}
