import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../domain/product.domain';
import { ProductsRepository } from '../repository/products.repository';
import { ProductCategoriesRepository } from '../repository/product-categories.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductsRepository,
    private productCategoryRepository: ProductCategoriesRepository,
  ) {}

  createProduct(product: Product) {
    const category = this.productCategoryRepository.findOne(
      product.category.id,
    );
    if (!category) {
      throw new NotFoundException(`ProductCategory not found`);
    }
    return this.productRepository.create(product);
  }

  findAllProducts() {
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
