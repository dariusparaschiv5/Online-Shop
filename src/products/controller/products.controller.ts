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

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private productMapper: ProductMapper,
  ) {}

  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productService.createProduct(
      this.productMapper.toDomain(createProductDTO),
    );
  }

  @Get()
  async findAll(): Promise<ProductDTO[]> {
    const productCategories =
      await this.productService.findAllProductCategories();
    return productCategories.map((product) =>
      this.productMapper.toDTO(product),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDTO | null> {
    const product = await this.productService.findProductById(id);
    return this.productMapper.toDTO(product);
  }

  // @Put(':id')
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body() newProduct: ProductDTO,
  // ): Promise<Product> {
  //   const product = this.productMapper.toDomain(newProduct);
  //   return this.productService.updateProduct(id, product);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.removeProduct(id);
  }
}
