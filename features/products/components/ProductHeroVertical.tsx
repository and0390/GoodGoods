import { ProductDetail } from "@/app/(shared)/_types/product";
import { Separator } from "@/components/ui/separator";
import formatCount from "@/lib/formatCount";
import { cn, formatCurrency } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import ProductGuaranteeSheet from "./ProductGuaranteeSheet";
import ProductImageCarousel from "./ProductImageCarousel";
import ShippingInformationPanel from "./ShippingInformationPanel";

type ProductHeroVerticalProps = {
  isAuthenticated: boolean;
  product: ProductDetail;
  className?: string;
};

export default function ProductHeroVertical({
  product,
  className,
  isAuthenticated,
}: ProductHeroVerticalProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-card md:flex-row md:gap-6 md:px-3 md:pt-14 md:pb-3",
        className
      )}
    >
      <ProductImageCarousel productDetail={product} />

      <div className="flex flex-1 flex-col md:p-3">
        <div className="flex flex-col gap-3 p-3 md:p-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-red-700 md:text-3xl">
              {formatCurrency(product.price)}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm font-normal text-muted-foreground">
                {formatCount(product.sold)} Sold
              </p>
              <FavoriteButton
                isAuthenticated={isAuthenticated}
                favoriteCount={product.favoriteCount}
                isFavorited={product.isFavorited}
                productId={product.id}
              />
            </div>
          </div>

          <h1 className="text-base font-semibold md:text-xl">{product.name}</h1>
        </div>

        <ShippingInformationPanel />

        <Separator />

        <ProductGuaranteeSheet />
      </div>
    </div>
  );
}
