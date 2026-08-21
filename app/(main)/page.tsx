import { Skeleton } from "@/components/ui/skeleton";
import BannerCarouselStreamer from "@/features/home/components/BannerCarouselStreamer";
import FavoriteProductsSection from "@/features/home/components/FavoriteProductsSection";
import HomeCategories from "@/features/home/components/HomeCategories";
import ProductTabsStreaming from "@/features/home/components/ProductTabsStreaming";
import ShoppingGuaranteeModal from "@/features/home/components/ShoppingGuarantees";
import getFavoriteProducts from "@/features/home/services/getFavoriteProducts";
import { Suspense } from "react";

export default function Page() {
  const favoriteProducts = getFavoriteProducts(8);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="w-full overflow-x-hidden bg-card pb-0 md:pb-7 lg:pb-13">
        <section className="container mx-auto mb-3 px-4 pt-3 md:mb-4">
          <Suspense>
            <BannerCarouselStreamer />
          </Suspense>
        </section>
        <section className="mb-3 md:mb-4">
          <ShoppingGuaranteeModal />
        </section>
        <section className="relative container mx-auto mb-2 md:mb-7 md:py-1 lg:mb-13">
          <div
            className="absolute inset-x-0 top-0 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent md:block"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent md:block"
            aria-hidden="true"
          />
          <HomeCategories />
        </section>
        <FavoriteProductsSection products={favoriteProducts} />
      </div>

      <div className="w-full bg-card pt-3 md:pt-0">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 lg:px-8">
              <Skeleton className="h-[800px] w-full rounded-2xl" />
            </div>
          }
        >
          <ProductTabsStreaming />
        </Suspense>
      </div>
    </div>
  );
}
