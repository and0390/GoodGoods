"use client";

import {
  PaginatedReview,
  Review,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
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
  return (
    <>
      <ProductReviewsDesktop
        isAuthenticated={isAuthenticated}
        paginatedReview={paginatedReview}
        productId={productId}
        className="hidden md:block"
        reviewSummary={reviewSummary}
      />

      <ProductReviewsCompact
        isAuthenticated={isAuthenticated}
        paginatedReview={paginatedReview}
        productId={productId}
        className="md:hidden"
        reviewSummary={reviewSummary}
      />
    </>
  );
}
