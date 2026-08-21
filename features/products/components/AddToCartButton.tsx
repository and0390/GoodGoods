"use client";

import useAddToCart from "@/features/cart/hooks/useAddToCart";
import { ProductPreview } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  product: ProductPreview;
  quantity: number;
  isAuthenticated: boolean;
} & React.ComponentProps<typeof Button>;

export default function AddToCartButton({
  product,
  isAuthenticated,
  quantity,
  className,
  ...props
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
    <Button
      {...props}
      variant="outline"
      className={cn(
        "h-12 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground lg:w-fit lg:gap-3 lg:rounded-lg lg:bg-background lg:px-5 lg:text-base lg:text-primary lg:hover:bg-primary-foreground lg:hover:text-primary",
        className
      )}
      onClick={handleOnClick}
    >
      <IconShoppingCartPlus className="hidden size-6 lg:inline" />
      Add to Cart
    </Button>
  );
}
