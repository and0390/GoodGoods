import "server-only";
import { ProductDetail } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatCount from "@/lib/formatCount";
import { cn, formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";
import formatRating from "../../product-reviews/utis/formatRating";
import ProductGallery from "./ProductGallery";
import FavoriteButton from "./FavoriteButton";
import ProductPurchaseSection from "./ProductPurchaseSection";
import getProductReviewSummaryCached from "../../product-reviews/services/getReviewSummaryCached";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFacebook, FaInstagram } from "react-icons/fa";

async function ProductReviewSummary({
  productId,
  totalSold,
}: {
  productId: string;
  totalSold: number;
}) {
  const { avgRating, totalReviews } =
    await getProductReviewSummaryCached(productId);

  return (
    <div className="flex items-center gap-1.5 text-sm font-normal">
      <p className="text-card-foreground">
        Sold <span className="text-muted-foreground">{totalSold}</span>
      </p>
      <Separator orientation="vertical" />
      <div className="flex items-center justify-start gap-1">
        <Star className="size-4 fill-rating text-rating" />
        <a href="#productReviews" className="underline underline-offset-4">
          {formatRating(avgRating)}{" "}
          <span className="text-muted-foreground">
            ({formatCount(totalReviews)} reviews)
          </span>
        </a>
      </div>
    </div>
  );
}

type ProductHeroHorizontal = {
  product: ProductDetail;
  isAuthenticated: boolean;
  className?: string;
};

export default function ProductHeroHorizontal({
  product,
  isAuthenticated,
  className,
}: ProductHeroHorizontal) {
  return (
    <div
      className={cn(
        "flex flex-row gap-6 bg-card px-3 pt-14 md:pb-3 lg:pt-3",
        className
      )}
    >
      <div className="hidden basis-[480px] flex-col gap-5 p-3 lg:flex">
        <ProductGallery product={product} />

        <div className="flex w-full items-center justify-around gap-2">
          <div className="flex items-center gap-1">
            <span className="text-base font-normal">Share:</span>
            <FaInstagram className="size-7" />
            <FaFacebook className="size-7" />
          </div>
          <Separator orientation="vertical" />
          <FavoriteButton
            isFavorited={product.isFavorited}
            isAuthenticated={isAuthenticated}
            productId={product.id}
            favoriteCount={product.favoriteCount}
          />
        </div>
      </div>

      <div className="flex min-w-0 grow flex-col gap-1 px-3 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <Button variant="ghost">Report</Button>
        </div>

        <Suspense
          fallback={
            <div className="flex h-5 gap-3">
              <Skeleton className="h-full w-[66px]" />
              <Skeleton className="h-full w-[150px]" />
            </div>
          }
        >
          <ProductReviewSummary
            productId={product.id}
            totalSold={product.sold}
          />
        </Suspense>

        <p className="my-6 text-3xl font-semibold text-red-700">
          {formatCurrency(product.price)}
        </p>

        <ProductPurchaseSection
          isAuthenticated={isAuthenticated}
          product={product}
        />
      </div>
    </div>
  );
}
