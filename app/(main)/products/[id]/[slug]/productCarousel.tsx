"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { products } from "@/prisma/productSeed";
import ProductCarouselMobile from "./_components/ProductCarouselMobile";

type ProductCarouselProps = {
  product: ProductDetail;
} & React.ComponentProps<"div">;

function ProductPreviewDialog({
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

export default function ProductCarousel({ product }: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <div className="flex w-[456px] flex-none flex-col gap-4">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrls[currentIndex]}
            fill
            alt={`${name} preview ${currentIndex + 1}`}
            className="size-full object-contain"
            sizes="456px"
            priority={currentIndex === 0}
          />
        </div>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-1">
            {product.imageUrls.map((imageUrl, index) => {
              const isActiveIndex = currentIndex === index;
              return (
                <CarouselItem key={index} className="basis-1/5 pl-1">
                  <button
                    type="button"
                    className={cn(
                      "relative aspect-square w-full overflow-hidden rounded-md border-2 bg-clip-padding transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActiveIndex ? "border-primary" : "border-border"
                    )}
                    onMouseEnter={() => setCurrentIndex(index)}
                    onFocus={() => setCurrentIndex(index)}
                    onClick={() => setDialogOpen(true)}
                    aria-label={`View product photo ${index + 1}`}
                    aria-current={currentIndex === index ? true : false}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.name} preview ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      sizes="88px"
                    />
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <ProductPreviewDialog
        key={currentIndex}
        product={product}
        current={currentIndex}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  );
}
