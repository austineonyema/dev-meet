export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  user: AuthUser;
  requiresLogin: boolean;
  message?: string;
};

export type BffErrorResponse = {
  message: string;
  code?: string;
};
