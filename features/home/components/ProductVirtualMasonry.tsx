"use client";

import { ProductPreview } from "@/app/(shared)/_types/product";
import { Masonry } from "masonic";
import ProductCard from "../../products/components/ProductCard";
import { GAP, MIN_COLUMN_WIDTH, OVERSCAN_BY } from "../productGridConfig";
import React from "react";
import ProductCardActions from "./ProductCardActions";
import { Skeleton } from "@/components/ui/skeleton";

type ProductMasonryProps = {
  items: (
    | { type: "item"; id: string; data: ProductPreview }
    | { type: "skeleton"; id: string; data: null }
  )[];
};

export default function ProductVirtualMasonry({ items }: ProductMasonryProps) {
  const [isVirtualized, setIsVirtualized] = React.useState(false);

  React.useEffect(() => setIsVirtualized(true), []);

  // SSR/hydration fallback: render a non-virtualized masonry first so the
  // server response contains real product HTML (the first N items), not just
  // a skeleton. After React hydrates on the client, switch to Masonic's
  // virtualized masonry. This prevents the page from depending on Masonic's
  // initial layout/measurement pass before showing actual content, while
  // keeping the server-rendered content SEO-friendly.
  if (!isVirtualized) {
    return (
      <div
        style={{
          gap: `${GAP}px`,
          columnWidth: `${MIN_COLUMN_WIDTH}px`,
        }}
      >
        {items.map((item) => {
          if (item.type === "skeleton") return null; // initialData won't have skeleton
          return (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <ProductCard product={item.data} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Masonry
      items={items}
      columnGutter={GAP}
      columnWidth={MIN_COLUMN_WIDTH}
      overscanBy={OVERSCAN_BY}
      render={({ data }) => {
        if (data.type === "skeleton")
          return (
            <Skeleton className="h-[280px] w-full rounded-sm" key={data.id} />
          );
        return <ProductCard product={data.data} />;
      }}
    />
  );
}
