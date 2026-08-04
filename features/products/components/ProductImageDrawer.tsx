"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconArrowLeft, IconShare } from "@tabler/icons-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductDetail } from "@/app/(shared)/_types/product";
import ImageWithSkeleton from "@/features/product-reviews/components/ImageWithSkeleton";
import useCarouselState from "@/features/product-reviews/hooks/useCarouselState";

type ProductImageDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  productDetail: ProductDetail;
  current: number;
};

export default function ProductImageDrawer({
  open,
  setOpen,
  productDetail,
  current: skipTo,
}: ProductImageDrawerProps) {
  const { imageUrls, name } = productDetail;

  const { setApi, current, count } = useCarouselState({
    skipTo,
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="dark z-100 mt-0! h-dvh! max-h-dvh!">
        <DrawerHeader>
          <DrawerClose className="absolute top-2 left-2">
            <Button variant="ghost" className="size-9 p-0!">
              <IconArrowLeft className="size-full" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="sr-only">Product Image Drawer</DrawerTitle>
          <DrawerDescription className="sr-only">{`${name} Image ${current + 1}`}</DrawerDescription>
          <Button
            variant="ghost"
            className="absolute top-2 right-2 size-9 p-0!"
          >
            <IconShare className="size-full" />
          </Button>
        </DrawerHeader>
        <div className="relative flex size-full items-center">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {imageUrls.map((imageUrl, index) => {
                return (
                  <CarouselItem key={index}>
                    <ImageWithSkeleton
                      className="aspect-square size-full max-h-96 w-full overflow-hidden"
                      imageProps={{
                        src: imageUrl,
                        fill: true,
                        sizes: "(max-width: 768px) 100vw, 50vw",
                        alt: `${name} preview ${index + 1}`,
                        className: "object-contain",
                      }}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-sm border border-border p-1 text-sm leading-none font-normal text-popover-foreground">
            {current + 1}/{count}
          </span>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
