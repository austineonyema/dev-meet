export type PostCategory = "Kernel" | "Sudo" | "Git" | "Frontend" | "Networking";

export type PostAuthor = {
  name: string;
  username: string;
  avatar: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: PostAuthor;
  tags: string[];
  readingTime: string;
  createdAt: string;
  likes: number;
  comments: number;
  category: PostCategory;
};
