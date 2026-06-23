"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { deleteCartItems } from "../_actions/deleteCartItems";
import { useQueryClient } from "@tanstack/react-query";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { CartOptimisticAction } from "../_types/CartOptimisticAction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCartContext } from "../contexts/CartContext";
import { Cart } from "@/app/(shared)/_types/cart";
import { useSelectedItemsContext } from "../contexts/SelectedItemsContext";
import useDeleteItems from "../_hooks/useDeleteItems";

export const DeleteItemsButton = () => {
  const { allItemsSelected } = useCartContext();
  const { selectedItems } = useSelectedItemsContext();
  const selectedItemsCount = selectedItems.length;
  const hasSelectedItems = selectedItemsCount > 1;

  const { mutate, isPending } = useDeleteItems();

  const handleDeleteItems = () => {
    mutate(selectedItems);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="ms-auto"
          variant="plain"
          size="fit"
          disabled={allItemsSelected === false}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete {selectedItemsCount}{" "}
            {hasSelectedItems ? "products" : "product"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasSelectedItems ? "These products" : "This product"} will be
            deleted from your cart right away
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteItems} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
