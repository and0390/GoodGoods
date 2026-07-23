"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

type ProductCarouselMobileProps = {
  productDetail: ProductDetail;
};

export default function ProductCarouselMobile({
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

  return (
    <div className="relative aspect-square min-w-0 grow basis-0 md:max-w-[384px] md:grow-0 md:basis-[384px] lg:hidden">
      <Carousel setApi={setApi} className="size-full">
        <CarouselContent>
          {productDetail.imageUrls.map((imageUrl, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${productDetail.name} preview ${current + 1}`}
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
