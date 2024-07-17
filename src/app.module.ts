import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HealthController } from './health.controller';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/domain/customer';
import { Orders } from './orders/domain/orders';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'msgcsuser',
      password: 'msgcspass',
      database: 'msgcsdb',
      entities: [Customer, Orders],
      synchronize: true,
    }),
    CustomersModule,
    OrdersModule,
    ProductsModule,
    SharedModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
