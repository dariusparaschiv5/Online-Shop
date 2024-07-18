import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private customerMapper: CustomerMapper,
  ) {}

  @Post()
  async create(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return this.customersService.createCustomer(
      this.customerMapper.toDomain(createCustomerDTO),
    );
  }

  @Get()
  async findAll() {
    return this.customersService.findAllCustomers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findCustomerById(id);
    return customer;
  }
}
