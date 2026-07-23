import { RatingDistribution } from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { FILTER_OPTIONS, FilterValue } from "../_lib/reviewFilter";
import { PaginationAction } from "../_lib/reviewPaginationReducer";

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
  totalReviews: number;
  ratingDistribution: RatingDistribution;
  filter: FilterValue;
  dispatch: React.ActionDispatch<[action: PaginationAction]>;
  className?: string;
};

export default function ReviewFilters({
  ratingDistribution,
  totalReviews,
  filter,
  dispatch,
  className,
}: ReviewFiltersProps) {
  return (
    <ToggleGroup
      className={className}
      type="single"
      variant="outline"
      size="lg"
      value={filter}
      onValueChange={(value: FilterValue) => {
        dispatch({ type: "SET_FILTER", payload: value });
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
