import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { CustomersModule } from '../customers/customers.module';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    RolesGuard,
  ],
  controllers: [AuthController],
  imports: [
    CustomersModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
