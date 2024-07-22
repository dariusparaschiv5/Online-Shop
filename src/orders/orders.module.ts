import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/order-detail.domain';
import { OrderMapper } from './mapper/order.mapper';
import { OrdersRepository } from './repository/orders.repository';
import { OrderService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { OrderDetailMapper } from './mapper/order-detail.mapper';
import { OrderDetailsRepository } from './repository/order-details.repository';
import { OrderDetailsService } from './service/order-details.service';
import { OrderDetailsController } from './controller/orders-detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  providers: [
    OrderMapper,
    OrdersRepository,
    OrderService,
    OrderDetailMapper,
    OrderDetailsRepository,
    OrderDetailsService,
  ],
  controllers: [OrdersController, OrderDetailsController],
})
export class OrdersModule {}
