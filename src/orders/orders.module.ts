import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './domain/orders';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
})
export class OrdersModule {}
