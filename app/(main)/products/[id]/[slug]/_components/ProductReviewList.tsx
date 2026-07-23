"use client";

import { fetcher } from "@/app/(shared)/_lib/api";
import { apiSchema } from "@/app/(shared)/_lib/apiSchema";
import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import maskName from "@/lib/maskName";
import { cn } from "@/lib/utils";
import { IconExclamationCircle, IconPencilSearch } from "@tabler/icons-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Star, ThumbsUp } from "lucide-react";
import React from "react";
import getPaginationItems from "../_lib/getPaginationItems";
import { PaginationReducer } from "../_lib/reviewPaginationReducer";
import ProductReviewListSkeleton from "./ProductReviewListSkeleton";
import ReviewFilters from "./ReviewFilters";
import ThumbsUpButton from "./ThumbsUpButton";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProductReviews from "../_hooks/useProductReviews";

const DEFAULT_PAGE = 1;
const DEFAULT_FILTER = "all";

const RatingStars = ({
  rating,
  className,
  ...props
}: { rating: number } & React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-3 text-rating",
            index < Math.round(rating) && "fill-current"
          )}
        />
      ))}
    </div>
  );
};

type ProductReviewListProps = {
  productId: string;
  paginatedReview: PaginatedReview;
  reviewSummary: ReviewSummary;
  isAuthenticated: boolean;
};

export default function ProductReviewList({
  productId,
  paginatedReview,
  reviewSummary,
  isAuthenticated,
}: ProductReviewListProps) {
  const [{ filter, page }, dispatch] = React.useReducer(PaginationReducer, {
    page: 1,
    filter: "all",
  });

  const { data, refetch, isSuccess, isPlaceholderData } = useProductReviews({
    filter,
    page,
    productId,
    initialData: paginatedReview,
  });

  const { ratingDistribution, totalReviews } = reviewSummary;

  return (
    <>
      <ReviewFilters
        className="mb-4"
        filter={filter}
        dispatch={dispatch}
        ratingDistribution={ratingDistribution}
        totalReviews={totalReviews}
      />

      {isPlaceholderData ? (
        <ProductReviewListSkeleton />
      ) : isSuccess ? (
        /// render only if reviews exist
        data.reviews.length > 0 ? (
          <div className="mb-6 flex w-full flex-col gap-7">
            {data.reviews.map((review) => (
              <div key={review.id} className="flex flex-col items-start gap-3">
                <div className="flex w-full justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar size="lg">
                      <AvatarImage
                        src={review.userAvatar ?? undefined}
                        alt={undefined}
                      />
                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-normal text-card-foreground">
                        {maskName(review.userName)}
                      </p>
                      <RatingStars rating={review.rating} />
                      <span className="text-xs font-normal text-muted-foreground">
                        {new Date(review.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="size-[20px]">
                      <EllipsisVertical className="size-full" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm font-normal text-card-foreground">
                  {review.content}
                </p>

                <ThumbsUpButton
                  filter={filter}
                  isAuthenticated={isAuthenticated}
                  isLikedByUser={review.isLikedByUser}
                  page={page}
                  productId={productId}
                  review={review}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-72 w-full flex-col items-center justify-center gap-3 bg-card">
            <IconPencilSearch className="size-[76px] flex-none text-primary" />
            <h2 className="text-lg font-bold">
              {filter === "all" ? "No Reviews Yet" : "No Reviews Found"}
            </h2>
            <p className="text-base font-semibold text-muted-foreground">
              {filter === "all"
                ? "Be the first buyer to leave a review and help others make their choice!"
                : `There are no ${filter} star reviews for this product yet.`}
            </p>
          </div>
        )
      ) : (
        <div className="mb-6 flex h-72 w-full flex-col items-center justify-center gap-3">
          <IconExclamationCircle className="size-[76px] flex-none text-destructive" />
          <h2 className="text-lg font-bold">
            Something went wrong while fetching reviews
          </h2>
          <Button variant="default" size="lg" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {isSuccess && data.pagination.totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();

                  dispatch({ type: "PREV_PAGE" });
                }}
              />
            </PaginationItem>
            {getPaginationItems(
              data.pagination.currentPage,
              data.pagination.totalPages
            ).map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={data.pagination.currentPage === item}
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch({ type: "SET_PAGE", payload: item });
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();

                  dispatch({
                    type: "NEXT_PAGE",
                    totalPages: data.pagination.totalPages,
                  });
                }}
                aria-disabled={data.pagination.hasNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
