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
import { ProductsRepository } from './repository/products.repository';
import { ProductMapper } from './mapper/product.mapper';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { StocksRepository } from './repository/stocks.repository';
import { StockMapper } from './mapper/stock.mapper';
import { StocksService } from './service/stocks.service';
import { LocationsRepository } from './repository/locations.repository';
import { LocationsService } from './service/locations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, Product, Location, Stock]),
  ],
  providers: [
    ProductCategoriesRepository,
    ProductCategoryMapper,
    ProductCategoriesService,
    ProductsRepository,
    ProductMapper,
    ProductsService,
    StocksRepository,
    StockMapper,
    StocksService,
    LocationsRepository,
    LocationsService,
  ],
  controllers: [ProductCategoriesController, ProductsController],
  exports: [StocksService, LocationsService, ProductsService],
})
export class ProductsModule {}
