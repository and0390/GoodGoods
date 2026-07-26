"use client";

import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import React from "react";
import { PaginationReducer } from "../utis/reviewPaginationReducer";
import ProductReviewsCompact from "./ProductReviewsCompact";
import ProductReviewsDesktop from "./ProductReviewsDesktop";

type ProductReviewsProps = {
  productId: string;
  paginatedReview: Promise<PaginatedReview>;
  reviewSummary: Promise<ReviewSummary>;
  isAuthenticated: boolean;
};

export default function ProductReviews({
  productId,
  paginatedReview,
  reviewSummary,
  isAuthenticated,
}: ProductReviewsProps) {
  const [{ filter, page }, dispatch] = React.useReducer(PaginationReducer, {
    page: 1,
    filter: "all",
  });

  return (
    <>
      <ProductReviewsDesktop
        filter={filter}
        isAuthenticated={isAuthenticated}
        page={page}
        paginatedReview={paginatedReview}
        paginationDispatch={dispatch}
        productId={productId}
        className="hidden md:block"
        reviewSummary={reviewSummary}
      />

      <ProductReviewsCompact
        filter={filter}
        isAuthenticated={isAuthenticated}
        page={page}
        paginatedReview={paginatedReview}
        productId={productId}
        className="md:hidden"
        reviewSummary={reviewSummary}
      />
    </>
  );
}
