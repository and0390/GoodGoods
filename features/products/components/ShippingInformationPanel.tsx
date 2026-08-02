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
import useLg from "@/product-reviews/hooks/useLg";
import { Truck } from "lucide-react";
import ShippingButton from "./ShippingButton";

export default function ShippingInformationPanel() {
  const isLg = useLg();

  return (
    <Sheet key={isLg ? "desktop-close" : "mobile-open"}>
      <SheetTrigger
        className="flex items-center gap-2 px-3 py-3 md:px-0"
        asChild
      >
        <ShippingButton />
      </SheetTrigger>
      <SheetContent side="bottom" className="z-80" showCloseButton={false}>
        <SheetHeader className="border-b border-border">
          <SheetTitle className="text-center">Shipping Information</SheetTitle>
          <SheetDescription className="sr-only">
            Learn about the protections and benefits included with this
            purchase.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <div className="flex gap-2.5 border-b border-border p-4 pt-0">
            <Truck className="size-4 flex-none text-green-600" />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm leading-none font-normal">Regular</h3>
              <p className="text-xs font-normal text-muted-foreground">
                Enjoy 30% off for new buyer
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b border-border p-4">
            <h3 className="text-sm font-normal">Instant</h3>
          </div>
          <div className="flex flex-col p-4 pb-0">
            <h3 className="text-sm font-normal">Cargo</h3>
          </div>
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
