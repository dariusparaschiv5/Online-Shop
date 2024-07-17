import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.domain';
import { CustomersRepository } from './repository/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersRepository],
})
export class CustomersModule {}
