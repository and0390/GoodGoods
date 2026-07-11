"use client";

import { toastWithButton } from "@/components/ui/toastWithButton";
import { useMutation } from "@tanstack/react-query";
import { toggleFavorite } from "../_actions/toggleFavorite";
import { Cart } from "@/app/(shared)/_types/cart";

export default function useToggleFavorite(productId: string) {
  const toasterId = `toasterId-${productId}`;
  return useMutation({
    mutationFn: async () => {
      const { data, serverError } = await toggleFavorite(productId);

      if (data) {
        if (data.success) {
          toastWithButton({
            id: toasterId,
            type: "success",
            message: data.message,
          });
        } else {
          toastWithButton({
            id: toasterId,
            type: "error",
            message: data.message,
          });
        }
      } else if (serverError) {
        toastWithButton({
          id: toasterId,
          type: "error",
          message: serverError,
        });
      }
    },
    onMutate: async (_, context) => {
      await context.client.cancelQueries({ queryKey: ["cart"] });
      const previousCart = context.client.getQueryData<Cart>(["cart"]);

      context.client.setQueryData<Cart>(["cart"], (oldCart) => {
        if (!oldCart) {
          return oldCart;
        }

        const updatedItems = oldCart.items.map((item) =>
          item.product.id === productId
            ? { ...item, isFavorited: !item.isFavorited }
            : item
        );

        return {
          ...oldCart,
          items: updatedItems,
        };
      });

      return { previousCart };
    },
    networkMode: "offlineFirst",
    scope: { id: `toggleFavorite-${productId}` },
    onError: (err, newCart, onMutateResult, context) => {
      context.client.setQueryData(["cart"], onMutateResult?.previousCart);
    },
  });
}
