import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.domain';
import { OrderDetail } from './domain/order-detail.domain';
import { OrderMapper } from './mapper/order.mapper';
import { OrdersRepository } from './repository/orders.repository';
import { OrderService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  providers: [OrderMapper, OrdersRepository, OrderService],
  controllers: [OrdersController],
})
export class OrdersModule {}
