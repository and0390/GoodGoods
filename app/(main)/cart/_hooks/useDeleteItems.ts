import { Cart } from "@/app/(shared)/_types/cart";
import { toastWithButton } from "@/components/ui/toastWithButton";
import useMutationCartBase from "../../_hooks/useMutationCartBase";
import { deleteCartItems } from "../_actions/deleteCartItems";
import { useSelectedItemsContext } from "../contexts/SelectedItemsContext";

export default function useDeleteItems() {
  const { setSelectedItems, selectedItems } = useSelectedItemsContext();
  const mutation = useMutationCartBase({
    mutationFn: async (cartItemIds: string[]) => {
      const { data, serverError } = await deleteCartItems(cartItemIds);
      if (data) {
        if (data.success) {
          toastWithButton({
            type: "success",
            message: data.message,
          });
        } else {
          toastWithButton({
            type: "success",
            message: "Unable to delete item from your cart",
          });
        }
      } else if (serverError) {
        toastWithButton({
          type: "error",
          message: "Unable to delete item from your cart",
        });
      }
    },
    networkMode: "offlineFirst",
    onMutate: async (cartItemIds, context) => {
      await context.client.cancelQueries({ queryKey: ["cart"] });
      const previousCart = context.client.getQueryData(["cart"]) as Cart;

      const itemIdSet = new Set(cartItemIds);

      /**
       *  remove from selectedIds
       */
      setSelectedItems((prev) =>
        prev.filter((itemId) => !itemIdSet.has(itemId))
      );

      context.client.setQueryData(["cart"], (oldCart: Cart) => {
        let totalQuantityToDelete = 0;

        const updatedCartItems = oldCart.items.filter((item) => {
          if (itemIdSet.has(item.id)) totalQuantityToDelete += item.quantity;
          return !itemIdSet.has(item.id);
        });

        return {
          ...oldCart,
          items: updatedCartItems,
          totalQuantity: oldCart.totalQuantity - totalQuantityToDelete,
        };
      });

      return { previousCart, previousSelectedItems: [...selectedItems] };
    },
    onError: (err, newCart, onMutateResult, context) => {
      context.client.setQueryData(["cart"], onMutateResult?.previousCart);
      if (onMutateResult?.previousSelectedItems)
        setSelectedItems(onMutateResult.previousSelectedItems);
    },
    onSettled: (data, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ["cart"] }),
  });

  return mutation;
}
