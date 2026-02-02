import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AuthResponse } from "../../../shared/types/auth.dto";
import type { RegisterDTO } from "../features/auth/dto/register.dto";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: RegisterDTO) => {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    },
  });
