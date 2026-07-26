import MainNav from "@/app/(main)/_components/MainNav";
import { IconMessage2 } from "@tabler/icons-react";
import React from "react";
import ProductCompactNav from "../../../../../features/products/components/ProductCompactNav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function ProductDetailLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="relative flex w-full flex-1 flex-col pb-[72px] lg:pb-0">
      <MainNav className="hidden lg:block" />
      <ProductCompactNav />
      <main className="flex w-full flex-1 flex-col">{children}</main>
      <section
        aria-label="Product Actions"
        className="fixed inset-x-0 bottom-0 z-70 flex items-center gap-3 bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden"
      >
        <button
          type="button"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "size-12 flex-none rounded-full",
            })
          )}
        >
          <IconMessage2 className="size-8 text-primary" />
        </button>
        <button
          type="button"
          className={cn(
            buttonVariants({
              variant: "outline",
              className:
                "h-12 w-[216px] flex-1 rounded-full text-sm md:flex-none md:text-base",
            })
          )}
        >
          Add To Cart
        </button>
        <button className="flex h-12 w-[216px] flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground md:flex-none md:text-base">
          Buy now
        </button>
      </section>
    </div>
  );
}
