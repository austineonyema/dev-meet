import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(10, "Post content must be at least 10 characters long")
    .max(10000, "Post content is too long"),
});

export type PostFormData = z.infer<typeof postSchema>;
