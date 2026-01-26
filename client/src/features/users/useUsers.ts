import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get("/users");
      return data;
    },
  });
