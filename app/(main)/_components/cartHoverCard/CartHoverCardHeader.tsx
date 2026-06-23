import { CartItem } from "@/app/(shared)/_types/cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const CartHoverCardHeaderSkeleton = () => {
  return (
    <div className="flex w-full justify-between p-3">
      <Skeleton className="h-8 w-18" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
};

type CartHoverCardHeaderBaseProps = {
  totalQuantity?: number;
};

const CartHoverCardHeaderBase = ({
  totalQuantity,
}: CartHoverCardHeaderBaseProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-1 text-lg font-semibold">
        <span>Your cart</span>
        {totalQuantity && (
          <span className="text-muted-foreground">({totalQuantity})</span>
        )}
      </div>
      <Button variant="link" asChild className="px-0">
        <Link href="/cart">See more</Link>
      </Button>
    </div>
  );
};

type CartHoverCardHeaderWithItemListProps = {
  cartItems: CartItem[];
};

const CartHoverCardHeaderWithItemList = ({
  cartItems: cartItems,
}: CartHoverCardHeaderWithItemListProps) => {
  const hasItems = cartItems.length > 0;

  if (hasItems) {
    const totalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return <CartHoverCardHeaderBase totalQuantity={totalQuantity} />;
  }

  return <CartHoverCardHeaderBase />;
};

type CartHoverCardHeaderProps = {
  isAuthenticated: boolean;
  isLoading: boolean;
  cartItems: CartItem[];
};

export const CartHoverCardHeader = ({
  isAuthenticated,
  cartItems,
  isLoading,
}: CartHoverCardHeaderProps) => {
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <CartHoverCardHeaderSkeleton />;
  }

  return <CartHoverCardHeaderWithItemList cartItems={cartItems} />;
};
