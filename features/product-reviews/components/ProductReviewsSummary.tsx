import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { Star } from "lucide-react";
import React from "react";
import formatRating from "../utils/formatRating";
import formatCount from "@/lib/formatCount";
import { cn } from "@/lib/utils";

interface FractionalRatingStarsProps {
  rating: number; // Nilai rating, contoh: 4.8 atau 4.3
}

export function FractionalRatingStars({ rating }: FractionalRatingStarsProps) {
  return (
    <div className="flex items-center gap-1 md:hidden">
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercentage = Math.max(
          0,
          Math.min(100, (rating - index) * 100)
        );

        return (
          <div key={index} className="relative size-4">
            <Star className="absolute inset-0 size-full fill-border text-border" />

            {fillPercentage > 0 && (
              <Star
                className="absolute inset-0 size-full fill-rating text-rating"
                style={{
                  clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type ProductReviewSummaryProps = {
  reviewSummary: Promise<ReviewSummary>;
};

export default function ProductReviewSummary({
  reviewSummary,
}: ProductReviewSummaryProps) {
  const { ratingDistribution, totalReviews, avgRating } =
    React.use(reviewSummary);

  return (
    <div className="mb-4 flex gap-3 border-border bg-secondary/20 px-4 py-4 md:rounded-lg md:border md:bg-card md:py-10">
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center gap-1">
          <Star className="hidden size-9 fill-rating text-rating md:inline" />
          <p className="text-3xl font-bold text-card-foreground">
            {formatRating(avgRating)}
            <span className="text-lg font-bold text-muted-foreground">
              /5.0
            </span>
          </p>
        </div>

        <FractionalRatingStars rating={avgRating} />

        <p className="text-xs font-normal text-muted-foreground md:text-sm">
          {formatCount(totalReviews)} Reviews
        </p>
      </div>

      <ul className="flex flex-1 grid-cols-3 grid-rows-3 flex-col justify-center gap-x-1 md:grid">
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
                className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted-foreground/5 md:bg-muted"
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
