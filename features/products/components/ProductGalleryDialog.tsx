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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageWithSkeleton from "@/features/product-reviews/components/ImageWithSkeleton";
import ThumbnailButton from "@/features/product-reviews/components/ThumbnailButton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function ProductGalleryDialog({
  product,
  current,
  open,
  setOpen,
}: {
  product: ProductDetail;
  current: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.scrollTo(current, true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="w-auto! max-w-none!">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {product.name} product preview
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <Carousel setApi={setApi} className="size-[504px] shrink-0">
            <CarouselContent>
              {product.imageUrls.map((imageUrl, index) => {
                return (
                  <CarouselItem key={index}>
                    <ImageWithSkeleton
                      imageProps={{
                        src: imageUrl,
                        alt: `${product.name} preview ${index + 1}`,
                        className: "object-contain size-[504px]",
                        priority: index === current,
                        width: 504,
                        height: 504,
                      }}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="size-10" />
            <CarouselNext className="size-10" />
          </Carousel>
          <div className="grid h-fit flex-none auto-rows-[76px] grid-cols-[76px_76px_76px_76px] gap-1">
            {product.imageUrls.map((imageUrl, index) => {
              const isActiveIndex = currentIndex === index;
              return (
                <ThumbnailButton
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "cursor-pointer",
                    isActiveIndex ? "border-primary" : "border-border"
                  )}
                  asChild
                >
                  <ImageWithSkeleton
                    imageProps={{
                      src: imageUrl,
                      alt: `${product.name} preview ${index + 1}`,
                      className: "object-fill size-[76px]",
                      width: 76,
                      height: 76,
                    }}
                  />
                </ThumbnailButton>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
