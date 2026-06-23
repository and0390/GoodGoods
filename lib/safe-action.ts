import { getSession } from "@/app/(shared)/_lib/getSession";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (err) => {
    console.error("Action error:", err);

    const message =
      err.message === "UNAUTHORIZED"
        ? "Your session has expired, Please Log In again"
        : "Something went wrong, Please try again later";

    return message;
  },
}).use(async ({ next }) => {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return next({ ctx: { user: session.user } });
});
