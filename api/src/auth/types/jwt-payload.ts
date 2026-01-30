import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email?: string; //optional
  name?: string; //optional
  role: Role;
  iat?: number; // issued at
  exp?: number; // expiration
}
