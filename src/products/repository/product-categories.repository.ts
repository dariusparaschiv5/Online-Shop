import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../domain/productCategory.domain';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoriesRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  create(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.productCategoriesRepository.save(productCategory);
  }

  findOne(id: string): Promise<ProductCategory | null> {
    return this.productCategoriesRepository.findOneBy({ id });
  }

  findAll(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.find();
  }

  update(
    id: string,
    updateData: Partial<ProductCategory>,
  ): Promise<ProductCategory> {
    return this.productCategoriesRepository.save({
      ...updateData,
      id: id,
    });
  }

  async remove(id: string): Promise<void> {
    await this.productCategoriesRepository.delete(id);
  }
}
