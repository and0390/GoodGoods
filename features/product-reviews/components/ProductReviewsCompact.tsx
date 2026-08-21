"use client";

import {
  ReviewsWithPagination,
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
import { ChevronRight, LoaderCircle, Star, X } from "lucide-react";
import React, { Suspense } from "react";
import {
  PortalContainerProvider,
  usePortalContainer,
} from "../context/PortalContainerContext";
import useProductReviews from "../hooks/useProductReviews";
import useReviewFilter from "../hooks/useReviewFilter";
import formatRating from "../utils/formatRating";
import { DEFAULT_STATE, ReviewState } from "../utils/reviewReducer";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewEmpty from "./ProductReviewEmpty";
import ProductReviewError from "./ProductReviewError";
import ProductReviewsPreviewSkeleton from "./ProductReviewPreviewSkeleton";
import ProductReviewSummary from "./ProductReviewsSummary";
import ReviewFilterMultiple from "./ReviewFilterMutiple";
import ReviewFilterSingle, { getSelectedFilter } from "./ReviewFilterSingle";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
// import ReviewFilterSingle from "./ReviewFilterSingle";
import { useInView } from "react-intersection-observer";
import { getRatingFromFilter } from "../utils/reviewFilter";
import shouldUseInitialData from "../utils/shouldHaveInitialData";
import buildReviewParams from "../utils/buildReviewParams";
import { reviewKeys } from "../utils/reviewKeys";

type ProductReviewPreview = {
  productId: string;
  isAuthenticated: boolean;
  paginatedReview: Promise<ReviewsWithPagination>;
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
  productId: string;
  filterState: ReviewState;
  isAuthenticated: boolean;
};

function ProductReviewCardList({
  filterState,
  isAuthenticated,
  productId,
}: ProductReviewCardListProps) {
  const { page, ...rest } = filterState;

  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: reviewKeys.infinite(productId, rest),
    queryFn: async ({ pageParam, signal }) => {
      const params = buildReviewParams({ ...rest, page: pageParam });

      const { body } = apiSchema.parse(
        await fetcher.get(
          `/api/products/${productId}/reviews?${params.toString()}`,
          {
            signal,
          }
        )
      );
      return body as ReviewsWithPagination;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    initialData: shouldUseInitialData(rest)
      ? () => {
          const cached = queryClient.getQueryData<ReviewsWithPagination>(
            reviewKeys.list(productId, { ...rest, page })
          );

          if (!cached) return undefined;

          return {
            pages: [cached],
            pageParams: [1],
          };
        }
      : undefined,
  });

  const { ref, inView } = useInView({});

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reviews = data?.pages.flatMap((item) => item.reviews) ?? [];

  return isPending ? (
    Array.from({ length: 3 }).map((_, index) => {
      return <ProductReviewsPreviewSkeleton key={index} />;
    })
  ) : isSuccess ? (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, index) => {
          const isLastIndex = index === reviews.length - 1;
          return (
            <ProductReviewCard
              className={cn("px-0", isLastIndex && "pb-0")}
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
      )}
      <div className="flex w-full items-center justify-center py-2" ref={ref}>
        {isFetchingNextPage && (
          <LoaderCircle className="size-8 animate-spin text-primary" />
        )}
      </div>
    </>
  ) : (
    <ProductReviewError refetch={refetch} />
  );
}

type ProductReviewsDrawerContentProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<ReviewsWithPagination>;
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
          />
        </PortalContainerProvider>
      </div>
    </DrawerContent>
  );
}

type ProductReviewsDrawerProps = {
  reviewSummary: Promise<ReviewSummary>;
  productId: string;
  paginatedReview: Promise<ReviewsWithPagination>;
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
        key={open ? "a" : "b"} //umount when closed
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
  paginatedReview: Promise<ReviewsWithPagination>;
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
