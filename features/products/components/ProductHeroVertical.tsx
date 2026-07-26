import { ProductDetail } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import formatCount from "@/lib/formatCount";
import { cn, formatCurrency } from "@/lib/utils";
import { Truck } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import ProductGuaranteeSheet from "./ProductGuaranteeSheet";
import ProductImageCarousel from "./ProductImageCarousel";
import ShippingButton from "./ShippingButton";

type ProductHeroVerticalProps = {
  isAuthenticated: boolean;
  product: ProductDetail;
  className?: string;
};

export default function ProductHeroVertical({
  product,
  className,
  isAuthenticated,
}: ProductHeroVerticalProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-card md:flex-row md:gap-6 md:px-3 md:pt-14 md:pb-3",
        className
      )}
    >
      <ProductImageCarousel productDetail={product} />

      <div className="flex flex-1 flex-col md:p-3">
        <div className="flex flex-col gap-3 p-3 md:p-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-red-700 md:text-3xl">
              {formatCurrency(product.price)}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm font-normal text-muted-foreground">
                {formatCount(product.sold)} Sold
              </p>
              <FavoriteButton
                isAuthenticated={isAuthenticated}
                favoriteCount={product.favoriteCount}
                isFavorited={product.isFavorited}
                productId={product.id}
              />
            </div>
          </div>

          <h1 className="text-base font-semibold md:text-xl">{product.name}</h1>
        </div>

        <Sheet>
          <SheetTrigger
            className="flex items-center gap-2 px-3 py-3 md:px-0"
            asChild
          >
            <ShippingButton />
          </SheetTrigger>
          <SheetContent side="bottom" className="z-80" showCloseButton={false}>
            <SheetHeader className="border-b border-border">
              <SheetTitle className="text-center">
                Shipping Information
              </SheetTitle>
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

        <Separator />

        <ProductGuaranteeSheet />
      </div>
    </div>
  );
}
