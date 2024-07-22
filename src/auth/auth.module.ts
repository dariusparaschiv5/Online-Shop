import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CustomersService } from 'src/customers/service/customers.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { CustomersRepository } from 'src/customers/repository/customers.repository';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  providers: [
    AuthService,
    CustomersService,
    JwtService,
    JwtStrategy,
    RefreshJwtStrategy,
    CustomersRepository,
  ],
  controllers: [AuthController],
  imports: [
    CustomersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
