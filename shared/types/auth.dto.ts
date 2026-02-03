import type { User } from "./user";

export type AuthResponse = {
  user: User;
  access_token: string;
};
