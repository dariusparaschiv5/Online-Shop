import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/order-detail.domain';
import { OrderMapper } from './mapper/order.mapper';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { OrderDetailMapper } from './mapper/order-detail.mapper';
import { OrderDetailsRepository } from './repository/order-details.repository';
import { OrderDetailsService } from './service/order-details.service';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    CustomersModule,
    ProductsModule,
  ],
  providers: [
    OrderMapper,
    OrdersRepository,
    OrdersService,
    OrderDetailMapper,
    OrderDetailsRepository,
    OrderDetailsService,
  ],
  controllers: [OrdersController],
  exports: [OrdersService, OrderDetailsService],
})
export class OrdersModule {}
