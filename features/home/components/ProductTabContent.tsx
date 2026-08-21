"use client";

import { ProductsWithCursor } from "@/app/(shared)/_types/product";
import StateComponent from "@/components/StateComponent";
import { Button } from "@/components/ui/button";
import useIsDesktop from "@/hooks/useDesktop";
import { IconExclamationCircle } from "@tabler/icons-react";
import React from "react";
import useAutoLoadMore from "../hooks/useAutoLoadMore";
import { useHomeFeedQuery } from "../hooks/useHomeFeedQuery";
import ProductTabEmpty from "./ProductTabEmpty";
import ProductTabSkeleton from "./ProductTabSkeleton";
import ProductVirtualGrid from "./ProductVirtualGrid";
import ProductVirtualMasonry from "./ProductVirtualMasonry";

const AUTOSCROLL_BATCH_SIZE = 5;
const LIMIT = 20;

type ProductTabContentProps = {
  isDesktopDevice: boolean;
  productWithCursor: Promise<ProductsWithCursor>;
  isAuthenticated: boolean;
  category: string;
  hasInitialData: boolean;
};

export default function ProductTabContent({
  isDesktopDevice,
  productWithCursor,
  isAuthenticated,
  category,
  hasInitialData,
}: ProductTabContentProps) {
  const initialData = React.use(productWithCursor);

  const isDesktop = useIsDesktop({ defaultValue: isDesktopDevice });

  const {
    data,
    isPending,
    isFetching,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useHomeFeedQuery({
    initialData: hasInitialData
      ? { pages: [initialData], pageParams: [null] }
      : undefined,
    category,
    limit: LIMIT,
  });

  const isFetchingNewTab = isFetching && !isFetchingNextPage;

  const showSkeleton = isPending || isFetchingNewTab;

  const productsMemo = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.products) ?? [];
  }, [data]);

  const { autoScrollEnabled, ref } = useAutoLoadMore({
    batchSize: AUTOSCROLL_BATCH_SIZE,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    pageCount: data?.pages.length ?? LIMIT,
  });

  const gridItems = React.useMemo(() => {
    const items = productsMemo.map((product) => ({
      type: "item" as const,
      id: product.id,
      data: product,
    }));

    if (isFetchingNextPage) {
      const skeletons = Array.from({ length: LIMIT }).map((_, index) => ({
        type: "skeleton" as const,
        id: `skeleton-${items.length}-${index}`,
        data: null,
      }));

      return [...items, ...skeletons];
    }

    return items;
  }, [productsMemo, isFetchingNextPage]);

  return (
    <div className="mb-[calc(65px+env(safe-area-inset-bottom))] flex flex-col lg:mb-0">
      {!showSkeleton ? (
        isSuccess ? (
          productsMemo.length > 0 ? (
            <>
              {isDesktop ? (
                <ProductVirtualGrid
                  isAuthenticated={isAuthenticated}
                  items={gridItems}
                />
              ) : (
                <ProductVirtualMasonry items={gridItems} />
              )}

              {hasNextPage && autoScrollEnabled && (
                <div ref={ref} className="h-8 w-full bg-transparent" />
              )}
              {hasNextPage && !autoScrollEnabled && (
                <div className="flex w-full justify-center py-6">
                  <Button
                    variant="outline"
                    className="h-12 px-6 text-lg"
                    onClick={() => fetchNextPage()}
                  >
                    See more
                  </Button>
                </div>
              )}
            </>
          ) : (
            <ProductTabEmpty />
          )
        ) : (
          <StateComponent
            icon={<IconExclamationCircle />}
            header="Something went wrong while fetching from the server"
            message="Please Try again later!"
            variant="error"
            action={{
              label: "Try again",
              onClick: () => refetch(),
            }}
          />
        )
      ) : (
        <ProductTabSkeleton />
      )}
    </div>
  );
}
