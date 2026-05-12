import { z } from "zod";
import { passwordSchema } from "../../_schemas/auth";

const baseResetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
});

export const resetPasswordSchema = baseResetPasswordSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "password do not match",
    path: ["confirmPassword"],
    when(payload) {
      return baseResetPasswordSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  }
);

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
