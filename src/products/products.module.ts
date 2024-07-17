import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './domain/productCategory';
import { Product } from './domain/product';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product])],
})
export class ProductsModule {}
