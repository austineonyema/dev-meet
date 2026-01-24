export interface JwtPayload {
  sub: string;
  email?: string; //optional
  name?: string; //optional
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
  iat?: number; // issued at
  exp?: number; // expiration
}
