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

@ApiTags('products')
// @ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productMapper: ProductMapper,
    private readonly productAuthMapper: ProductAuthMapper,
  ) {}

  // @Roles(Role.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<ProductDTO> {
    return this.productsService.createProduct(
      this.productMapper.toDomain(createProductDTO),
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
    const product = this.productMapper.toDomain(newProduct);
    return this.productsService.updateProduct(id, product);
  }

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
