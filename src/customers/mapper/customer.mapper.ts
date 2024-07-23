import { Injectable } from '@nestjs/common';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../domain/customer.domain';
import { CustomerDTO } from '../dto/customer.dto';

@Injectable()
export class CustomerMapper {
  toDomain(createCustomerDTO: CreateCustomerDTO): Customer {
    const customer = new Customer();
    customer.firstName = createCustomerDTO.firstName;
    customer.lastName = createCustomerDTO.lastName;
    customer.username = createCustomerDTO.username;
    customer.password = createCustomerDTO.password;
    customer.emailAdress = createCustomerDTO.emailAddress;
    return customer;
  }

  toDTO(customer: Customer): CustomerDTO {
    const customerDTO = new CustomerDTO();
    customerDTO.firstName = customer.firstName;
    customerDTO.lastName = customer.lastName;
    customerDTO.username = customer.username;
    customerDTO.password = customer.password;
    customerDTO.emailAdress = customer.emailAdress;
    return customerDTO;
  }
}
