import { z } from "zod";
import { emailSchema, passwordSchema } from "../../_schemas/auth";

export const signupSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  email: emailSchema,
  password: passwordSchema,
});

export type SignupSchema = z.infer<typeof signupSchema>;
