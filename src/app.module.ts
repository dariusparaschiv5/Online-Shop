import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HealthController } from './health.controller';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CustomersModule, OrdersModule, ProductsModule, SharedModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
