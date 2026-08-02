"use client";

import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import React from "react";
import useProductReviews from "../hooks/useProductReviews";
import {
  ReviewPaginationAction,
  ReviewPaginationState,
} from "../utis/reviewPaginationReducer";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewEmpty from "./ProductReviewEmpty";
import ProductReviewError from "./ProductReviewError";
import ProductReviewListSkeleton from "./ProductReviewListSkeleton";
import ProductReviewPagination from "./ProductReviewPagination";

type ProductReviewsContentProps = {
  filterState: ReviewPaginationState;
  paginatedReview: Promise<PaginatedReview>;
  productId: string;
  isAuthenticated: boolean;
  paginationDispatch: React.ActionDispatch<[action: ReviewPaginationAction]>;
};

export default function ProductReviewsContent({
  paginatedReview,
  productId,
  filterState,
  isAuthenticated,
  paginationDispatch,
}: ProductReviewsContentProps) {
  const initialData = React.use(paginatedReview);

  const { data, refetch, isSuccess, isPlaceholderData } = useProductReviews({
    filterState,
    productId,
    initialData,
  });

  return (
    <>
      {isPlaceholderData ? (
        <ProductReviewListSkeleton />
      ) : isSuccess ? (
        /// render only if data has reviews
        data.reviews.length > 0 ? (
          <div className="mb-6 flex w-full flex-col gap-7">
            {data.reviews.map((review) => (
              <ProductReviewCard
                key={review.id}
                filterState={filterState}
                isAuthenticated={isAuthenticated}
                productId={productId}
                review={review}
              />
            ))}
          </div>
        ) : (
          <ProductReviewEmpty filterState={filterState} />
        )
      ) : (
        <ProductReviewError refetch={refetch} />
      )}

      {isSuccess && data.pagination.totalPages > 0 && (
        <ProductReviewPagination
          pagination={data.pagination}
          paginationDispatch={paginationDispatch}
        />
      )}
    </>
  );
}
