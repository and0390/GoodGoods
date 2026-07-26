"use client";

import formatCount from "@/lib/formatCount";
import formatRating from "../utis/formatRating";
import { ChevronRight, Star } from "lucide-react";
import useProductReviews from "../hooks/useProductReviews";
import { FilterValue } from "../utis/reviewFilter";
import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import ProductReviewCard from "./ProductReviewCard";
import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProductReviewsPreviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <Skeleton className="h-[18px] w-[116px]" />
        </div>
        <Skeleton className="size-[18px]" />
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index, arr) => {
          const isLastIndex = index === arr.length - 1;
          return (
            <Skeleton
              key={index}
              className={cn("h-4", isLastIndex ? "w-[80%]" : "w-full")}
            />
          );
        })}
      </div>

      <div className="ms-auto flex items-center gap-1">
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="size-[18px]" />
      </div>
    </div>
  );
}

type ProductReviewPreview = {
  filter: FilterValue;
  page: number;
  productId: string;
  isAuthenticated: boolean;
  paginatedReview: Promise<PaginatedReview>;
};

function ProductReviewsPreview({
  filter,
  isAuthenticated,
  page,
  paginatedReview,
  productId,
}: ProductReviewPreview) {
  const initialData = React.use(paginatedReview);

  const { data, isSuccess } = useProductReviews({
    filter,
    page,
    productId,
    initialData,
  });

  return (
    <>
      {isSuccess &&
        data.reviews.length > 0 &&
        data.reviews
          .slice(0, 1)
          .map((review) => (
            <ProductReviewCard
              key={review.id}
              filter={filter}
              isAuthenticated={isAuthenticated}
              page={page}
              productId={productId}
              review={review}
            />
          ))}
    </>
  );
}

function ProductReviewsHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-start gap-1 border-b border-border p-3">
      <Skeleton className="h-7 w-[29px]" />
      <Star className="size-[18px] fill-rating text-rating" />
      <Skeleton className="h-5 w-[103px]" />
      <ChevronRight className="ms-auto size-4" />
    </div>
  );
}

type ProductReviewsHeaderProps = {
  reviewSummary: Promise<ReviewSummary>;
};

function ProductReviewsHeader({ reviewSummary }: ProductReviewsHeaderProps) {
  const { avgRating, totalReviews } = React.use(reviewSummary);
  return (
    <button className="flex w-full items-center justify-start gap-1 border-b border-border p-3">
      <h2 className="text-lg font-semibold">{formatRating(avgRating)}</h2>
      <Star className="size-[18px] fill-rating text-rating" />
      <p className="text-sm font-semibold">
        Reviews ({formatCount(totalReviews)})
      </p>
      <ChevronRight className="ms-auto size-4" />
    </button>
  );
}

type ProductReviewsCompact = {
  filter: FilterValue;
  page: number;
  productId: string;
  reviewSummary: Promise<ReviewSummary>;
  isAuthenticated: boolean;
  className?: string;
  paginatedReview: Promise<PaginatedReview>;
};

export default function ProductReviewsCompact({
  filter,
  page,
  paginatedReview,
  productId,
  reviewSummary,
  isAuthenticated,
  className,
}: ProductReviewsCompact) {
  return (
    <section className={cn("flex w-full flex-col bg-card", className)}>
      <Suspense
        name="review summary compact"
        fallback={<ProductReviewsHeaderSkeleton />}
      >
        <ProductReviewsHeader reviewSummary={reviewSummary} />
      </Suspense>
      <Suspense fallback={<ProductReviewsPreviewSkeleton />}>
        <ProductReviewsPreview
          filter={filter}
          isAuthenticated={isAuthenticated}
          page={page}
          paginatedReview={paginatedReview}
          productId={productId}
        />
      </Suspense>
    </section>
  );
}
