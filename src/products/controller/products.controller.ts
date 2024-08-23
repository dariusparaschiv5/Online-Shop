import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductMapper } from '../mapper/product.mapper';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductDTO } from '../dto/product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../customers/domain/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtGuard } from '../../auth/guards/jwt-auth.guard';
import { ProductAuthDTO } from '../dto/product-auth.dto';
import { ProductAuthMapper } from '../mapper/product-auth-mapper';
import { ProductCategory } from '../domain/product-category.domain';
import { Product } from '../domain/product.domain';
import { ProductCategoriesService } from '../service/product-categories.service';
import { UpdateProductDTO } from '../dto/update-product.dto';

@ApiTags('products')
// @ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productMapper: ProductMapper,
    private readonly productAuthMapper: ProductAuthMapper,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.findProductCategoryById(
        createProductDTO.categoryId,
      );
    return await this.productsService.createProduct(
      ProductMapper.createDTOToEntity(createProductDTO, productCategory),
    );
  }

  // @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All products retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ProductAuthDTO[]> {
    const products = await this.productsService.findAllProducts();
    return products.map((product) => this.productAuthMapper.toDTO(product));
  }

  // @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<ProductAuthDTO | null> {
    try {
      const product = await this.productsService.findProductById(id);
      return this.productAuthMapper.toDTO(product);
    } catch (error) {
      if (error.message.startsWith('Category not found')) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the product',
      );
    }
  }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() newProduct: CreateProductDTO,
  ): Promise<ProductDTO> {
    const productCategory: ProductCategory =
      await this.productCategoriesService.findProductCategoryById(
        newProduct.categoryId,
      );
    return await this.productsService.updateProduct(
      id,
      ProductMapper.updateDTOToEntity(newProduct, productCategory),
    );
  }
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDTO: UpdateProductDTO,
  // ): Promise<Product> {
  //   console.log('aaaaaaa');
  //   const productCategory: ProductCategory =
  //     await this.productCategoriesService.findProductCategoryById(
  //       updateProductDTO.category,
  //     );
  //   console.log(productCategory.name);
  //   return await this.productsService.updateProduct(
  //     id,
  //     ProductMapper.updateDTOToEntity(updateProductDTO, productCategory),
  //   );
  // }

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.productsService.removeProduct(id);
  }
}
