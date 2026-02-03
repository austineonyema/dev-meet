import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { User } from "../../../shared/types/user";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get<User>("user/me");
      return data;
    },
    retry: false,
    enabled: !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 5,
  });
