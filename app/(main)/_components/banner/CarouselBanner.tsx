import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { CarouselBannerClient } from "./CarouselBannerClient";

export const getBanners = unstable_cache(
  async () => {
    return prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  },
  undefined,
  {
    revalidate: 3600,
    tags: ["banners"],
  }
);

export const CarouselBanner = async () => {
  const banners = await getBanners();
  return <CarouselBannerClient bannerList={banners} />;
};
