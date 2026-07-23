import {
  PaginatedReview,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { FaStar } from "react-icons/fa";
import ProductReviewList from "./ProductReviewList";

type ProductReviewsProps = {
  productId: string;
  paginatedReview: PaginatedReview;
  reviewSummary: ReviewSummary;
  isAuthenticated: boolean;
};

export default function ProductReviews({
  productId,
  paginatedReview,
  reviewSummary,
  isAuthenticated,
}: ProductReviewsProps) {
  const fixedAvgRating = reviewSummary.avgRating.toFixed(1);

  return (
    <div className="w-full bg-card p-8 select-none">
      <h2 className="mb-6 text-lg font-bold text-card-foreground">
        Product Ratings
      </h2>

      <div className="mb-4 flex gap-3 rounded-lg border border-border px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-1 pb-6 text-center md:pb-0">
          <div className="flex items-center gap-1">
            <FaStar className="size-9 fill-rating" />
            <p className="text-3xl font-bold text-card-foreground">
              {fixedAvgRating}
              <span className="text-lg font-bold text-muted-foreground">
                /5.0
              </span>
            </p>
          </div>

          <p className="text-sm font-normal text-muted-foreground">
            {reviewSummary.totalReviews} Reviews
          </p>
        </div>

        <div className="grid flex-1 grid-cols-3 grid-rows-3 justify-center gap-x-1">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = reviewSummary.ratingDistribution[star];
            const percentage =
              reviewSummary.totalReviews > 0
                ? (count / reviewSummary.totalReviews) * 100
                : 0;

            return (
              <div key={star} className="flex items-center gap-1">
                <FaStar className="size-[14px] fill-rating" />
                <span className="text-xs font-normal text-card-foreground">
                  {star}
                </span>

                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductReviewList
        isAuthenticated={isAuthenticated}
        paginatedReview={paginatedReview}
        productId={productId}
        reviewSummary={reviewSummary}
      />
    </div>
  );
}
