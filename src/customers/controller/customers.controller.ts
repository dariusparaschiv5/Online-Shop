import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private customerMapper: CustomerMapper,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    return this.customersService.createCustomer(
      this.customerMapper.toDomain(createCustomerDTO),
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All customers retrieved successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<CustomerDTO[]> {
    const customers = await this.customersService.findAllCustomers();
    return customers.map((customer) => this.customerMapper.toDTO(customer));
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<CustomerDTO | null> {
    const customer = await this.customersService.findCustomerById(id);
    return this.customerMapper.toDTO(customer);
  }
}
