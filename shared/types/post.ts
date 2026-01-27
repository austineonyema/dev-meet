export interface Post {
  id: string;
  title: string;
  content?: string;
  published?: boolean;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}
