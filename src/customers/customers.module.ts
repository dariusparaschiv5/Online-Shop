import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.domain';
import { CustomersRepository } from './repository/customers.repository';
import { CustomerMapper } from './mapper/customer.mapper';
import { CustomersService } from './service/customers.service';
import { CustomersController } from './controller/customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersRepository, CustomerMapper, CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService, TypeOrmModule.forFeature([CustomersRepository])],
})
export class CustomersModule {}
