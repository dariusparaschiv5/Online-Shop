import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HealthController } from './health.controller';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/domain/customer.domain';
import { Order } from './orders/domain/order.domain';
import { ProductCategory } from './products/domain/product-category.domain';
import { Product } from './products/domain/product.domain';
import { Location } from './products/domain/location.domain';
import { Stock } from './products/domain/stock.domain';
import { OrderDetail } from './orders/domain/order-detail.domain';

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
        Order,
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
})
export class AppModule {}
