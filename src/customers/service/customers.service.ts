import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../repository/customers.repository';
import { Customer } from '../domain/customer.domain';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  createCustomer(customer: Customer) {
    return this.customersRepository.create(customer);
  }

  findAllCustomers() {
    return this.customersRepository.findAll();
  }

  findCustomerById(id: string): Promise<Customer | null> {
    return this.customersRepository.findOne(id);
  }

  findCustomerByUsername(username: string) {
    return this.customersRepository.findOneByUsername(username);
  }
}
