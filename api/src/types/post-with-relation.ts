import { Prisma } from '@prisma/client';

export const postInclude = {
  // author: {
  //   select: {
  //     // id: true,
  //     // email: true,
  //     name: true,
  //     // role: true,
  //     // createdAt: true,
  //     // updatedAt: true,
  //   },
  // },
  tags: true,
} as const;

// Type representing a Post with its commonly loaded relations
export type PostWithRelations = Prisma.PostGetPayload<{
  include: typeof postInclude;
}>;
// For admin or global use, same include but could add more fields

export const postIncludeGlobal = {
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
  tags: true,
  // comments: true, // optional,  comments loaded too
  // likes: true,    // optional, for want likes
} as const;

export type PostWithRelationsAdmin = Prisma.PostGetPayload<{
  include: typeof postIncludeGlobal;
}>;
