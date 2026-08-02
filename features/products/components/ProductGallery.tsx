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
import ImageWithSkeleton from "@/features/product-reviews/components/ImageWithSkeleton";
import ThumbnailButton from "@/features/product-reviews/components/ThumbnailButton";
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
        <ImageWithSkeleton
          className="relative aspect-square w-full"
          imageProps={{
            src: product.imageUrls[currentIndex],
            alt: `${product.name} preview ${currentIndex + 1}`,
            className: "aspect-square object-contain",
            width: 456,
            height: 456,
            priority: currentIndex === 0,
          }}
        />

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-1">
            {product.imageUrls.map((imageUrl, index) => {
              const isActiveIndex = currentIndex === index;
              return (
                <CarouselItem
                  key={index}
                  className="basis-1/5 cursor-zoom-in pl-1"
                >
                  <ThumbnailButton
                    type="button"
                    className={cn(
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
                    asChild
                    onTouchStart={preloadGalleryDialog}
                    onClick={() => setDialogOpen(true)}
                    aria-label={`View product photo ${index + 1}`}
                    aria-current={currentIndex === index ? true : false}
                  >
                    <ImageWithSkeleton
                      imageProps={{
                        src: imageUrl,
                        width: 88,
                        height: 88,
                        alt: `${product.name} preview ${index + 1}`,
                        className: "object-cover aspect-square",
                        priority: index === 0,
                      }}
                    />
                  </ThumbnailButton>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            size="icon-lg"
            variant="default"
            className="-translate-x-7 [&>svg]:size-5!"
          />
          <CarouselNext
            size="icon-lg"
            variant="default"
            className="translate-x-7 [&>svg]:size-5!"
          />
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
