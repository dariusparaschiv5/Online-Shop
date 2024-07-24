import { Injectable } from '@nestjs/common';
import { CustomersService } from 'src/customers/service/customers.service';
import { Customer } from 'src/customers/domain/customer.domain';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(username: string, password: string) {
    const customer =
      await this.customersService.findCustomerByUsername(username);

    if (customer && (await compare(password, customer.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...customerData } = customer;
      return customerData;
    }
    // console.log('password incorrect');
    return null;
  }

  async logIn(customer: Customer) {
    const valid = await this.validateCustomer(
      customer.username,
      customer.password,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customerData } = customer;
    const payload = { sub: customer.id, role: valid.role };

    return {
      ...customerData,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refrehToken(customer: Customer) {
    const payload = {
      username: customer.username,
      sub: {
        id: customer.id,
        role: customer.role,
      },
    };
    return {
      accesToken: this.jwtService.sign(payload),
    };
  }
}
