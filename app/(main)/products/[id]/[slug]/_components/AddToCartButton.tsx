"use client";

import useAddToCart from "@/app/(main)/cart/_hooks/useAddToCart";
import { ProductPreview } from "@/app/(shared)/_types/product";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";

const BUTTON_VARIANT = buttonVariants({
  variant: "outline",
  size: "lg",
  className: "flex-1 h-10",
});

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

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={BUTTON_VARIANT}>
        <MdAddShoppingCart /> Add to Cart
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className={BUTTON_VARIANT}
      onClick={() => mutate({ product, quantity })}
    >
      <MdAddShoppingCart /> Add to Cart
    </Button>
  );
}
