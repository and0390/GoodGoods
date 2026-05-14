"use client";

import { BannerList } from "@/app/(shared)/_types";
import { CarouselItem } from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import { CldImage } from "next-cloudinary";
import { ComponentProps } from "react";

type CarouselItemListProps = {
  bannerList: BannerList;
} & ComponentProps<typeof CarouselItem>;

export const CarouselItemList = ({
  bannerList,
  ...props
}: CarouselItemListProps) => {
  return bannerList.map((banner) => (
    <CarouselItem
      key={banner.id}
      className="overflow-hidden rounded-lg"
      {...props}
    >
      <CldImage
        sizes=""
        src={banner.imageId}
        width={1208}
        height={302}
        alt={banner.title}
        className="w-full rounded-md object-cover"
      />
    </CarouselItem>
  ));
};
