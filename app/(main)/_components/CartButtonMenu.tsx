"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

type CartButtonMenuProps = {
  isLoggedIn: boolean;
  href: string;
};

export const CartButtonMenu = ({ href, isLoggedIn }: CartButtonMenuProps) => {
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon-lg">
          <Link href={href}>
            <ShoppingCart className="size-5" />
            <span className="sr-only">cart</span>
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col items-center gap-4">
        <ShoppingCart />
        <span>Your cart is empty</span>
      </HoverCardContent>
    </HoverCard>
  );
};
