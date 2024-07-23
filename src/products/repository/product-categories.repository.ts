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

  async create(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.productCategoriesRepository.save(productCategory);
  }

  async findOne(id: string): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOneBy({ id });
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.find();
  }

  async update(
    id: string,
    productCategory: ProductCategory,
  ): Promise<ProductCategory> {
    const newProductCategory: ProductCategory =
      await this.productCategoriesRepository.findOneBy({ id });
    Object.assign(newProductCategory, productCategory);
    return this.productCategoriesRepository.save(newProductCategory);
  }

  async remove(id: string): Promise<void> {
    this.productCategoriesRepository.delete(id);
  }
}
