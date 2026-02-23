import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().nonempty(),
  username: z.optional(z.string()),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
