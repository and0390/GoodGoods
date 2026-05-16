import { ProductCard, ProductCardProps } from "./ProductCard";

export const ProductGrid = ({ products }: { products: ProductCardProps[] }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
