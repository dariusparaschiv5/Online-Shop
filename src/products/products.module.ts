import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './domain/productCategory.domain';
import { Product } from './domain/product.domain';
import { Stock } from './domain/stock.domain';
import { Location } from './domain/location.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, Product, Location, Stock]),
  ],
})
export class ProductsModule {}
