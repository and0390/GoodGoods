import { CartItem } from "@/app/(shared)/_types/cart";
import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";
import { ImageWithSkeleton2 } from "@/features/product-reviews/components/ImageWithSkeleton";
import DiscountBadge from "@/features/products/components/DiscountBadge";
import { cn, formatCurrency } from "@/lib/utils";
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
  const { id, imageUrl, basePrice, name, slug, promotion } = cartItem.product;

  return (
    <div
      className={cn(
        "flex w-full gap-3 [&_[data-slot=skeleton]]:rounded-sm [&>div]:first:flex-none",
        className
      )}
      {...props}
    >
      <div className="relative flex-none">
        <ImageWithSkeleton2
          src={imageUrl}
          alt={`${name} preview`}
          width={60}
          height={60}
          className="aspect-square size-[60px] overflow-hidden rounded-sm object-cover"
        />
        {promotion && <DiscountBadge value={promotion.discountPercent} />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-end justify-start">
        <div className="flex w-full min-w-0 items-start justify-between gap-3">
          <ButtonPrimitive2 asChild>
            <Link
              href={`/products/${id}/${slug}`}
              className="max-w-[50%] truncate p-0! text-base"
            >
              {name}
            </Link>
          </ButtonPrimitive2>

          <div className="col-start-3 row-start-1 flex flex-none items-center gap-1 justify-self-end truncate text-base font-bold">
            {quantity} x{" "}
            {formatCurrency(promotion ? promotion.finalPrice : basePrice)}
          </div>
        </div>

        {promotion && (
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrency(basePrice)}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItemCard;
