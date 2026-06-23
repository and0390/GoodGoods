"use client";

import { Cart } from "@/app/(shared)/_types/cart";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React from "react";
import { useCartQuery } from "../../_hooks/useCartQuery";
import { useSelectedItemsContext } from "./SelectedItemsContext";

type CartContextType = {
  isLoading: boolean;
  cart: Cart;
  isSuccess: boolean;
  error: Error | null;
  allItemsSelected: boolean | "indeterminate";
  handleSetAllItems: () => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<NoInfer<Cart>, Error>>;
};

const CartContext = React.createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

const CartProvider = ({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart>;
}) => {
  const initialCart = React.use(cartPromise);

  const {
    data: cart,
    isPlaceholderData,
    error,
    isSuccess,
    isError,
    refetch,
  } = useCartQuery({
    enabled: true, // allowing fetch on mount
    initialData: initialCart,
  });

  const { selectedItems, setSelectedItems } = useSelectedItemsContext();

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
      // `optimisticCart` is guaranteed to exist here because the "Select All"
      // action is only available after the cart query has resolved.
      // Before that, the UI renders a loading skeleton instead.
      setSelectedItems(cart.items.map((item) => item.id));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        allItemsSelected,
        refetch,
        error: isError ? error : null,
        handleSetAllItems,
        isSuccess,
        isLoading: isPlaceholderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
