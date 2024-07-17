import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HealthController } from './health.controller';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/domain/customer.domain';
import { Orders } from './orders/domain/orders.domain';
import { ProductCategory } from './products/domain/productCategory.domain';
import { Product } from './products/domain/product.domain';
import { Location } from './products/domain/location.domain';
import { Stock } from './products/domain/stock.domain';
import { OrderDetail } from './orders/domain/order-detail.domain';
import { CustomersRepository } from './customers/repository/customer.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'msgcsuser',
      password: 'msgcspass',
      database: 'msgcsdb',
      entities: [
        Customer,
        Orders,
        ProductCategory,
        Product,
        Location,
        OrderDetail,
        Stock,
      ],
      synchronize: true,
    }),
    CustomersModule,
    OrdersModule,
    ProductsModule,
    SharedModule,
  ],
  controllers: [HealthController],
  providers: [CustomersRepository],
})
export class AppModule {}
