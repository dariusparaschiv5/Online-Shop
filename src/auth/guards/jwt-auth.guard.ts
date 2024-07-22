import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }
//     try {
//       const secret = process.env.JWT_SECRET;
//       const payload = await this.jwtService.verifyAsync(token, { secret });
//       request.user = payload;
//     } catch (err) {
//       throw new UnauthorizedException('Invalid token');
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const authHeader = request.headers.authorization;
//     if (!authHeader) {
//       return undefined;
//     }
//     const [type, token] = authHeader.split(' ');
//     return type === 'Bearer' ? token : undefined;
//   }
// }
