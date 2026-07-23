import MainNav from "@/app/(main)/_components/MainNav";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  IconArrowNarrowLeft,
  IconDotsVerticalFilled,
  IconMessage2,
  IconShoppingCart,
} from "@tabler/icons-react";
import { SearchIcon } from "lucide-react";
import React from "react";
import MobileNav from "./_components/mobileNav";

export default function ProductLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="relative flex w-full flex-1 flex-col pb-[72px] lg:pb-0">
      <MainNav />
      <MobileNav />
      {children}
      <div className="fixed inset-x-0 bottom-0 z-70 flex items-center gap-3 bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <button className="flex size-12 flex-none items-center justify-center rounded-full border-2 border-primary hover:bg-primary-foreground">
          <IconMessage2 className="size-8 text-primary" />
        </button>
        <button className="h-12 w-[216px] flex-1 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary hover:bg-primary-foreground md:flex-none md:text-base">
          Add To Cart
        </button>
        <button className="flex h-12 w-[216px] flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground md:flex-none md:text-base">
          Buy now
        </button>
      </div>
    </div>
  );
}
