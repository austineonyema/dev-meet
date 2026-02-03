import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().nonempty(),
  username: z.optional(z.string()), // for future use. when i decide to add usernames upon registeration
});
export type RegisterFormData = z.infer<typeof registerSchema>;
