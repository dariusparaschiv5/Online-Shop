import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../domain/product-category.domain';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoriesRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  create(productCategory: ProductCategory) {
    return this.productCategoriesRepository.save(productCategory);
  }

  findOne(id: string) {
    return this.productCategoriesRepository.findOneBy({ id });
  }

  findAll() {
    return this.productCategoriesRepository.find();
  }

  async update(id: string, productCategory: ProductCategory) {
    const newProductCategory: ProductCategory =
      await this.productCategoriesRepository.findOneBy({ id });
    Object.assign(newProductCategory, productCategory);
    return this.productCategoriesRepository.save(newProductCategory);
  }

  remove(id: string) {
    this.productCategoriesRepository.delete(id);
  }
}
