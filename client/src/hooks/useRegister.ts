import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AuthResponse } from "../../../shared/types/auth.dto";
import type { RegisterDTO } from "../features/auth/dto/register.dto";
import type { AxiosError } from "axios";

type ApiError = {
  message: string;
  error: string;
  statusCode: number;
};

export const useRegister = () =>
  useMutation<AuthResponse, AxiosError<ApiError>, RegisterDTO>({
    mutationFn: async (payload: RegisterDTO) => {
      const { data } = await api.post<AuthResponse>("/auth/register", payload);
      return data;
    },
  });
