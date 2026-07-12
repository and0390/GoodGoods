"use client";

import { HttpError } from "@/app/(shared)/_lib/api";
import { CartPreviewError } from "./CartPreviewError";
import { CartItemList } from "./CartItemList";
import { useCartQuery } from "../_hooks/useCartQuery";
import React from "react";
import { Cart } from "@/app/(shared)/_types/cart";

type CartQueryLoaderProps = {
  cartPromise: Promise<Cart>;
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  handleToggleItem: (itemId: string) => void;
  selectedItems: string[];
};

const CartQueryLoader = ({
  cartPromise,
  selectedItems,
  setSelectedItems,
  handleToggleItem,
}: CartQueryLoaderProps) => {
  const initialCart = React.use(cartPromise);

  const {
    data: cart,
    error,
    isSuccess,
    refetch,
  } = useCartQuery({
    enabled: true, // allowing fetch on mount
    initialData: initialCart,
  });

  const allItemsSelected =
    selectedItems.length === cart.items.length
      ? true
      : selectedItems.length === 0
        ? false
        : "indeterminate";

  const handleSetAllItems = () => {
    if (allItemsSelected === true || allItemsSelected === "indeterminate") {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.items.map((item) => item.id));
    }
  };

  const statusCode =
    (error instanceof HttpError && error.statusCode) || undefined;

  return isSuccess ? (
    <CartItemList
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      cart={cart}
      handleToggleItem={handleToggleItem}
      allItemsSelected={allItemsSelected}
      handleSetAllItems={handleSetAllItems}
    />
  ) : (
    <CartPreviewError
      className="h-auto w-full rounded-2xl bg-muted py-20"
      variant="grid"
      statusCode={statusCode}
      size="lg"
      onRetry={refetch}
    />
  );
};

export default CartQueryLoader;
