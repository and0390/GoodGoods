import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const CartHoverCardHeaderSkeleton = () => {
  return (
    <div className="flex w-full justify-between p-3">
      <Skeleton className="h-8 w-26" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
};

type CartHoverCardHeaderProps = {
  totalQuantity?: number;
};

const CartHoverCardHeader = ({ totalQuantity }: CartHoverCardHeaderProps) => {
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

export default CartHoverCardHeader;
