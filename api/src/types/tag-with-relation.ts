import { Post, Tag, User } from '@prisma/client';

// Only the fields we expose
export type SafeUser = Omit<User, 'password'>;
/**
 * Relations to include whenever a tag is returned.
 * Centralizing this prevents duplication and keeps queries consistent.
 */
export const tagInclude = {
  author: {
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  posts: true,
} as const;

/**
 * Type representing a Post with its commonly loaded relations.
 */
export type TagWithRelations = Tag & {
  author: SafeUser;
  posts: Post[];
};
