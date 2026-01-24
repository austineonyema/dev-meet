import { PostEntity } from 'src/posts/entities/post.entity';

export class UserEntity {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  createdAt: Date;
  updatedAt: Date;

  posts?: PostEntity[];
}
