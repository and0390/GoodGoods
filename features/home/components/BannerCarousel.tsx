"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MainBanner } from "../types/banner";
import { CldImage } from "next-cloudinary";
import useCarouselState from "@/features/product-reviews/hooks/useCarouselState";
import Autoplay from "embla-carousel-autoplay";
import ButtonPrimitive from "@/components/ui/ButtonPrimitive";
import { cn } from "@/lib/utils";
type BannerCarouselProps = {
  banners: MainBanner[];
};

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const { api, setApi, count, current } = useCarouselState();

  return (
    <div className="group relative overflow-y-hidden">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map(({ id, publicId, description }, index) => {
            return (
              <CarouselItem key={id}>
                <div className="relative aspect-[3] overflow-hidden md:aspect-[4]">
                  <CldImage
                    fill
                    src={publicId}
                    alt={description}
                    sizes="100vw"
                    crop="fill"
                    gravity="auto"
                    format="auto"
                    quality="auto"
                    priority={index === 0}
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext
          variant="default"
          className="top-[110%] hidden size-12 opacity-0 transition-all duration-250 ease-out group-hover:top-1/2 group-hover:opacity-100 lg:flex [&>svg]:size-6!"
        />
        <CarouselPrevious
          variant="default"
          className="top-[110%] hidden size-12 opacity-0 transition-all duration-250 group-hover:top-1/2 group-hover:opacity-100 lg:flex [&>svg]:size-6!"
        />
      </Carousel>
      <div className="dark absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-muted/60 p-0.5 ease-out lg:right-1/2 lg:translate-x-1/2">
        {Array.from({ length: count }).map((_, index) => {
          return (
            <ButtonPrimitive
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-2.5 rounded-full",
                current === index
                  ? "w-6 bg-card-foreground hover:bg-card-foreground"
                  : "bg-card-foreground/50 hover:bg-card-foreground/70"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
