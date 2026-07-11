"use client";

import { ProductPreview } from "@/app/(shared)/_types/product";
import React from "react";
import ProductCard from "./ProductCard";

type RecommendedProductsSectionProps = {
  productsPromise: Promise<ProductPreview[]>;
};

const RecommendedProductsGrid = ({
  productsPromise,
}: RecommendedProductsSectionProps) => {
  const products = React.use(productsPromise);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default RecommendedProductsGrid;
