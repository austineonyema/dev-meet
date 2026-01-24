import type { Post } from './post.interface';
export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
  createdAt?: Date;
  updatedAt?: Date;

  posts?: Post[];
}
