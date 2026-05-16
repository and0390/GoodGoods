import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { auth } from "@/lib/auth";
import { ShoppingCart } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { CartPreview } from "./CartPreview";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { Suspense } from "react";
import { CartPreviewSkeleton } from "./CardSkeleton";

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
            <ShoppingCart className="size-5" />
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
