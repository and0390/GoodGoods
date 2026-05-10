import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import ResetPasswordEmail from "@/emails/ResetPasswordEmail";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "./prisma";
export const auth = betterAuth({
  appName: "GoodGoods",
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordEmail({ name: user.name, resetUrl: url }),
      });
    },
  },
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ],
  plugins: [nextCookies()],
});
