"use client";

import { Cart } from "@/app/(shared)/_types/cart";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { CartItemCard } from "./CartItemCard";
import { DeleteItemsButton } from "./DeleteItemsButton";
import { CheckboxSelection } from "../_types/checkboxSelection";

type CartItemListProps = {
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItems: string[];
  cart: Cart;
  allItemsSelected: CheckboxSelection;
  handleSetAllItems: () => void;
  handleToggleItem: (itemId: string) => void;
};

export const CartItemList = ({
  selectedItems,
  setSelectedItems,
  allItemsSelected,
  cart,
  handleToggleItem,
  handleSetAllItems,
}: CartItemListProps) => {
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
              <DeleteItemsButton
                allItemsSelected={allItemsSelected}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </CardContent>
          </Card>

          {cart.items.map((item, index) => {
            const isLastItem = index === cart.items.length - 1;
            return (
              <CartItemCard
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                key={item.id}
                selectedItemsSet={selectedItemsSet}
                cartItem={item}
                className={cn(isLastItem && "rounded-b-2xl")}
                handleToggleItem={handleToggleItem}
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
