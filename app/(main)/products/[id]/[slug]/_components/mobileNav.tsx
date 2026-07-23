"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  IconArrowNarrowLeft,
  IconDotsVerticalFilled,
  IconShoppingCart,
} from "@tabler/icons-react";
import { SearchIcon } from "lucide-react";
import React from "react";

export default function MobileNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <header
      className={cn(
        "fixed top-0 z-100 flex w-full gap-8 p-3 transition-all duration-150 lg:hidden",
        scrolled
          ? "border-b border-sidebar-border bg-sidebar text-sidebar-foreground"
          : "bg-transparent"
      )}
    >
      <button className="size-8 flex-none">
        <IconArrowNarrowLeft className="size-full" />
      </button>

      <InputGroup className="w-full">
        <InputGroupInput placeholder="Search on GoodGoods" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm">
            <SearchIcon />
            <span className="sr-only">search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-none gap-3">
        <button className="size-8 flex-none">
          <IconShoppingCart className="size-full" />
        </button>

        <button className="size-8 flex-none">
          <IconDotsVerticalFilled className="size-full" />
        </button>
      </div>
    </header>
  );
}
