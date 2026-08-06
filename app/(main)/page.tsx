import BannerCarouselStreamer from "@/features/home/components/BannerCarouselStreamer";
import ShoppingGuaranteeModal from "@/features/home/components/ShoppingGuarantees";
import { Suspense } from "react";
import { ProductTabs } from "./_components/tabs/ProductTabs";
import { ProductTabSkeleton } from "./_components/tabs/ProductTabSkeleton";
import HomeCategories from "@/features/home/components/HomeCategories";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="w-full bg-card">
        <section className="container mx-auto mb-3 px-4 pt-3 md:mb-4">
          <Suspense>
            <BannerCarouselStreamer />
          </Suspense>
        </section>
        <section className="mb-3 md:mb-4">
          <ShoppingGuaranteeModal />
        </section>
        <section className="relative container mx-auto mb-1 md:py-1">
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
      </div>

      <div className="w-full bg-card">
        <div className="py-4">
          <Suspense fallback={<ProductTabSkeleton />}>
            <ProductTabs />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
