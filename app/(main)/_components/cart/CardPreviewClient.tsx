"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { CartPreviewItem } from "./CartPreviewItem";
import { CartWithItems } from "@/app/(shared)/_types";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ButtonWithLoader } from "@/components/ui/ButtonWithLoader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type CardPreviewProps = {
  cartWithItems: CartWithItems["items"];
} & Omit<ComponentProps<"div">, "children">;

export const CartPreviewClient = ({
  cartWithItems,
  className,
  ...props
}: CardPreviewProps) => {
  const { data, isError, error, isFetching, refetch } = useQuery({
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

  if (data?.length === 0) {
    return <CartPreviewEmpty />;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <ScrollArea>
        <div className="flex max-h-56 w-full flex-col gap-4">
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
        <ScrollBar />
      </ScrollArea>
      <Button variant="default" size="lg" asChild>
        <Link href="/cart">See more</Link>
      </Button>
    </div>
  );
};
