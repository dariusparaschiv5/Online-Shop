import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/service/customers.service';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/customers/domain/customer.domain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(username: string, password: string) {
    const customer =
      await this.customersService.findCustomerByUsername(username);
    if (customer && (await bcrypt.compare(password, customer.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...customerData } = customer;
      return customerData;
    }
    return null;
  }

  async logIn(customer: Customer) {
    const payload = {
      username: customer.username,
      sub: {
        id: customer.id,
      },
    };
    return {
      ...customer,
      accesToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refrehToken(customer: Customer) {
    const payload = {
      username: customer.username,
      sub: {
        id: customer.id,
      },
    };
    return {
      accesToken: this.jwtService.sign(payload),
    };
  }
}
