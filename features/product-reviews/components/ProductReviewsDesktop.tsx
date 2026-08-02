"use client";
import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Suspense } from "react";
import useReviewFilter from "../hooks/useReviewFilter";
import ProductReviewListSkeleton from "./ProductReviewListSkeleton";
import ProductReviewsContent from "./ProductReviewsContent";
import ProductReviewSummary from "./ProductReviewsSummary";
import ReviewFilters from "./ReviewFilters";

function ProductReviewSummarySkeleton() {
  return (
    <div className="mb-4 flex gap-3 rounded-lg border border-border px-4 py-10">
      <div className="flex basis-[17%] flex-col gap-1 pb-6 md:pb-0">
        <div className="flex gap-1">
          <Star className="size-9 fill-rating text-rating" />
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="mx-auto h-5 w-[85%]" />
      </div>

      <div className="grid basis-[83%] grid-cols-3 grid-rows-3 justify-center gap-x-1">
        {Array.from({ length: 5 }).map((_, index) => {
          return <Skeleton className="h-4 w-full" key={index} />;
        })}
      </div>
    </div>
  );
}

function ReviewFiltersSkeleton() {
  return (
    <div className="mb-4 flex h-9 gap-2">
      {Array.from({ length: 6 }).map((_, index) => {
        const isFirstIndex = index === 0;

        return (
          <Skeleton
            key={index}
            className={cn("h-full", isFirstIndex ? "w-[49px]" : "w-20")}
          />
        );
      })}
    </div>
  );
}

type ProductReviewsDesktop = {
  paginatedReview: Promise<PaginatedReview>;
  productId: string;
  reviewSummary: Promise<ReviewSummary>;
  isAuthenticated: boolean;
  className?: string;
};

export default function ProductReviewsDesktop({
  paginatedReview,
  productId,
  reviewSummary,
  isAuthenticated,
  className,
}: ProductReviewsDesktop) {
  const [filterState, dispatch] = useReviewFilter();

  return (
    <section
      className={cn(
        "w-full scroll-mt-[134px] bg-card p-8 select-none",
        className
      )}
      id="productReviews"
    >
      <h2 className="mb-6 text-lg font-bold text-card-foreground">
        Product Ratings
      </h2>

      <Suspense
        name="review summary and review filters desktop"
        fallback={
          <div className="flex flex-col">
            <ProductReviewSummarySkeleton />
            <ReviewFiltersSkeleton />
          </div>
        }
      >
        <ProductReviewSummary reviewSummary={reviewSummary} />

        <ReviewFilters
          className="mb-4"
          dispatch={dispatch}
          reviewSummary={reviewSummary}
        />
      </Suspense>

      <Suspense fallback={<ProductReviewListSkeleton />}>
        <ProductReviewsContent
          filterState={filterState}
          isAuthenticated={isAuthenticated}
          paginatedReview={paginatedReview}
          paginationDispatch={dispatch}
          productId={productId}
        />
      </Suspense>
    </section>
  );
}
