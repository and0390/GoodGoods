"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { startTransition, useActionState, useTransition } from "react";
import addToCart from "../../_actions/addToCart";
import React from "react";
import { toast } from "sonner";

export const AddToCartDropdownItem = ({
  productId,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem> & { productId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleOnSelect = () => {
    startTransition(async () => {
      const result = await addToCart(productId);
      if (result.success) {
        toast.success("Added to cart!");
      } else {
        toast.error("Failed to add to cart", {
          description: "Please, Try again later!",
        });
      }
    });
  };

  return (
    <DropdownMenuItem onSelect={handleOnSelect} disabled={isPending} {...props}>
      Add to Cart
    </DropdownMenuItem>
  );
};
