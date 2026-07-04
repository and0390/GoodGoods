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
        <div className="flex gap-3">
          <div className="row-span-2">
            <Checkbox
              checked={selectedItemsSet.has(cartItem.id)}
              onCheckedChange={() => handleToggleItem(cartItem.id)}
            />
          </div>
          <div className="grid w-full flex-1 grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1">
            <div className="row-span-3">
              <Image
                src={cartItem.product.imageUrl as string}
                alt="Product"
                width={86}
                height={86}
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            <div className="items-start justify-self-start">
              <Button variant="plain" size="fit" asChild>
                <Link
                  href={`/products/${cartItem.product.id}`}
                  className="line-clamp-2 w-full p-0! text-base"
                >
                  {cartItem.product.name}
                </Link>
              </Button>
            </div>

            <div className="col-start-2 row-start-2 flex items-start">
              <p className="text-base text-muted-foreground">variant</p>
            </div>

            <div className="col-start-3 row-span-2 row-start-1 flex min-w-0 items-start gap-1 justify-self-end font-semibold">
              <span className="truncate text-sm">
                {formatCurrency(cartItem.product.price)}
              </span>
            </div>

            <div className="col-span-2 col-start-2 row-start-3 justify-self-end">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-4">
                  <ToggleFavoriteButton
                    cartItemId={cartItem.id}
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
        </div>
        <div className="col-start-2 flex w-full justify-end"></div>
      </CardContent>
    </Card>
  );
};
