import { getCart } from "@/app/(shared)/_lib/getCart";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { Skeleton } from "@/components/ui/skeleton";
import CartHoverCard from "@/features/cart/components/CartHoverCard";
import { Suspense } from "react";

export async function CartHoverCardStreaming() {
  const session = await getSessionCached();
  const initialCart = session ? getCart(session.user.id) : null;

  return (
    <Suspense fallback={<Skeleton className="size-[26px]" />}>
      <CartHoverCard cart={initialCart} isAuthenticated={!!session} />
    </Suspense>
  );
}
