"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

type ProductCarouselMobileProps = {
  productDetail: ProductDetail;
};

export default function ProductImageCarousel({
  productDetail,
}: ProductCarouselMobileProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const { imageUrls, name } = productDetail;

  return (
    <div className="relative max-h-96 shrink md:basis-sm">
      <Carousel setApi={setApi} className="size-full">
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative aspect-square max-h-96 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${name} preview ${current + 1}`}
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <span className="absolute right-[10px] bottom-[10px] rounded-md border-2 border-border bg-card p-1 text-xs font-normal text-muted-foreground">
        {current + 1}/{count}
      </span>
    </div>
  );
}
