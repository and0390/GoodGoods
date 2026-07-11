"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type ProductCarouselProps = {
  product: ProductDetail;
} & React.ComponentProps<"div">;

export default function ProductCarousel({
  product,
  className,
  ...props
}: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { imageUrls, name } = product;

  React.useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="no-scrollbar flex w-full gap-3 overflow-x-auto pb-1">
        {imageUrls.map((url, index) => {
          const isActive = current === index;

          return (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative size-30 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                isActive
                  ? "border-primary opacity-100 ring-2 ring-primary/20"
                  : "border-transparent opacity-50 hover:border-primary hover:opacity-100"
              )}
              aria-label={`Lihat gambar ke-${index + 1}`}
            >
              <Image
                src={url}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="120px"
                className="object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
