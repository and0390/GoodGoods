"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ImageWithSkeleton from "@/features/product-reviews/components/ImageWithSkeleton";
import useCarouselState from "@/features/product-reviews/hooks/useCarouselState";
import useAutoCloseOnBreakpoint from "@/hooks/useAutoCloseOnBreakpoint";
import React from "react";
import ProductImageDrawer from "./ProductImageDrawer";

type ProductCarouselMobileProps = {
  productDetail: ProductDetail;
};

export default function ProductImageCarousel({
  productDetail,
}: ProductCarouselMobileProps) {
  const { current, setApi, count } = useCarouselState();

  const [drawerOpen, setOpenDrawer] = React.useState(false);

  useAutoCloseOnBreakpoint(drawerOpen, setOpenDrawer, "desktop");

  const { imageUrls, name } = productDetail;

  return (
    <>
      <div className="relative max-h-96 shrink md:basis-sm">
        <Carousel setApi={setApi} className="size-full">
          <CarouselContent>
            {imageUrls.map((imageUrl, index) => {
              return (
                <CarouselItem key={index}>
                  <ButtonPrimitive asChild onClick={() => setOpenDrawer(true)}>
                    <ImageWithSkeleton
                      className="aspect-square size-full max-h-96 w-full overflow-hidden"
                      imageProps={{
                        src: imageUrl,
                        fill: true,
                        sizes: "(max-width: 768px) 100vw, 50vw",
                        alt: `${name} preview ${current + 1}`,
                        className: "object-contain",
                      }}
                    />
                  </ButtonPrimitive>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <span className="absolute right-[10px] bottom-[10px] rounded-md border-2 border-border bg-card p-1 text-sm text-xs leading-none font-normal text-muted-foreground">
          {current + 1}/{count}
        </span>
      </div>

      <ProductImageDrawer
        open={drawerOpen}
        current={current}
        setOpen={setOpenDrawer}
        productDetail={productDetail}
      />
    </>
  );
}
