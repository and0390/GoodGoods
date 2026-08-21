"use client";

import { ProductCartItem } from "@/app/(shared)/_types/product";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import useAddToCart from "../hooks/useAddToCart";

export default function AddToCartDropdownItem({
  product,
  isAuthenticated,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem> & {
  product: ProductCartItem;
  isAuthenticated: boolean;
}) {
  const { mutate, isPending } = useAddToCart();
  const router = useRouter();
  const pathName = usePathname();

  const handleOnClick = () => {
    if (!isAuthenticated) return router.push(`/login?redirect=${pathName}`);
    mutate({ product });
  };

  return (
    <DropdownMenuItem disabled={isPending} onClick={handleOnClick} {...props}>
      Add to Cart
    </DropdownMenuItem>
  );
}
