"use client";

import { FavoriteProducts } from "@/app/(shared)/_types/product";
import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageWithSkeleton2 } from "@/features/product-reviews/components/ImageWithSkeleton";
import { IconTagFilled } from "@tabler/icons-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Link from "next/link";
import React, { Suspense } from "react";

function FavoriteProductItemsSkeleton() {
  return Array.from({ length: 8 }).map((_, index) => {
    return (
      <CarouselItem
        key={index}
        className="ml-4 basis-[88px] pl-0 first:ml-0! md:basis-[160px]"
      >
        <Skeleton className="mb-[14px] aspect-square w-full rounded-sm md:rounded" />
      </CarouselItem>
    );
  });
}

function FavoriteProductItems({
  products: initialProducts,
}: {
  products: Promise<FavoriteProducts[]>;
}) {
  const products = React.use(initialProducts);

  return products.map((product) => {
    return (
      <CarouselItem
        key={product.id}
        className="ml-4 basis-[88px] pl-0 first:ml-0 md:basis-[160px]"
      >
        <div className="flex flex-col">
          <ButtonPrimitive2 asChild>
            <Link
              href={`/products/${product.id}/${product.slug}`}
              className="flex size-full flex-col items-start text-center [&>div:first-child]:aspect-square [&>div:first-child]:w-full [&>div:first-child]:overflow-hidden [&>div:first-child]:rounded-sm md:[&>div:first-child]:rounded"
              key={product.id}
            >
              <ImageWithSkeleton2
                fill
                src={product.imageUrl}
                sizes="(max-width: 767px) 88px, 160px"
                alt={`${product.name} preview`}
                className="object-cover"
              />
              {product.discountPercent && (
                <div className="mt-1 flex items-center gap-0.5 md:mt-2 md:items-start md:gap-1">
                  <IconTagFilled className="size-4 text-destructive md:size-[18px]" />
                  <span className="h-fit! text-[11px] leading-none font-normal font-semibold text-nowrap text-destructive md:text-sm">
                    Up to {product.discountPercent}%
                  </span>
                </div>
              )}
              {product.categoryName && (
                <p className="mt-0 text-[10px] text-black! text-foreground md:mt-1 md:text-xs">
                  {product.categoryName}
                </p>
              )}
            </Link>
          </ButtonPrimitive2>
        </div>
      </CarouselItem>
    );
  });
}

type FavoriteProductsSectionProps = {
  products: Promise<FavoriteProducts[]>;
};

export default function FavoriteProductsSection({
  products,
}: FavoriteProductsSectionProps) {
  return (
    <section className="relative container mx-auto">
      <div className="flex w-full items-center bg-[#E8F4FF] p-4 md:flex-col md:items-start md:gap-[18px] md:rounded-2xl">
        <h3 className="w-min text-start text-base font-semibold text-black! text-foreground md:w-auto md:text-2xl">
          Favorite Products
        </h3>
        <Carousel
          className="static ml-4 w-full md:ml-0"
          plugins={[WheelGesturesPlugin()]}
        >
          <CarouselContent className="ml-0">
            <Suspense fallback={<FavoriteProductItemsSkeleton />}>
              <FavoriteProductItems products={products} />
            </Suspense>
          </CarouselContent>
          <CarouselPrevious
            className="hidden size-12 disabled:hidden lg:flex [&>svg]:size-6!"
            variant="default"
          />
          <CarouselNext
            className="hidden size-12 disabled:hidden lg:flex [&>svg]:size-6!"
            variant="default"
          />
        </Carousel>
      </div>
    </section>
  );
}
