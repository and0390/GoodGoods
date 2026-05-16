"use client";

import { CartWithItems } from "@/app/(shared)/_types";
import { Button } from "@/components/ui/button";
import { ButtonWithLoader } from "@/components/ui/ButtonWithLoader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { CartPreviewItem } from "./CartPreviewItem";
import { Separator } from "@/components/ui/separator";
import { CartPreviewSkeleton } from "./CardSkeleton";

type CardPreviewProps = {
  cartWithItems: CartWithItems["items"];
};

export const CartPreviewClient = ({ cartWithItems }: CardPreviewProps) => {
  const { data, isError, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const json = await res.json();
      return json.body as CartWithItems["items"];
    },
    staleTime: 1000 * 60 * 5,
    initialData: cartWithItems,
  });

  if (isError) {
    console.error("Unexpected error:", error);
    return (
      <div className="flex h-56 w-full flex-col items-center justify-center gap-3">
        <p>Something went wrong</p>
        <ButtonWithLoader
          isLoading={isFetching}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          retry
        </ButtonWithLoader>
      </div>
    );
  }

  if (isPending) {
    return <CartPreviewSkeleton />;
  }

  if (data?.length === 0) {
    return <CartPreviewEmpty />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 items-center justify-between p-3">
        <h1 className="text-lg font-semibold">
          Items{" "}
          <span className="text-muted-foreground">
            ({cartWithItems.length})
          </span>
        </h1>
        <Button variant="link" size="lg" asChild className="px-0">
          <Link href="/cart">See more</Link>
        </Button>
      </div>
      <Separator />
      <ScrollArea classNameViewport="max-h-64" classNameScrollbar="me-0.5">
        <div className="flex w-full flex-col gap-4 p-3 pe-4">
          {data?.map(({ product, quantity }) => (
            <CartPreviewItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={quantity}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
