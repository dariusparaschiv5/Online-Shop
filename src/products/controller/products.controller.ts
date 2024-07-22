import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductMapper } from '../mapper/product.mapper';
import { CreateProductDTO } from '../dto/create-product.dto';
import { Product } from '../domain/product.domain';
import { ProductDTO } from '../dto/product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private productMapper: ProductMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productService.createProduct(
      this.productMapper.toDomain(createProductDTO),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All products retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ProductDTO[]> {
    const productCategories =
      await this.productService.findAllProductCategories();
    return productCategories.map((product) =>
      this.productMapper.toDTO(product),
    );
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<ProductDTO | null> {
    const product = await this.productService.findProductById(id);
    return this.productMapper.toDTO(product);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() newProduct: CreateProductDTO,
  ): Promise<Product> {
    const product = this.productMapper.toDomain(newProduct);
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.removeProduct(id);
  }
}
