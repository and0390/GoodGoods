import { CartItem } from "@/app/(shared)/_types/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DeleteItemButton } from "./DeleteItemButton";
import { QuantityInputGroup } from "./QuantityInputGroup";
import { ToggleFavoriteButton } from "./ToggleFavoriteButton";

type CartItemCardProps = {
  cartItem: CartItem;
  selectedItemsSet: Set<string>;
  handleToggleItem: (itemId: string) => void;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
} & React.ComponentProps<typeof Card>;

export const CartItemCard = ({
  cartItem,
  selectedItemsSet,
  selectedItems,
  setSelectedItems,
  handleToggleItem,
  className,
  ...props
}: CartItemCardProps) => {
  return (
    <Card className={cn("w-full rounded-none", className)} {...props}>
      <CardContent className="w-full">
        <div className="flex w-full items-center gap-3">
          {/* SEKTOR KIRI: Checkbox */}
          <div className="shrink-0">
            <Checkbox
              checked={selectedItemsSet.has(cartItem.id)}
              onCheckedChange={() => handleToggleItem(cartItem.id)}
            />
          </div>

          <div className="shrink-0">
            <Image
              src={cartItem.product.imageUrl}
              alt="Product"
              width={86}
              height={86}
              className="aspect-square h-full rounded-md object-cover"
            />
          </div>

          <div className="flex min-h-[86px] min-w-0 flex-1 flex-col justify-between gap-1">
            <div className="flex w-full items-start justify-between gap-3">
              <Button variant="plain" size="fit" asChild className="text-left">
                <Link
                  href={`/products/${cartItem.product.id}`}
                  className="line-clamp-2 p-0! text-base font-normal"
                >
                  {cartItem.product.name}
                </Link>
              </Button>

              <span className="pt-1 text-sm font-semibold whitespace-nowrap">
                {formatCurrency(cartItem.product.price)}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">variant</p>

            <div className="mt-auto flex w-full flex-col items-end gap-1">
              <div className="flex items-center gap-4">
                <ToggleFavoriteButton
                  key={cartItem.isFavorited ? "key-1" : "key-2"}
                  isFavorited={cartItem.isFavorited}
                  productId={cartItem.product.id}
                />
                <DeleteItemButton
                  cartItemId={cartItem.id}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
                <QuantityInputGroup
                  key={cartItem.quantity}
                  cartItemId={cartItem.id}
                  initialQuantity={cartItem.quantity}
                  max={cartItem.product.stock}
                />
              </div>

              {cartItem.isQuantityAdjusted && (
                <p className="text-xs text-destructive">
                  Only {cartItem.product.stock} items left in stock
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
