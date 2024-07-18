import { Injectable } from '@nestjs/common';
import { ProductCategoriesRepository } from '../repository/product-categories.repository';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { ProductCategory } from '../domain/productCategory.domain';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { ProductCategoryDTO } from '../dto/product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository,
    private productCategoryMapper: ProductCategoryMapper,
  ) {}

  async createProductCategory(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory = this.productCategoryMapper.toDomain(
      createProductCategoryDTO,
    );
    return this.productCategoriesRepository.create(productCategory);
  }

  async findAllProductCategories(): Promise<ProductCategoryDTO[]> {
    const productCategories = await this.productCategoriesRepository.findAll();
    return productCategories.map((productCategory) =>
      this.productCategoryMapper.toDTO(productCategory),
    );
  }

  async findProductCategoryById(
    id: string,
  ): Promise<ProductCategoryDTO | null> {
    const productCategory = await this.productCategoriesRepository.findOne(id);
    return productCategory
      ? this.productCategoryMapper.toDTO(productCategory)
      : null;
  }

  async update(
    id: string,
    updateData: Partial<CreateProductCategoryDTO>,
  ): Promise<ProductCategoryDTO> {
    const productCategory = await this.productCategoriesRepository.findOne(id);
    if (!productCategory) {
      throw new Error('The product has not been found.');
    }
    const updatedProductCategory =
      await this.productCategoriesRepository.update(id, updateData);
    return this.productCategoryMapper.toDTO(updatedProductCategory);
  }

  async remove(id: string): Promise<void> {
    await this.productCategoriesRepository.remove(id);
  }
}
