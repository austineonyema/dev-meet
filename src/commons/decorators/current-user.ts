import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  //Get HTTP request from context
  const request = ctx.switchToHttp().getRequest<Request>();
  // Return user (attached by JWTStrategy)
  return request.user as User;
});
