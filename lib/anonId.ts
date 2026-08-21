import { createId } from "@paralleldrive/cuid2";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ANON_COOKIE_NAME = "anon_id";

export const ANON_COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 90, // 90 hari
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
};

export function handleProxyAnonId({
  request,
  requestHeaders,
  isAuthenticated,
}: {
  request: NextRequest;
  requestHeaders: Headers;
  isAuthenticated: boolean;
}) {
  const existingAnonId = request.cookies.get(ANON_COOKIE_NAME)?.value ?? null;

  if (isAuthenticated || existingAnonId) {
    return { anonId: existingAnonId ?? null, isNewAnon: false };
  }

  const newAnonId = createId();

  const currentCookieHeader = request.headers.get("cookie") ?? "";
  requestHeaders.set(
    "cookie",
    `${ANON_COOKIE_NAME}=${newAnonId}; ${currentCookieHeader}`
  );

  return { anonId: newAnonId, isNewAnon: true };
}

export async function getAnonId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ANON_COOKIE_NAME)?.value ?? null;
}
