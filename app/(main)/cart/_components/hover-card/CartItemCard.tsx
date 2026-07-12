import { CartItem } from "@/app/(shared)/_types/cart";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type CartPreviewItemProps = {
  cartItem: CartItem;
} & ComponentProps<"div">;

const CartItemCard = ({
  cartItem,
  className,
  ...props
}: CartPreviewItemProps) => {
  const { quantity } = cartItem;
  const { id, imageUrl, price, name } = cartItem.product;
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[56px_auto_min-content] grid-rows-[auto_auto] gap-x-2.5",
        className
      )}
      {...props}
    >
      <div className="row-span-2">
        <Image
          src={imageUrl}
          alt="Product"
          width={56}
          height={56}
          className="aspect-square w-full rounded-sm"
        />
      </div>
      <div className="min-w-0">
        <Button variant="plain" size="fit" asChild>
          <Link href={`/products/${id}`} className="truncate p-0! text-sm">
            {name}
          </Link>
        </Button>
      </div>
      <div className="col-start-2 row-start-2 self-start">
        <span className="text-sm text-muted-foreground">variant</span>
      </div>
      <div className="col-start-3 row-start-1 flex min-w-0 items-center gap-1 justify-self-end text-sm font-semibold">
        <span>{quantity}</span>
        <span>x</span>
        <span className="truncate text-sm">{formatCurrency(price)}</span>
      </div>
      <div className="col-start-3 self-start justify-self-end">
        <span className="text-sm text-muted-foreground">
          {formatCurrency(quantity * price)}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
