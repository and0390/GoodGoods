import { auth } from "@/lib/auth";

export type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export type AuthUser = AuthSession["user"];

export type AuthSessionData = AuthSession["session"];
