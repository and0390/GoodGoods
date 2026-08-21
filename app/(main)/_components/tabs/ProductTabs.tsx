"use client";

import { ProductsWithCursor } from "@/app/(shared)/_types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTabContent from "@/features/home/components/ProductTabContent";
import ProductTabSkeleton from "@/features/home/components/ProductTabSkeleton";
import { categories } from "@/prisma/categorySeed";
import React, { Suspense } from "react";

const TAB_ITEMS = [
  {
    label: `For `,
    value: "for-you",
  },
  {
    label: "Men T-Shirts",
    value: "cat-fashion-men-tshirts",
  },
  {
    label: "Women's Dresses",
    value: "cat-fashion-women-dresses",
  },
  {
    label: "Android",
    value: "cat-mobile-android",
  },
] as const;

type ProductTabsProps = {
  productsForYou: Promise<ProductsWithCursor>;
  session: { name: string } | null;
  isDesktopDevice: boolean;
};

export default function ProductTabs({
  productsForYou,
  isDesktopDevice,
  session,
}: ProductTabsProps) {
  const name = session ? session.name : "You";
  const isAuthenticated = !!session;
  const [category, setCategory] = React.useState("for-you");

  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <Tabs value={category} onValueChange={setCategory}>
      <div className="sticky top-[calc(--spacing(9)+--spacing(7))] z-30 no-scrollbar border-0">
        <TabsList
          ref={contentRef}
          variant="line"
          className="no-scrollbar h-fit! w-full scroll-mt-[calc(--spacing(9)+--spacing(7))] justify-start overflow-x-auto border-b border-border bg-card md:w-full lg:top-[calc(--spacing(10)+--spacing(7)+--spacing(8)+--spacing(9))] lg:scroll-mt-[calc(--spacing(10)+--spacing(7)+--spacing(8)+--spacing(9))] lg:[&_[data-slot=tabs-trigger]]:text-base [&>[data-slot=tabs-trigger]]:h-9 [&>[data-slot=tabs-trigger]]:group-data-horizontal/tabs:after:-bottom-0.5"
        >
          <div className="container mx-auto flex h-full flex-nowrap items-start border-0 px-4 lg:px-8">
            <div className="flex">
              {TAB_ITEMS.map((item) => {
                return (
                  <TabsTrigger
                    className="md:py-3"
                    key={item.value}
                    value={item.value}
                    onClick={handleScroll}
                  >
                    {item.value === "for-you" ? item.label + name : item.label}
                  </TabsTrigger>
                );
              })}
            </div>
          </div>
        </TabsList>
      </div>

      {TAB_ITEMS.map((item) => {
        return (
          <TabsContent
            key={item.value}
            value={item.value}
            className="container mx-auto px-4 lg:px-8"
          >
            <Suspense fallback={<ProductTabSkeleton />}>
              <ProductTabContent
                hasInitialData={item.value === "for-you" ? true : false}
                category={item.value}
                productWithCursor={productsForYou}
                isDesktopDevice={isDesktopDevice}
                isAuthenticated={isAuthenticated}
              />
            </Suspense>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
