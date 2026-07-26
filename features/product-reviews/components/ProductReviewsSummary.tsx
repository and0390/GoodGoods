import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { Star } from "lucide-react";
import React from "react";
import formatRating from "../utis/formatRating";
import formatCount from "@/lib/formatCount";

type ProductReviewSummaryProps = {
  reviewSummary: Promise<ReviewSummary>;
};

export default function ProductReviewSummary({
  reviewSummary,
}: ProductReviewSummaryProps) {
  const { ratingDistribution, totalReviews, avgRating } =
    React.use(reviewSummary);

  return (
    <div className="mb-4 flex gap-3 rounded-lg border border-border px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-1 pb-6 text-center md:pb-0">
        <div className="flex items-center gap-1">
          <Star className="size-9 fill-rating text-rating" />
          <p className="text-3xl font-bold text-card-foreground">
            {formatRating(avgRating)}
            <span className="text-lg font-bold text-muted-foreground">
              /5.0
            </span>
          </p>
        </div>

        <p className="text-sm font-normal text-muted-foreground">
          {formatCount(totalReviews)} Reviews
        </p>
      </div>

      <ul className="grid flex-1 grid-cols-3 grid-rows-3 justify-center gap-x-1">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = ratingDistribution[star];
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <li key={star} className="flex items-center gap-1">
              <Star
                className="size-[14px] fill-rating text-rating"
                aria-hidden="true"
              />
              <span className="text-xs font-normal text-card-foreground">
                {star}
              </span>

              <div
                className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
                tabIndex={0}
                role="progressbar"
                aria-label={`${star} star reviews`}
                aria-valuenow={Math.round(percentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
