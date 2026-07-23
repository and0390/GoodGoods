import { getCart } from "@/app/(shared)/_lib/getCart";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";
import CartQueryLoader from "./CartQueryLoader";
import CartIconWithBadge from "./CartWidthBadge";

export const CartHoverCard = async () => {
  const session = await getSessionCached();

  const href = session ? "/cart" : "/login?next=/cart";

  const cartPromise = session ? getCart(session.user.id) : null;

  return (
    <CartQueryLoader
      triggerContent={
        <Button variant="plain" size="icon-sm">
          <Link href={href}>
            {session && cartPromise ? (
              <Suspense fallback={<Skeleton className="size-6" />}>
                <CartIconWithBadge cartPromise={cartPromise} />
              </Suspense>
            ) : (
              <IconShoppingCart stroke={2} className="size-[26px]" />
            )}
            <span className="sr-only">cart</span>
          </Link>
        </Button>
      }
      isAuthenticated={!!session}
    />
  );
};
