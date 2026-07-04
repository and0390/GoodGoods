"use client";

import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import { Cart } from "@/app/(shared)/_types/cart";
import { Product } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { skipToken, useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import CartQueryLoader from "./CartQueryLoader";
import { CartItemListSkeleton } from "./CartItemListSkeleton";
import RecommendedProductsGrid from "./RecommendedProductsGrid";
import RecommendedProductsGridSkeleton from "./RecommendedProductsGridSkeleton";

type CartPageClientProps = {
  cartPromise: Promise<Cart>;
  productsPromise: Promise<Product[]>;
};

export const CartPageClient = ({
  cartPromise,
  productsPromise,
}: CartPageClientProps) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["cart", "totalPrice", selectedItems],
    queryFn:
      selectedItems.length > 0 // prevent queryFn from running on mount and when nothing is selected
        ? async ({ signal }) => {
            const { body } = apiSchema.parse(
              await fetcher.post("/api/cart/summary", {
                body: JSON.stringify({ itemIds: selectedItems }),
                signal,
              })
            );

            return body as { totalPrice: number };
          }
        : skipToken,
    staleTime: 0,
    gcTime: Infinity,
    initialData: { totalPrice: 0 },
    select: (data) => data.totalPrice,
  });

  return (
    <div className="mx-auto flex w-full gap-6">
      <div className="flex w-full flex-2 flex-col gap-16">
        <div className="flex flex-col">
          <h1 className="my-4 text-2xl font-semibold">Your Cart</h1>
          <Suspense fallback={<CartItemListSkeleton />} name="cart-provider">
            <CartQueryLoader
              cartPromise={cartPromise}
              handleToggleItem={handleToggleItem}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </Suspense>
        </div>
        <div className="flex w-full flex-col">
          <h1 className="mb-6 text-2xl font-semibold">Recommended for You</h1>
          <Suspense
            fallback={<RecommendedProductsGridSkeleton />}
            name="recommended-product-cart"
          >
            <RecommendedProductsGrid productsPromise={productsPromise} />
          </Suspense>
        </div>
      </div>
      <div className="flex-1 pt-[64px]">
        <Card className="sticky top-32 rounded-2xl">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full justify-between text-muted-foreground">
            <span>Total </span>
            {!isFetching ? (
              <span>{isSuccess ? formatCurrency(data) : "-"}</span>
            ) : (
              <Skeleton className="h-5 w-30" />
            )}
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
