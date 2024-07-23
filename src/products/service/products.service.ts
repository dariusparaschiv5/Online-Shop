import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../domain/product.domain';
import { ProductsRepository } from '../repository/products.repository';
import { ProductCategoriesService } from './product-categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private productRepository: ProductsRepository,
    private productCategoriesService: ProductCategoriesService,
  ) {}

  createProduct(product: Product) {
    const category = this.productCategoriesService.findProductCategoryById(
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
