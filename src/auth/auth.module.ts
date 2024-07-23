import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { CustomersModule } from 'src/customers/customers.module';
import { LocalStrategy } from './strategies/local-auth.strategy';

@Module({
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [
    CustomersModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
