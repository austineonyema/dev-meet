import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const usePosts = () =>
  useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      const { data } = await api.get("/user-post");
      return data;
    },
  });
