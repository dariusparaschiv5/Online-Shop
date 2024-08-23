import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerMapper } from '../mapper/customer.mapper';
import { CustomerDTO } from '../dto/customer.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../domain/role.enum';

@Roles(Role.ADMIN, Role.CUSTOMER)
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customerMapper: CustomerMapper,
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

  @Get('/by-id/:id')
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string): Promise<CustomerDTO | null> {
    const customer = await this.customersService.findCustomerById(id);
    return this.customerMapper.toDTO(customer);
  }

  @Get('/by-username/:username')
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneByUsername(
    @Param('username') username: string,
  ): Promise<CustomerDTO | null> {
    const customer =
      await this.customersService.findCustomerByUsername(username);
    return this.customerMapper.toDTO(customer);
  }
}
