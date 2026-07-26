"use client";

import useAddToCart from "@/app/(main)/cart/_hooks/useAddToCart";
import { ProductPreview } from "@/app/(shared)/_types/product";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

// const BUTTON_VARIANT = buttonVariants({
//   variant: "outline",
//   size: "lg",
//   className: "h-10",
// });

type AddToCartButtonProps = {
  product: ProductPreview;
  quantity: number;
  isAuthenticated: boolean;
};

export default function AddToCartButton({
  product,
  isAuthenticated,
  quantity,
}: AddToCartButtonProps) {
  const { mutate } = useAddToCart();
  const router = useRouter();

  const handleOnClick = () => {
    if (isAuthenticated) {
      mutate({ product, quantity });
    } else {
      router.push("/login");
    }
  };

  return (
    <Button variant="outline" className="h-10 px-4" onClick={handleOnClick}>
      <IconShoppingCartPlus /> Add to Cart
    </Button>
  );
}
