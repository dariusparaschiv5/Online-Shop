import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCategory } from '../domain/product-category.domain';
import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { ProductCategoriesService } from '../service/product-categories.service';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoryService: ProductCategoriesService,
    private productCategoryMapper: ProductCategoryMapper,
  ) {}

  @Post()
  async create(
    @Body() createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(
      this.productCategoryMapper.toDomain(createProductCategoryDTO),
    );
  }

  @Get()
  async findAll(): Promise<ProductCategoryDTO[]> {
    const productCategories =
      await this.productCategoryService.findAllProductCategories();
    return productCategories.map((productCategory) =>
      this.productCategoryMapper.toDTO(productCategory),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductCategoryDTO | null> {
    const productCategory =
      await this.productCategoryService.findProductCategoryById(id);
    return this.productCategoryMapper.toDTO(productCategory);
  }

  @Put(':id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() newProductCategory: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    const productCategory =
      this.productCategoryMapper.toDomain(newProductCategory);
    return this.productCategoryService.updateProductCategory(
      id,
      productCategory,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productCategoryService.removeProductCategory(id);
  }
}
