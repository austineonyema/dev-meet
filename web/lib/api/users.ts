import { apiRequest } from "./http";
import type { UserRecord } from "@/lib/users";

export function getUsers() {
  return apiRequest<UserRecord[]>("/users", {
    method: "GET",
  });
}
