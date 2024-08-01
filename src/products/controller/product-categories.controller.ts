import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductCategoryMapper } from '../mapper/product-category.mapper';
import { ProductCategoriesService } from '../service/product-categories.service';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

// @Roles()
// @UseGuards(JwtGuard, RolesGuard)
@ApiTags('product-categories')
@ApiBearerAuth()
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoryService: ProductCategoriesService,
    private readonly productCategoryMapper: ProductCategoryMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product categorie has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<ProductCategoryDTO> {
    return this.productCategoryService.createProductCategory(
      this.productCategoryMapper.toDomain(createProductCategoryDTO),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All product categories retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ProductCategoryDTO[]> {
    const productCategories =
      await this.productCategoryService.findAllProductCategories();
    return productCategories.map((productCategory) =>
      this.productCategoryMapper.toDTO(productCategory),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Product category retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product category not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<ProductCategoryDTO | null> {
    const productCategory =
      await this.productCategoryService.findProductCategoryById(id);
    return this.productCategoryMapper.toDTO(productCategory);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Product category updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product category not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProductCategory(
    @Param('id') id: string,
    @Body() newProductCategory: ProductCategoryDTO,
  ): Promise<ProductCategoryDTO> {
    const productCategory =
      this.productCategoryMapper.toDomain(newProductCategory);
    return this.productCategoryService.updateProductCategory(
      id,
      productCategory,
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Product category deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product category not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productCategoryService.removeProductCategory(id);
  }
}
