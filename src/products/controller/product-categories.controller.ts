import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCategory } from '../domain/productCategory.domain';
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
    @Body() createProductCategoryDTO: ProductCategoryDTO,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(
      this.productCategoryMapper.toDomain(createProductCategoryDTO),
    );
  }

  @Get()
  async findAll() {
    return this.productCategoryService.findAllProductCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productCategory =
      await this.productCategoryService.findProductCategoryById(id);
    return productCategory;
  }

  @Put(':id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateProductCategoryDTO>,
  ): Promise<ProductCategoryDTO> {
    return this.productCategoryService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productCategoryService.remove(id);
  }
}
