"use client";

import {
  RatingDistribution,
  ReviewSummary,
} from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { FILTER_OPTIONS, FilterValue } from "../utis/reviewFilter";
import { PaginationAction } from "../utis/reviewPaginationReducer";

function getFilterCount(
  item: (typeof FILTER_OPTIONS)[number],
  ratingDistribution: RatingDistribution,
  totalReviews: number
) {
  if (item.value === "all") {
    return totalReviews;
  }

  return ratingDistribution[item.value];
}

type ReviewFiltersProps = {
  filter: FilterValue;
  reviewSummary: Promise<ReviewSummary>;
  dispatch: React.ActionDispatch<[action: PaginationAction]>;
  className?: string;
};

export default function ReviewFilters({
  filter,
  reviewSummary,
  dispatch,
  className,
}: ReviewFiltersProps) {
  const { ratingDistribution, totalReviews } = React.use(reviewSummary);

  return (
    <ToggleGroup
      className={className}
      type="single"
      variant="outline"
      size="lg"
      value={filter}
      onValueChange={(value) => {
        if (value !== "") {
          dispatch({ type: "SET_FILTER", payload: value as FilterValue });
        }
      }}
    >
      {FILTER_OPTIONS.map((item, index) => (
        <ToggleGroupItem value={item.value} key={index}>
          {item.name} ({getFilterCount(item, ratingDistribution, totalReviews)})
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
