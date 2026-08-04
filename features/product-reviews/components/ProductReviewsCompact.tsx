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
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import useAutoCloseOnBreakpoint from "@/hooks/useAutoCloseOnBreakpoint";
import formatCount from "@/lib/formatCount";
import { cn } from "@/lib/utils";
import { ChevronRight, Star, X } from "lucide-react";
import React, { Suspense } from "react";
import { PortalContainerProvider } from "../context/PortalContainerContext";
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
import ReviewFilterSingle, { getSelectedFilter } from "./ReviewFilterSingle2";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
// import ReviewFilterSingle from "./ReviewFilterSingle";
import { useInView } from "react-intersection-observer";

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

  const {
    data,
    isPending,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", productId, "reviews", "infinite", filterState],
    queryFn: async ({ pageParam, signal }) => {
      const params = new URLSearchParams();

      params.set("page", pageParam.toString());

      const { body } = apiSchema.parse(
        await fetcher.get(
          `/api/products/${productId}/reviews?${params.toString()}`,
          {
            signal,
          }
        )
      );
      return body as PaginatedReview;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return isPending ? (
    Array.from({ length: 3 }).map((_, index) => {
      return <ProductReviewsPreviewSkeleton key={index} />;
    })
  ) : isSuccess ? (
    <>
      {data.pages
        .flatMap((item) => item.reviews)
        .map((review, index) => {
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
        })}

      {isFetchingNextPage ? (
        <div className="mb-3 w-full text-center text-sm">Loading ....</div>
      ) : hasNextPage ? (
        <div ref={ref} />
      ) : (
        <div className="mb-3 w-full text-center text-sm">
          You&apos;ve reached the end of this review
        </div>
      )}
    </>
  ) : (
    <ProductReviewError refetch={refetch} />
  );
}

type ProductReviewsDrawerContentProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<PaginatedReview>;
  isAuthenticated: boolean;
} & React.ComponentProps<typeof DrawerContent>;

function ProductReviewsDrawerContent({
  reviewSummary,
  isAuthenticated,
  paginatedReview,
  productId,
  className,
  ...props
}: ProductReviewsDrawerContentProps) {
  const [filterState, dispatch] = useReviewFilter();

  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement | null>(null);

  return (
    <DrawerContent
      className={cn(
        "z-100 mt-0! h-dvh max-h-dvh! [&_[data-slot=dropdown-menu-content]]:z-105",
        className
      )}
      {...props}
    >
      <DrawerHeader className="relative">
        <DrawerClose asChild className="absolute top-2 left-2">
          <Button variant="ghost" size="icon-lg" className="size-9">
            <X className="size-full" />
          </Button>
        </DrawerClose>
        <DrawerTitle>Ratings & Reviews</DrawerTitle>
        <DrawerDescription className="sr-only">
          Ratings And Review Drawer
        </DrawerDescription>
      </DrawerHeader>
      <div
        className="flex h-full flex-col overflow-y-auto px-4"
        ref={setPortalContainer}
      >
        <PortalContainerProvider container={portalContainer}>
          <ProductReviewSummary reviewSummary={reviewSummary} />

          <div className="flex flex-col gap-2">
            <ReviewFilterSingle
              className="flex-wrap [&>#all]:hidden [&>#with-images]:hidden [&>#with-reviews]:hidden"
              value={getSelectedFilter(filterState)}
              onValueChange={(value) => {
                if (value === "") {
                  dispatch({
                    type: "SET_RATING",
                    rating: null,
                  });

                  return;
                }

                const rating = (
                  [
                    "5-stars",
                    "4-stars",
                    "3-stars",
                    "2-stars",
                    "1-stars",
                  ] as const
                ).find((rating) => rating === value);

                if (rating) {
                  dispatch({
                    type: "SET_RATING",
                    rating,
                  });
                }
              }}
              size="sm"
              reviewSummary={reviewSummary}
            />
            <ReviewFilterMultiple
              size="sm"
              filterState={filterState}
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
        </PortalContainerProvider>
      </div>
    </DrawerContent>
  );
}

type ProductReviewsDrawerProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<PaginatedReview>;
  isAuthenticated: boolean;
};

function ProductReviewsDrawer({
  reviewSummary,
  isAuthenticated,
  paginatedReview,
  productId,
}: ProductReviewsDrawerProps) {
  const { avgRating, totalReviews } = React.use(reviewSummary);

  const [open, setOpen] = React.useState(false);

  useAutoCloseOnBreakpoint(open, setOpen, "desktop");

  return (
    <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex h-fit w-full items-center justify-start gap-1 border-x-0 border-t-0 border-b border-border bg-card p-3 hover:bg-card">
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

      <ProductReviewsDrawerContent
        key={open ? "a" : "b"}
        isAuthenticated={isAuthenticated}
        paginatedReview={paginatedReview}
        productId={productId}
        reviewSummary={reviewSummary}
      />
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
        <ProductReviewsDrawer
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
