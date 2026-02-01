import { Prisma } from '@prisma/client';

export const tagInclude = {
  posts: true,
} as const;

export type TagWithRelations = Prisma.TagGetPayload<{
  include: typeof tagInclude;
}>;

export const tagIncludeGlobal = {
  // author:
  // {
  //   select: {
  //     id: true,
  //     email: true,
  //     name: true,
  //     role: true,
  //     createdAt: true,
  //     updatedAt: true,
  //   },
  //},
  author: true,
  posts: true,
} as const;

export type TagWithRelationsAdmin = Prisma.TagGetPayload<{
  include: typeof tagInclude;
}>;
