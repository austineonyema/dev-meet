import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { User } from "../../../shared/types/user";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<User[]>("/user");
      return data;
    },
    // staleTime: 1000 * 60 * 5, // 5 min caching
  });
