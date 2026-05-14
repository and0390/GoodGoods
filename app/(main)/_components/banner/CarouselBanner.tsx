import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import { CarouselItemList } from "./CarouselItemList";
import { ComponentProps } from "react";

export const CarouselBanner = async (
  props: ComponentProps<typeof Carousel>
) => {
  const banners = await prisma.banner.findMany({
    where: {
      active: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <Carousel {...props}>
      <CarouselContent>
        <CarouselItemList bannerList={banners} />
      </CarouselContent>
      <CarouselPrevious variant="ghost" size="icon-lg" />
      <CarouselNext variant="ghost" size="icon-lg" />
    </Carousel>
  );
};
