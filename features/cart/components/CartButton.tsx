"use client";

import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function CartButton({
  totalQuantity = 0,
  href,
  ...props
}: {
  totalQuantity?: number;
  href: string;
} & React.ComponentProps<typeof ButtonPrimitive2>) {
  return (
    <ButtonPrimitive2 {...props} asChild>
      <Link href={href} className="relative">
        <IconShoppingCart stroke={2} className="size-7" />
        <div className="absolute top-0 right-0 min-w-4 translate-x-1/2 -translate-y-2/5 rounded-full border-2 border-sidebar bg-primary px-2 text-xs text-primary-foreground">
          {totalQuantity <= 100 ? totalQuantity : "100+"}
        </div>
      </Link>
    </ButtonPrimitive2>
  );
}
