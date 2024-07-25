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

  async create(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<Customer | null> {
    return this.customersRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  async update(id: string, updateData: Partial<Customer>): Promise<Customer> {
    return this.customersRepository.save({
      ...updateData,
      id: id,
    });
  }

  async remove(id: string): Promise<void> {
    this.customersRepository.delete(id);
  }
}
