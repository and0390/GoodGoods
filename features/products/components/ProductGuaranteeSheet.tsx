"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useLg from "@/features/product-reviews/hooks/useLg";
import { cn } from "@/lib/utils";
import { Banknote, ChevronRight, RotateCcw, ShieldCheck } from "lucide-react";
import { VisuallyHidden } from "radix-ui";

const guarantee = [
  {
    title: "10-Day Return Policy",
    description:
      "Your purchase is protected with our 10‑day return policy. If the product doesn’t meet your expectations, simply return it within ten days for a full refund or exchange.",
    Icon: RotateCcw,
  },
  {
    title: "100% Original",
    description:
      "Every item you purchase is 100% original. We guarantee authenticity so you can shop with complete confidence.",
    Icon: ShieldCheck,
  },
  {
    title: "Cash On Delivery",
    description:
      "Enjoy the convenience of Cash on Delivery. Pay securely at your doorstep once you’ve received your product.",
    Icon: Banknote,
  },
] as const;

export default function ProductGuaranteeSheet() {
  const isLg = useLg();
  return (
    <Sheet key={isLg ? "desktop-close" : "mobile-open"}>
      <SheetTrigger className="flex items-center gap-2 px-3 py-3 md:px-0">
        <ShieldCheck className="size-5 flex-none text-primary" />
        <p className="min-w-0 truncate text-sm font-normal text-card-foreground">
          10 - Day Return Policy &middot; 100% Original &middot; Cash On
          Delivery
        </p>
        <ChevronRight className="ms-auto size-4 flex-none" />
      </SheetTrigger>
      <SheetContent side="bottom" className="z-80" showCloseButton={false}>
        <SheetHeader className="border-b border-border">
          <SheetTitle className="text-center">GoodGoods Guarantee</SheetTitle>
          <SheetDescription className="sr-only">
            Learn about the protections and benefits included with this
            purchase.
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full flex-col gap-4">
          {guarantee.map(({ Icon, description, title }, index, arr) => {
            return (
              <section className="flex items-center gap-4 px-4" key={index}>
                <Icon className="size-7 flex-none text-primary" />
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="text-xs font-normal text-muted-foreground">
                    {description}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="default" className="h-12">
              Ok
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
