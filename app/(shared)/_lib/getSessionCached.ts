import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as React from "react";

export const getSessionCached = React.cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
