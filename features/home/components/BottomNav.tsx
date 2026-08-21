"use client";

import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import { cn } from "@/lib/utils";
import { IconShoppingCart } from "@tabler/icons-react";
import { Archive, House, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { Icon: House, label: "Home", href: "/" },
  { Icon: IconShoppingCart, label: "Cart", href: "/cart" },
  { Icon: Archive, label: "Order", href: "/order" },
  { Icon: UserRound, label: "Account", href: "/account" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomNav({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const pathName = usePathname();

  return (
    <section
      className={cn(
        "fixed inset-x-0 bottom-0 w-full bg-sidebar px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))]",
        className
      )}
      {...props}
    >
      <nav className="flex w-full justify-around">
        {NAV_ITEMS.map(({ Icon, href, label }, index) => {
          return (
            <ButtonPrimitive
              key={index}
              asChild
              className={cn(
                "flex flex-col items-center gap-0 text-sm font-normal text-muted-foreground",
                isActivePath(pathName, href) && "text-primary"
              )}
            >
              <Link href={href}>
                <Icon className="size-7 flex-none" />
                {label}
              </Link>
            </ButtonPrimitive>
          );
        })}
      </nav>
    </section>
  );
}
