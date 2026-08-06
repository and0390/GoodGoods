import "server-only";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { MainBanner } from "../types/banner";
import BannerCarousel from "./BannerCarousel";

export const getBanners = unstable_cache(
  async () => {
    return prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      select: {
        active: true,
        imageId: true,
        id: true,
        title: true,
        link: true,
      },
    });
  },
  ["main-banners"],
  {
    revalidate: 3600,
    tags: ["main-banners"],
  }
);

export default async function BannerCarouselStreamer() {
  const rawBanners = await getBanners();

  const banners = rawBanners.map(
    ({ id, active, imageId, link, title }): MainBanner => {
      return {
        active,
        description: title,
        id,
        link,
        publicId: imageId,
      };
    }
  );

  return <BannerCarousel banners={banners} />;
}
