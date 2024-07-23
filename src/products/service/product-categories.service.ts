import { Injectable } from '@nestjs/common';
import { ProductCategoriesRepository } from '../repository/product-categories.repository';
import { ProductCategory } from '../domain/product-category.domain';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  createProductCategory(productCategory: ProductCategory) {
    return this.productCategoriesRepository.create(productCategory);
  }

  findAllProductCategories() {
    return this.productCategoriesRepository.findAll();
  }

  findProductCategoryById(id: string) {
    return this.productCategoriesRepository.findOne(id);
  }

  updateProductCategory(id: string, newProductCategory: ProductCategory) {
    const productCategory = this.productCategoriesRepository.findOne(id);
    if (!productCategory) {
      throw new Error('The product category has not been found.');
    }
    return this.productCategoriesRepository.update(id, newProductCategory);
  }

  removeProductCategory(id: string) {
    this.productCategoriesRepository.remove(id);
  }
}
