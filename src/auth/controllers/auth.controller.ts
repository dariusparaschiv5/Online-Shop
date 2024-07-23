import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CustomersService } from 'src/customers/service/customers.service';
import { Customer } from 'src/customers/domain/customer.domain';
import { RefreshJwtGuard } from '../guards/refresh-jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('logIn')
  // async login(@Request() req) {
  //   return await this.authService.logIn(req.)
  // }

  @Post('register')
  async registerCustomer(@Body() customer: Customer) {
    return await this.customersService.createCustomer(customer);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refrehToken(req.customer);
  }
}
