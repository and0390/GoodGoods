"use client";

import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import formatCount from "@/lib/formatCount";
import { cn } from "@/lib/utils";
import { ChevronRight, Star, X } from "lucide-react";
import React, { Suspense } from "react";
import useProductReviews from "../hooks/useProductReviews";
import useReviewFilter from "../hooks/useReviewFilter";
import formatRating from "../utis/formatRating";
import {
  DEFAULT_STATE,
  ReviewPaginationState,
} from "../utis/reviewPaginationReducer";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewEmpty from "./ProductReviewEmpty";
import ProductReviewError from "./ProductReviewError";
import ProductReviewsPreviewSkeleton from "./ProductReviewPreviewSkeleton";
import ProductReviewSummary from "./ProductReviewsSummary";
import ReviewFilterMultiple from "./ReviewFilterMutiple";
import ReviewFilters from "./ReviewFilters";

type ProductReviewPreview = {
  productId: string;
  isAuthenticated: boolean;
  paginatedReview: Promise<PaginatedReview>;
};

function ProductReviewsPreview({
  isAuthenticated,
  paginatedReview,
  productId,
}: ProductReviewPreview) {
  const filterState = { ...DEFAULT_STATE };
  const initialData = React.use(paginatedReview);

  const { data, isSuccess } = useProductReviews({
    filterState,
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
              filterState={filterState}
              isAuthenticated={isAuthenticated}
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

type ProductReviewCardListProps = {
  paginatedReview: Promise<PaginatedReview>;
  productId: string;
  filterState: ReviewPaginationState;
  isAuthenticated: boolean;
};

function ProductReviewCardList({
  filterState,
  isAuthenticated,
  productId,
  paginatedReview,
}: ProductReviewCardListProps) {
  const initialData = React.use(paginatedReview);

  const { data, isSuccess, isPlaceholderData, refetch } = useProductReviews({
    filterState,
    initialData,
    productId,
  });

  return isPlaceholderData ? (
    Array.from({ length: 3 }).map((_, index) => {
      return <ProductReviewsPreviewSkeleton key={index} />;
    })
  ) : isSuccess ? (
    data.reviews.length > 0 ? (
      data.reviews.map((review, index) => {
        return (
          <ProductReviewCard
            className="px-0"
            key={index}
            filterState={filterState}
            isAuthenticated={isAuthenticated}
            productId={productId}
            review={review}
          />
        );
      })
    ) : (
      <ProductReviewEmpty filterState={filterState} />
    )
  ) : (
    <ProductReviewError refetch={refetch} />
  );
}

type ProductReviewsDrawerContentProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<PaginatedReview>;
  isAuthenticated: boolean;
};

function ProductReviewsDrawerContent({
  reviewSummary,
  isAuthenticated,
  paginatedReview,
  productId,
}: ProductReviewsDrawerContentProps) {
  const [filterState, dispatch] = useReviewFilter();

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4">
      <ProductReviewSummary reviewSummary={reviewSummary} />

      <div className="flex flex-col gap-2">
        <ReviewFilters
          className="flex-wrap [&>#with-images]:hidden"
          dispatch={dispatch}
          showAll={false}
          size="sm"
          reviewSummary={reviewSummary}
        />
        <ReviewFilterMultiple
          size="sm"
          dispatch={dispatch}
          reviewSummary={reviewSummary}
        />
      </div>

      <ProductReviewCardList
        filterState={filterState}
        isAuthenticated={isAuthenticated}
        productId={productId}
        paginatedReview={paginatedReview}
      />
    </div>
  );
}

type ProductReviewsHeaderProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<PaginatedReview>;
  isAuthenticated: boolean;
};

function ProductReviewsHeader({
  reviewSummary,
  isAuthenticated,
  paginatedReview,
  productId,
}: ProductReviewsHeaderProps) {
  const { avgRating, totalReviews } = React.use(reviewSummary);

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button className="flex h-fit w-full items-center justify-start gap-1 rounded-none border-x-0 border-t-0 border-b border-border bg-card p-3 hover:bg-card">
          <h2 className="text-lg font-semibold text-card-foreground">
            {formatRating(avgRating)}
          </h2>
          <Star className="size-[18px] fill-rating text-rating" />
          <p className="text-sm font-semibold text-card-foreground">
            Reviews ({formatCount(totalReviews)})
          </p>
          <ChevronRight className="ms-auto size-4 text-card-foreground" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="z-100 mt-0! h-dvh max-h-dvh!">
        <DrawerHeader>
          <DrawerClose asChild className="absolute top-2 left-2">
            <Button variant="ghost" size="icon-lg" className="size-9">
              <X className="size-full" />
            </Button>
          </DrawerClose>
          <DrawerTitle>Review Detail</DrawerTitle>
        </DrawerHeader>
        <ProductReviewsDrawerContent
          isAuthenticated={isAuthenticated}
          paginatedReview={paginatedReview}
          productId={productId}
          reviewSummary={reviewSummary}
        />
      </DrawerContent>
    </Drawer>
  );
}

type ProductReviewsCompact = {
  productId: string;
  reviewSummary: Promise<ReviewSummary>;
  isAuthenticated: boolean;
  className?: string;
  paginatedReview: Promise<PaginatedReview>;
};

export default function ProductReviewsCompact({
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
        <ProductReviewsHeader
          reviewSummary={reviewSummary}
          isAuthenticated={isAuthenticated}
          productId={productId}
          paginatedReview={paginatedReview}
        />
      </Suspense>
      <Suspense fallback={<ProductReviewsPreviewSkeleton />}>
        <ProductReviewsPreview
          isAuthenticated={isAuthenticated}
          paginatedReview={paginatedReview}
          productId={productId}
        />
      </Suspense>
    </section>
  );
}
