"use client";

import { Cart, CartItem } from "@/app/(shared)/_types/cart";
import { ProductCartItem } from "@/app/(shared)/_types/product";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { executeSafeAction } from "@/lib/safeActionWrappers";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../../app/(main)/_actions/addToCart";
import { cartKeys } from "../utils/cartKeys";

export default function useAddToCart() {
  return useMutation({
    mutationFn: async ({
      product,
      quantity = 1,
    }: {
      product: ProductCartItem;
      quantity?: number;
    }) => {
      return await executeSafeAction(
        addToCart({ productId: product.id, quantity })
      );
    },
    networkMode: "offlineFirst",
    onMutate: async ({ product, quantity = 1 }, context) => {
      await context.client.cancelQueries({ queryKey: [...cartKeys.cart] });
      const previousCart = context.client.getQueryData<Cart>([
        ...cartKeys.cart,
      ]);

      context.client.setQueryData<Cart>([...cartKeys.cart], (oldCart) => {
        if (!oldCart) {
          return oldCart;
        }

        const alreadyExists = oldCart.items.some(
          (item) => item.product.id === product.id
        );

        if (alreadyExists) {
          return {
            ...oldCart,
            items: oldCart.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalQuantity: oldCart.totalQuantity + quantity,
          };
        } else {
          const newCartItem: CartItem = {
            id: crypto.randomUUID(),
            isFavoritedByUser: false,
            isQuantityAdjusted: false,
            product,
            quantity: 1,
          };

          return {
            ...oldCart,
            items: [newCartItem, ...oldCart.items],
            totalQuantity: oldCart.totalQuantity + quantity,
          };
        }
      });

      return { previousCart };
    },
    onSuccess: () => {
      toastWithButton({
        type: "success",
        message: "Successfully added to cart",
      });
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: [...cartKeys.cart],
        exact: true,
      });
    },
    onError: (err, newCart, onMutateResult, context) => {
      context.client.setQueryData(
        [...cartKeys.cart],
        onMutateResult?.previousCart
      );

      toastWithButton({
        type: "error",
        message: "Failed to add to cart, Please try again later",
      });
    },
  });
}
