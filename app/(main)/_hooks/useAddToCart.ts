"use client";

import { Cart, CartItem } from "@/app/(shared)/_types/cart";
import { ProductPreview } from "@/app/(shared)/_types/product";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { addToCart } from "../_actions/addToCart";
import useMutationCartBase from "./useMutationCartBase";

export default function useAddToCart() {
  const mutation = useMutationCartBase({
    mutationFn: async (product: ProductPreview) => {
      const { data, serverError } = await addToCart([product.id]);
      if (data) {
        if (data.success) {
          toastWithButton({
            type: "success",
            message: data.message,
          });
        } else {
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
    networkMode: "offlineFirst",
    onMutate: async (product, context) => {
      await context.client.cancelQueries({ queryKey: ["cart"] });
      const previousCart = context.client.getQueryData<Cart>(["cart"]);

      context.client.setQueryData<Cart>(["cart"], (oldCart) => {
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
            totalQuantity: oldCart.totalQuantity + 1,
          };
        } else {
          const newCartItem: CartItem = {
            id: crypto.randomUUID(),
            isFavorited: false,
            isQuantityAdjusted: false,
            product,
            quantity: 1,
          };

          return {
            ...oldCart,
            items: [newCartItem, ...oldCart.items],
            totalQuantity: oldCart.totalQuantity + 1,
          };
        }
      });

      return { previousCart };
    },
    onError: (err, newCart, onMutateResult, context) =>
      context.client.setQueryData(["cart"], onMutateResult?.previousCart),
  });

  return mutation;
}
