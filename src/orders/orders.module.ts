import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './domain/orders.domain';
import { OrderDetail } from './domain/order-detail.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetail])],
})
export class OrdersModule {}
