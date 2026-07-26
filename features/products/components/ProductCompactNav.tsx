"use client";

import { buttonVariants } from "@/components/ui/button";
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

function NavButton({
  isScrolled,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { isScrolled: boolean }) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant: "default",
          className: cn(
            "size-9 rounded-full bg-muted-foreground p-0 transition-all duration-150 [&>svg]:size-full! [&>svg]:transition-all [&>svg]:duration-150",
            isScrolled && "bg-transparent [&>svg]:text-muted-foreground",
            className
          ),
        })
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default function ProductCompactNav() {
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
      <NavButton isScrolled={scrolled}>
        <IconArrowNarrowLeft />
      </NavButton>

      <InputGroup
        className={cn(
          "invisible w-full transition-all duration-150",
          scrolled && "visible"
        )}
      >
        <InputGroupInput placeholder="Search on GoodGoods" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm">
            <SearchIcon />
            <span className="sr-only">search</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-none gap-3">
        <NavButton isScrolled={scrolled} className="p-0.5">
          <IconShoppingCart />
        </NavButton>

        <NavButton isScrolled={scrolled}>
          <IconDotsVerticalFilled />
        </NavButton>
      </div>
    </header>
  );
}
