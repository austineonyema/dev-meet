import { Post, Tag, User } from '@prisma/client';

/**
 * Relations to include whenever a Post is returned.
 * Centralizing this prevents duplication and keeps queries consistent.
 */
export const postInclude = {
  author: true,
  tags: true,
} as const;

/**
 * Type representing a Post with its commonly loaded relations.
 */
export type PostWithRelations = Post & {
  author: User;
  tags: Tag[];
};
