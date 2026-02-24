export type UserRecord = {
  id: string;
  email: string;
  name?: string;
  role?: "USER" | "ADMIN" | "MODERATOR" | string;
  createdAt?: string;
  updatedAt?: string;
};
