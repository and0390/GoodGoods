"use client";

import React from "react";
import { FilterValue } from "../utis/reviewFilter";
import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import { PaginationAction } from "../utis/reviewPaginationReducer";
import useProductReviews from "../hooks/useProductReviews";
import ProductReviewListSkeleton from "./ProductReviewListSkeleton";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewEmpty from "./ProductReviewEmpty";
import ProductReviewError from "./ProductReviewError";
import ProductReviewPagination from "./ProductReviewPagination";

type ProductReviewsContentProps = {
  filter: FilterValue;
  page: number;
  paginatedReview: Promise<PaginatedReview>;
  productId: string;
  isAuthenticated: boolean;
  paginationDispatch: React.ActionDispatch<[action: PaginationAction]>;
};

export default function ProductReviewsContent({
  paginatedReview,
  productId,
  filter,
  page,
  isAuthenticated,
  paginationDispatch,
}: ProductReviewsContentProps) {
  const initialData = React.use(paginatedReview);

  const { data, refetch, isSuccess, isPlaceholderData } = useProductReviews({
    filter,
    page,
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
                filter={filter}
                isAuthenticated={isAuthenticated}
                page={page}
                productId={productId}
                review={review}
              />
            ))}
          </div>
        ) : (
          <ProductReviewEmpty filter={filter} />
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
