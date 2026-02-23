import { apiRequest } from "./http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string;
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

export function login(payload: LoginRequest) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterRequest) {
  return apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function refresh() {
  return apiRequest<LoginResponse>("/auth/refresh", {
    method: "POST",
  });
}

export function logout() {
  return apiRequest<{ ok: boolean }>("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiRequest<AuthUser>("/auth/user", {
    method: "GET",
  });
}
