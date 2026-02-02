import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { LoginDto } from "../features/auth/dto/login.dto";
import type { AuthResponse } from "../../../shared/types/auth.dto";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginDto) => {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    },
  });
