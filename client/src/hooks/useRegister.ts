import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AuthResponse } from "../../../shared/types/auth.dto";
import type { RegisterDTO } from "../features/auth/dto/register.dto";

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload: RegisterDTO) => {
      const { data } = await api.post<AuthResponse>("/auth/register", payload);
      return data;
    },
    onError(error, _variables, _onMutateResult, _context) {
      console.log(error?.response?.data);
    },
  });
