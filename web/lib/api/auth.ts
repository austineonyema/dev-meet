import { apiRequest } from "./http";
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/lib/auth/auth-models";

export type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
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
