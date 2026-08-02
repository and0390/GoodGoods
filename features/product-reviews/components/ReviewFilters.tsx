"use client";

import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { getRatingFromFilter } from "../utis/reviewFilter";
import { ReviewPaginationAction } from "../utis/reviewPaginationReducer";

export const FILTER_OPTIONS = [
  { label: "all", value: "all" },
  { label: "5 Stars", value: "5-stars" },
  { label: "4 Stars", value: "4-stars" },
  { label: "3 Stars", value: "3-stars" },
  { label: "2 Stars", value: "2-stars" },
  { label: "1 Stars", value: "1-stars" },
  { label: "With Images", value: "with-images" },
] as const;

type ReviewFilter = (typeof FILTER_OPTIONS)[number]["value"];

type ReviewFiltersProps = {
  reviewSummary: Promise<ReviewSummary>;
  dispatch: React.ActionDispatch<[action: ReviewPaginationAction]>;
  showAll?: boolean;
} & Pick<React.ComponentProps<typeof ToggleGroup>, "size" | "className">;

export default function ReviewFilters({
  reviewSummary,
  dispatch,
  showAll = true,
  ...props
}: ReviewFiltersProps) {
  const { ratingDistribution, totalReviews, totalReviewsWithImages } =
    React.use(reviewSummary);

  const [filter, setFilter] = React.useState<ReviewFilter>("all");

  const getFilterCount = (item: ReviewFilter) => {
    switch (item) {
      case "all":
        return totalReviews;
      case "with-images":
        return totalReviewsWithImages;
      default:
        return ratingDistribution[getRatingFromFilter(item)];
    }
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="lg"
      value={filter}
      onValueChange={(nextValue: ReviewFilter | "") => {
        if (nextValue === "" && showAll) return;

        const value: ReviewFilter = nextValue === "" ? "all" : nextValue;

        dispatch({
          type: "RESET_STATE",
        });

        if (value === "all") {
          dispatch({
            type: "SET_RATING",
            rating: null,
          });
        } else if (value === "with-images") {
          dispatch({
            type: "SET_HAS_IMAGES",
            value: true,
          });
        } else {
          const rating = (
            ["5-stars", "4-stars", "3-stars", "2-stars", "1-stars"] as const
          ).find((rating) => rating === value);

          if (rating) {
            dispatch({
              type: "SET_RATING",
              rating,
            });
          }
        }

        setFilter(value);
      }}
      {...props}
    >
      {FILTER_OPTIONS.filter((item) => showAll || item.value !== "all").map(
        ({ label, value }, index) => (
          <ToggleGroupItem value={value} id={value} key={index}>
            {label} ({getFilterCount(value)})
          </ToggleGroupItem>
        )
      )}
    </ToggleGroup>
  );
}
