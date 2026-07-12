"use client";

import { useCartQuery } from "@/app/(main)/cart/_hooks/useCartQuery";
import { Cart } from "@/app/(shared)/_types/cart";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import React from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

type CartIconWithBadgeProps = {
  cartPromise: Promise<Cart>;
};

const CartIconWithBadge = ({ cartPromise }: CartIconWithBadgeProps) => {
  const initialCart = React.use(cartPromise);

  const { data: cart } = useCartQuery({
    gcTime: Infinity,
    initialData: initialCart,
  });

  if (cart.totalQuantity === 0) {
    return <RiShoppingCart2Line className="size-5" />;
  }

  return (
    <div className="relative">
      <RiShoppingCart2Line className="size-6 rounded-full" />
      <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-1">
        {cart.totalQuantity}
      </Badge>
    </div>
  );
};

export default CartIconWithBadge;
