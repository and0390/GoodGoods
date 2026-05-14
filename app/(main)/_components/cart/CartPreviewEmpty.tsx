import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { ComponentProps } from "react";

export const CartPreviewEmpty = ({
  className,
  ...props
}: Omit<ComponentProps<"div">, "children">) => {
  return (
    <div
      className={cn(
        "flex h-56 w-full flex-col items-center justify-center gap-4",
        className
      )}
      {...props}
    >
      <ShoppingCart />
      <span>Your cart is empty</span>
    </div>
  );
};
