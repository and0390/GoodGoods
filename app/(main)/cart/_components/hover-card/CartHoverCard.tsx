import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import CartQueryLoader from "./CartQueryLoader";
import CartIconWithBadge from "./CartWidthBadge";
import { getCart } from "@/app/(shared)/_lib/getCart";

export const CartHoverCard = async () => {
  const session = await getSessionCached();

  const href = session ? "/cart" : "/login?next=/cart";

  const cartPromise = session ? getCart(session.user.id) : null;

  return (
    <CartQueryLoader
      triggerContent={
        <Button variant="ghost" size="icon-lg">
          <Link href={href}>
            {session && cartPromise ? (
              <Suspense fallback={<Skeleton className="size-6" />}>
                <CartIconWithBadge cartPromise={cartPromise} />
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
