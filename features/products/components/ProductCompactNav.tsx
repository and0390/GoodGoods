"use client";

import { useCartQuery } from "@/app/(main)/cart/_hooks/useCartQuery";
import { Cart } from "@/app/(shared)/_types/cart";
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
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            "size-9 rounded-full bg-muted-foreground p-0 transition-all duration-150 hover:bg-muted-foreground [&>svg]:size-full! [&>svg]:transition-all [&>svg]:duration-150",
            isScrolled &&
              "bg-transparent hover:bg-transparent [&>svg]:text-muted-foreground",
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

// type ProductCompactNavProps = {
//   cart: Cart;
// };

export default function ProductCompactNav() {
  const [isScrolled, setScrolled] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  useCartQuery({});

  return (
    <header
      className={cn(
        "fixed top-0 z-100 flex w-full gap-8 p-3 transition-all duration-150 lg:hidden",
        isScrolled
          ? "border-b border-sidebar-border bg-sidebar text-sidebar-foreground"
          : "bg-transparent"
      )}
    >
      <NavButton isScrolled={isScrolled} onClick={() => router.back()}>
        <IconArrowNarrowLeft />
      </NavButton>

      <InputGroup
        className={cn(
          "invisible w-full transition-all duration-150",
          isScrolled && "visible"
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
        <NavButton
          isScrolled={isScrolled}
          className="relative p-0.5"
          onClick={() => router.push("/cart")}
        >
          <IconShoppingCart />
          <span className="absolute -top-1 -right-1 flex aspect-square h-5 min-w-5 items-center justify-center rounded-full bg-primary p-1 leading-none">
            2
          </span>
        </NavButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <NavButton isScrolled={isScrolled}>
              <IconDotsVerticalFilled />
            </NavButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
