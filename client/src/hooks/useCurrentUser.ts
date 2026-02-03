import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("user/me");
      return data;
    },
    retry: false,
    enabled: !!localStorage.getItem("token"),
  });
