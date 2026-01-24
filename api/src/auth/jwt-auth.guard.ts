import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // This extends Passport's built-in guard
  // 'jwt' refers to our JwtStrategy
}
// Usage: @UseGuards(JwtAuthGuard)
// Automatically runs JwtStrategy for that route
