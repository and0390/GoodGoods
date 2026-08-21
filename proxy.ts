import { NextRequest, NextResponse, userAgent } from "next/server";
import { getSession } from "./app/(shared)/_lib/getSession";
import {
  ANON_COOKIE_CONFIG,
  ANON_COOKIE_NAME,
  handleProxyAnonId,
} from "./lib/anonId";

export async function proxy(request: NextRequest) {
  const { device } = userAgent(request);

  const deviceType = device.type ?? "desktop";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-device-type", deviceType);

  const session = await getSession();

  const { anonId, isNewAnon } = handleProxyAnonId({
    isAuthenticated: !!session,
    request,
    requestHeaders,
  });

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isNewAnon && anonId) {
    response.cookies.set(ANON_COOKIE_NAME, anonId, ANON_COOKIE_CONFIG);
  }

  return response;
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
