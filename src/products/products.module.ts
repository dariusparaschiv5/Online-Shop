import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './domain/productCategory.domain';
import { Product } from './domain/product.domain';
import { Stock } from './domain/stock.domain';
import { Location } from './domain/location.domain';
import { ProductCategoriesRepository } from './repository/product-categories.repository';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductCategoriesService } from './service/product-categories.service';
import { ProductCategoriesController } from './controller/product-categories.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, Product, Location, Stock]),
  ],
  providers: [
    ProductCategoriesRepository,
    ProductCategoryMapper,
    ProductCategoriesService,
  ],
  controllers: [ProductCategoriesController],
})
export class ProductsModule {}
