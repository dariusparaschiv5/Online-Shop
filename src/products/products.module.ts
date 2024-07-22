import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './domain/product-category.domain';
import { Product } from './domain/product.domain';
import { Stock } from './domain/stock.domain';
import { Location } from './domain/location.domain';
import { ProductCategoriesRepository } from './repository/product-categories.repository';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductCategoriesService } from './service/product-categories.service';
import { ProductCategoriesController } from './controller/product-categories.controller';
import { ProductRepository } from './repository/products.repository';
import { ProductMapper } from './mapper/product.mapper';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { StocksRepository } from './repository/stocks.repository';
import { StockMapper } from './mapper/stock.mapper';
import { StocksService } from './service/stocks.service';
import { StocksController } from './controller/stocks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, Product, Location, Stock]),
  ],
  providers: [
    ProductCategoriesRepository,
    ProductCategoryMapper,
    ProductCategoriesService,
    ProductRepository,
    ProductMapper,
    ProductsService,
    StocksRepository,
    StockMapper,
    StocksService,
  ],
  controllers: [
    ProductCategoriesController,
    ProductsController,
    StocksController,
  ],
})
export class ProductsModule {}
