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

  console.log("Index:", currentIndex);

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
                    <div className="relative aspect-square h-full">
                      <Image
                        src={imageUrl}
                        fill
                        alt={`${product.name} preview ${index + 1}`}
                        className="object-contain"
                        priority={index === current}
                        sizes="504px"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="size-10" />
            <CarouselNext className="size-10" />
          </Carousel>
          <div className="grid h-fit flex-none grid-cols-[76px_76px_76px_76px]">
            {product.imageUrls.map((imageUrl, index) => {
              const isActiveIndex = currentIndex === index;
              return (
                <div key={index} className="aspect-square h-full">
                  <button
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "relative size-full overflow-hidden rounded-md border-2 bg-clip-padding transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActiveIndex ? "border-primary" : "border-border"
                    )}
                    key={index}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.name} preview ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="76px"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
