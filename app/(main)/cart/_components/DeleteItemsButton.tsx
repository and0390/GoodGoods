"use client";

import { Button } from "@/components/ui/button";
import React from "react";
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
import useDeleteItems from "../_hooks/useDeleteItems";
import { CheckboxSelection } from "../_types/checkboxSelection";

type DeleteItemsButtonProps = {
  allItemsSelected: CheckboxSelection;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DeleteItemsButton = ({
  allItemsSelected,
  selectedItems,
  setSelectedItems,
}: DeleteItemsButtonProps) => {
  const selectedItemsCount = selectedItems.length;
  const hasSelectedItems = selectedItemsCount > 1;

  const { mutate, isPending } = useDeleteItems({
    selectedItems,
    setSelectedItems,
  });

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
