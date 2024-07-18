import { Get, Injectable, Post } from '@nestjs/common';
import { CustomersRepository } from '../repository/customer.repository';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private customersRepository: CustomersRepository,
    private customerMapper: CustomerMapper,
  ) {}

  @Post()
  async createCustomer(
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    const customer = this.customerMapper.toDomain(createCustomerDTO);
    return this.customersRepository.create(customer);
  }

  @Get()
  async findAllCustomers(): Promise<CustomerDTO[]> {
    const customers = await this.customersRepository.findAll();
    return customers.map((customer) => this.customerMapper.toDTO(customer));
  }

  @Get(':id')
  async findCustomerById(id: string): Promise<CustomerDTO | null> {
    const customer = await this.customersRepository.findOne(id);
    return customer ? this.customerMapper.toDTO(customer) : null;
  }
}
