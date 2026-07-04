import { BannerList } from "@/app/(shared)/_types/prisma";
import { CarouselItem } from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";
import { ComponentProps } from "react";

export type CarouselItemListProps = {
  bannerList: BannerList;
} & ComponentProps<typeof CarouselItem>;

export const CarouselItemList = ({
  bannerList,
  ...props
}: CarouselItemListProps) => {
  return bannerList.map((banner) => (
    <CarouselItem key={banner.id} {...props}>
      <CldImage
        src={banner.imageId}
        width={1208}
        height={302}
        alt={banner.title}
        className="h-auto w-full rounded-sm object-cover sm:rounded-md"
      />
    </CarouselItem>
  ));
};
