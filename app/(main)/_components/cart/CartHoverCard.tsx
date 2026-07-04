import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { CartPreviewSkeleton } from "./CardSkeleton";
import { CartPreview } from "./CartPreview";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const CartWithBadge = async ({ userId }: { userId: string }) => {
  const aggregate = await prisma.cartItem.aggregate({
    where: { cart: { userId } },
    _sum: {
      quantity: true,
    },
  });

  const totalQuantity = aggregate._sum.quantity ?? 0;

  if (totalQuantity === 0) {
    return <RiShoppingCart2Line className="size-5" />;
  }

  return (
    <div className="relative">
      <RiShoppingCart2Line className="size-6 rounded-full" />
      <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-1">
        {totalQuantity}
      </Badge>
    </div>
  );
};

export const CartHoverCard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const href = session ? `/cart/${session.user.id}` : `/login?next=/cart`;

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
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
      </HoverCardTrigger>
      <HoverCardContent
        className="w-100 rounded-sm rounded-t-none p-0"
        side="bottom"
        sideOffset={52}
      >
        {session ? (
          <Suspense fallback={<CartPreviewSkeleton />}>
            <CartPreview userId={session.user.id} />
          </Suspense>
        ) : (
          <CartPreviewEmpty />
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
