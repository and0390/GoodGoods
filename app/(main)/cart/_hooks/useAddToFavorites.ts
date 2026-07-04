"use client";

import { Cart } from "@/app/(shared)/_types/cart";
import { toastWithButton } from "@/components/ui/toastWithButton";
import useMutationCartBase from "../../_hooks/useMutationCartBase";
import addToFavorites from "../_actions/addToFavorites";

export default function useAddToFavorites() {
  return useMutationCartBase({
    mutationFn: async (productId: string) => {
      const { data, serverError } = await addToFavorites(productId);

      if (data) {
        if (data.success) {
          toastWithButton({
            type: "success",
            message: data.message,
          });
        } else if (serverError) {
          toastWithButton({
            type: "error",
            message: serverError,
          });
        }
      }
    },
    networkMode: "offlineFirst",
    onMutate: async (productId, context) => {
      await context.client.cancelQueries({ queryKey: ["cart"] });

      const previousCart = context.client.getQueryData<Cart>(["cart"]);

      context.client.setQueryData<Cart>(["cart"], (oldCart) => {
        if (!oldCart) {
          return oldCart;
        }

        const updatedItems = oldCart.items.map((item) =>
          item.product.id === productId
            ? item.isFavorited
              ? item
              : { ...item, isFavorited: !item.isFavorited }
            : item
        );
        return {
          ...oldCart,
          items: updatedItems,
        };
      });

      return { previousCart };
    },
  });
}
