import { ProductCard, ProductCardProps } from "./ProductCard";

export const ProductGrid = ({ products }: { products: ProductCardProps[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-3 gap-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
