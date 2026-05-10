import { z } from "zod";

const emailSchema = z.email("email is invalid");
const passwordSchema = z
  .string()
  .min(6, "password must be at least 6 characters");

export const signupSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

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

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
