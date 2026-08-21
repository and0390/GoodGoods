import { Cart } from "@/app/(shared)/_types/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartEmptyState from "@/features/cart/components/CartEmptyState";
import Link from "next/link";
import CartItemCard from "./CartItemCard";

type CartHoverCardItemListProps = {
  cart: Cart;
};

const CartItemList = ({ cart }: CartHoverCardItemListProps) => {
  const hasItems = cart.items.length > 0;
  const totalQuantity = cart.totalQuantity;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-bold text-popover-foreground">
          Your Cart{" "}
          <span className="text-lg font-bold text-muted-foreground">
            ({totalQuantity})
          </span>
        </h3>

        <Button
          variant="link"
          asChild
          className="px-0 text-base font-semibold hover:no-underline"
        >
          <Link href="/cart">See more</Link>
        </Button>
      </div>

      <Separator />

      {hasItems ? (
        <div
          className="min-h-0 flex-none overflow-y-auto"
          style={{
            maxHeight:
              "calc(240px + var(--spacing) * 20)" /* Fits exactly 4 items: 4×60px + 2×p-4 + 3×gap-4 */,
          }}
        >
          <div className="flex w-full flex-col gap-4 p-4 pe-4">
            {cart.items.map((cartItem) => (
              <CartItemCard key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        </div>
      ) : (
        <CartEmptyState />
      )}
    </div>
  );
};

export default CartItemList;
