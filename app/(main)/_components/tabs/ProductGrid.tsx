import { ProductPreview } from "@/app/(shared)/_types/product";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: ProductPreview[];
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-3 gap-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
