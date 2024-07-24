import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CustomersService } from '../../customers/service/customers.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RefreshJwtGuard } from '../guards/refresh-jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('logIn')
  async login(@Request() req) {
    return await this.authService.logIn(req.body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refrehToken(req.body);
  }
}
