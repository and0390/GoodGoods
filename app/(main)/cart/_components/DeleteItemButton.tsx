"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useDeleteItems from "../_hooks/useDeleteItems";

type DeleteItemButtonProps = {
  cartItemId: string;
};

export const DeleteItemButton = ({ cartItemId }: DeleteItemButtonProps) => {
  const { mutate, isPending } = useDeleteItems();

  const handleDeleteItem = () => {
    mutate([cartItemId]);
  };

  return (
    <Button
      variant="plain"
      size="fit"
      onClick={handleDeleteItem}
      disabled={isPending}
    >
      <Trash2 className="size-5.5" />
      <span className="sr-only">remove item</span>
    </Button>
  );
};
