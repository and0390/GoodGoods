"use client";

import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
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
import { useSelectedItemsContext } from "../contexts/SelectedItemsContext";

type CartPageClientProps = {
  leftSection: React.ReactNode;
};

export const CartPageClient = ({ leftSection }: CartPageClientProps) => {
  const { selectedItems } = useSelectedItemsContext();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["cart", "totalPrice", selectedItems],
    queryFn:
      selectedItems.length > 0 // prevent queryFn from running on mount and when nothing is selected
        ? async ({ signal }) => {
            const { body } = apiSchema.parse(
              await fetcher.post("/api/cart/calculate-total", {
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
      {leftSection}
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
