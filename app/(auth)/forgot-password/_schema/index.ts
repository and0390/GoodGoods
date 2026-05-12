import { z } from "zod";
import { emailSchema } from "../../_schemas/auth";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
