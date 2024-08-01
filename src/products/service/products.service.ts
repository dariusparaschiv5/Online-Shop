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

  async findAllProducts() {
    return await this.productRepository.findAll({ relations: ['category'] });
  }

  async findProductById(id: string) {
    try {
      const product = await this.productRepository.findOne(id);
      return product;
    } catch (error) {
      throw new Error('Error fetching product');
    }
  }

  updateProduct(id: string, newProduct: Product) {
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new Error('The product category has not been found.');
    }
    return this.productRepository.update(id, newProduct);
  }

  async removeProduct(id: string) {
    return await this.productRepository.remove(id);
  }
}
