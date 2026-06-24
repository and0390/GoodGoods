import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { CartHoverCardClient } from "./CartHoverCardClient";
import { CartWithBadge } from "./CartWidthBadge";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";

export const CartHoverCard = async () => {
  const session = await getSessionCached();

  const href = session ? "/cart" : "/login?next=/cart";

  return (
    <CartHoverCardClient
      triggerContent={
        <Button variant="ghost" size="icon-lg">
          <Link href={href}>
            {session ? (
              <Suspense fallback={<Skeleton className="size-6" />}>
                <CartWithBadge userId={session.user.id} />
              </Suspense>
            ) : (
              <RiShoppingCart2Line className="size-6" />
            )}
            <span className="sr-only">cart</span>
          </Link>
        </Button>
      }
      isAuthenticated={!!session}
    />
  );
};
