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
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const preloadGalleryDialog = () => import("./ProductGalleryDialog");
const ProductGalleryDialog = dynamic(preloadGalleryDialog, { ssr: false });

type ProductGalleryProps = {
  product: ProductDetail;
} & React.ComponentProps<"div">;

export default function ProductGallery({ product }: ProductGalleryProps) {
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
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrls[currentIndex]}
            fill
            alt={`${product.name} preview ${currentIndex + 1}`}
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
                    onMouseEnter={() => {
                      preloadGalleryDialog();
                      setCurrentIndex(index);
                    }}
                    onFocus={() => {
                      preloadGalleryDialog();
                      setCurrentIndex(index);
                    }}
                    onTouchStart={preloadGalleryDialog}
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
      {dialogOpen && (
        <ProductGalleryDialog
          key={currentIndex}
          product={product}
          current={currentIndex}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      )}
    </>
  );
}
