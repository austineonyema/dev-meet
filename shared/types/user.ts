import type { Post } from "./post";
export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  role?: "USER" | "ADMIN" | "MODERATOR";
  createdAt?: string;
  updatedAt?: string;

  posts?: Post[];
}

//TODO will make a mapper to enable true type sharing between both client and API
