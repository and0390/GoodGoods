"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ComponentProps, useMemo } from "react";
import { CarouselItemList, CarouselItemListProps } from "./CarouselItemList";

type CarouselBannerClientProps = {
  bannerList: CarouselItemListProps["bannerList"];
} & ComponentProps<typeof Carousel>;

export const CarouselBannerClient = ({
  bannerList,
  ...props
}: CarouselBannerClientProps) => {
  const plugin = useMemo(
    () => Autoplay({ delay: 2000, stopOnInteraction: true }),
    []
  );

  return (
    <Carousel
      plugins={[plugin]}
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => plugin.reset()}
      {...props}
    >
      <CarouselContent>
        <CarouselItemList bannerList={bannerList} />
      </CarouselContent>
      <CarouselPrevious variant="ghost" size="icon-lg" />
      <CarouselNext variant="ghost" size="icon-lg" />
    </Carousel>
  );
};
