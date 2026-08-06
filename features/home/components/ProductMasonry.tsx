"use client";

import { ProductCard } from "@/app/(main)/_components/tabs/ProductCard";
// import ProductCard from "@/app/(main)/cart/_components/ProductCard";
import { ProductPreview } from "@/app/(shared)/_types/product";
import { Masonry } from "masonic";

type ProductMasonryProps = {
  products: ProductPreview[];
};

export default function ProductMasonry({ products }: ProductMasonryProps) {
  return (
    <div>
      <Masonry
        items={products}
        columnGutter={16}
        columnWidth={160}
        overscanBy={2}
        render={({ data }) => <ProductCard product={data} />}
      />
    </div>
  );
}
