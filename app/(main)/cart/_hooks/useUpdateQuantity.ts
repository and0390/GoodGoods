"use client";

import { Cart } from "@/app/(shared)/_types/cart";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { useMutation } from "@tanstack/react-query";
import { updateQuantity } from "../_actions/updateQuantity";

export default function useUpdateQuantity(cartItemId: string) {
  return useMutation({
    onMutate: async (value, context) => {
      await context.client.cancelQueries({ queryKey: ["cart"] });
      const previousCart = context.client.getQueryData<Cart>(["cart"]);

      context.client.setQueryData<Cart>(["cart"], (oldCart) => {
        if (!oldCart) return oldCart;
        const updatedQuantity = oldCart.items.reduce((acc, cur) => {
          const qty = cur.id === cartItemId ? value : cur.quantity;
          return qty + acc;
        }, 0);

        return {
          ...oldCart,
          totalQuantity: updatedQuantity,
        };
      });

      return { previousCart };
    },
    networkMode: "offlineFirst",
    mutationFn: async (value: number) => {
      const { data, serverError } = await updateQuantity([cartItemId, value]);

      if (data) {
        if (!data.success) {
          toastWithButton({
            type: "error",
            message: data.message,
          });
        }
      } else if (serverError) {
        toastWithButton({
          type: "error",
          message: serverError,
        });
      }
    },
    scope: { id: `cartItem-${cartItemId}` },
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ["cart"] }),
    onError: (err, newCart, onMutateResult, context) => {
      context.client.setQueryData(["cart"], onMutateResult?.previousCart);
    },
  });
}
