"use client";

import { useCartQuery } from "@/app/(main)/cart/_hooks/useCartQuery";
import { Cart } from "@/app/(shared)/_types/cart";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import React from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

type CartIconWithBadgeProps = {
  cartPromise: Promise<Cart> | null;
};

const CartIconWithBadge = ({ cartPromise }: CartIconWithBadgeProps) => {
  const initialCart = cartPromise && React.use(cartPromise);

  const { data: cart } = useCartQuery({
    gcTime: Infinity,
    initialData: initialCart ?? undefined,
    enabled: !!initialCart,
  });

  return (
    <div className="relative">
      <RiShoppingCart2Line className="size-6 rounded-full" />
      <div className="absolute top-0 right-0 min-w-4 translate-x-1/2 -translate-y-1/2 rounded-sm bg-primary px-1.5 text-xs text-primary-foreground">
        {cart?.totalQuantity ?? 0}
      </div>
    </div>
  );
};

export default CartIconWithBadge;
