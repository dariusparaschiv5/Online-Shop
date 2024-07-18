import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../domain/customer.domain';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }

  findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ id });
  }

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  update(id: string, updateData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.save({
      ...updateData,
      id: id,
    });
  }

  async remove(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
