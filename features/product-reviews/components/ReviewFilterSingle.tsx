"use client";

import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { getRatingFromFilter } from "../utis/reviewFilter";
import { ReviewState } from "../utis/reviewReducer";

export const FILTER_OPTIONS = [
  { label: "all", value: "all" },
  { label: "5 Stars", value: "5-stars" },
  { label: "4 Stars", value: "4-stars" },
  { label: "3 Stars", value: "3-stars" },
  { label: "2 Stars", value: "2-stars" },
  { label: "1 Stars", value: "1-stars" },
  { label: "With Images", value: "with-images" },
  { label: "With Reviews", value: "with-reviews" },
] as const;

type ReviewFilter = (typeof FILTER_OPTIONS)[number]["value"];

type ReviewFilterSingleProps = {
  reviewSummary: Promise<ReviewSummary>;
  value: ReviewFilter;
  onValueChange: (value: ReviewFilter | "") => void;
} & Pick<React.ComponentProps<typeof ToggleGroup>, "size" | "className">;

export default function ReviewFilterSingle({
  reviewSummary,
  ...props
}: ReviewFilterSingleProps) {
  const {
    ratingDistribution,
    totalReviews,
    totalReviewsWithImages,
    totalReviewsWithText,
  } = React.use(reviewSummary);

  const getFilterCount = (item: ReviewFilter) => {
    switch (item) {
      case "all":
        return totalReviews;
      case "with-images":
        return totalReviewsWithImages;
      case "with-reviews":
        return totalReviewsWithText;
      default:
        return ratingDistribution[getRatingFromFilter(item)];
    }
  };

  return (
    <ToggleGroup type="single" variant="outline" size="lg" {...props}>
      {FILTER_OPTIONS.map(({ label, value }, index) => (
        <ToggleGroupItem value={value} id={value} key={index}>
          {label} ({getFilterCount(value)})
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function getSelectedFilter(state: ReviewState): ReviewFilter {
  if (state.rating) return state.rating;
  if (state.hasImages) return "with-images";
  if (state.hasReviews) return "with-reviews";
  return "all";
}
