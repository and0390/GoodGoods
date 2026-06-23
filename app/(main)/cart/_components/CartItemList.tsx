"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CartPreviewEmpty } from "../../_components/cartHoverCard/CartPreviewEmpty";
import { useCartContext } from "../contexts/CartContext";
import { CartItemCard } from "./CartItemCard";
import { DeleteItemsButton } from "./DeleteItemsButton";
import React from "react";
import { useSelectedItemsContext } from "../contexts/SelectedItemsContext";

export const CartItemList = () => {
  const { cart, allItemsSelected, handleSetAllItems } = useCartContext();
  const { selectedItems } = useSelectedItemsContext();
  const hasCartItems = cart.items.length > 0;
  const selectedItemsSet = React.useMemo(
    () => new Set(selectedItems),
    [selectedItems]
  );

  return (
    <div className="flex flex-1 flex-col gap-3">
      {hasCartItems ? (
        <>
          <Card className="rounded-none rounded-t-2xl">
            <CardContent className="flex gap-4">
              <Checkbox
                checked={allItemsSelected}
                onCheckedChange={handleSetAllItems}
              />
              <span className="text-sm font-semibold">
                Select all ({cart.totalQuantity})
              </span>
              <DeleteItemsButton />
            </CardContent>
          </Card>

          {cart.items.map((item, index) => {
            const isLastItem = index === cart.items.length - 1;
            return (
              <CartItemCard
                key={item.id}
                selectedItemsSet={selectedItemsSet}
                cartItem={item}
                className={cn(isLastItem && "rounded-b-2xl")}
              />
            );
          })}
        </>
      ) : (
        <CartPreviewEmpty
          className="h-auto w-full items-stretch justify-center rounded-2xl bg-muted py-20"
          variant="grid"
          size="lg"
        />
      )}
    </div>
  );
};
