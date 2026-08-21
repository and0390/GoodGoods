"use client";

import { ProductPreview } from "@/app/(shared)/_types/product";
import VirtualGrid from "@/components/VirtualGrid";
import ProductCard from "../../products/components/ProductCard";
import {
  ESTIMATED_ROW_HEIGHT,
  GAP,
  MIN_COLUMN_WIDTH,
  OVERSCAN_BY,
} from "../productGridConfig";
import ProductCardActions from "./ProductCardActions";
import { Skeleton } from "@/components/ui/skeleton";

type ProductVirtualGridProps = {
  items: (
    | { type: "item"; id: string; data: ProductPreview }
    | { type: "skeleton"; id: string; data: null }
  )[];
  isAuthenticated: boolean;
};

export default function ProductVirtualGrid({
  items,
  isAuthenticated,
}: ProductVirtualGridProps) {
  return (
    <VirtualGrid
      className="mb-4"
      overscan={OVERSCAN_BY}
      items={items}
      estimatedRowHeight={ESTIMATED_ROW_HEIGHT}
      gap={GAP}
      minColumnWidth={MIN_COLUMN_WIDTH}
      render={({ data }) => {
        if (data.type === "skeleton")
          return (
            <Skeleton
              className="h-full min-h-[280px] w-full rounded-sm"
              key={data.id}
            />
          );

        return (
          <ProductCard
            product={data.data}
            key={data.id}
            action={
              <ProductCardActions
                isAuthenticated={isAuthenticated}
                product={{
                  ...data.data,
                  promotion: null,
                }}
              />
            }
          />
        );
      }}
    />
  );
}
