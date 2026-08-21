import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { ReviewAction, ReviewState } from "../utils/reviewReducer";

const FILTER_OPTIONS = [
  { label: "With Images", value: "with-images" },
  { label: "With Reviews", value: "with-reviews" },
] as const;

type ReviewFilter = (typeof FILTER_OPTIONS)[number]["value"];

type ReviewFilterMultipleProps = {
  reviewSummary: Promise<ReviewSummary>;
  dispatch: React.ActionDispatch<[action: ReviewAction]>;
  filterState: ReviewState;
} & Pick<React.ComponentProps<typeof ToggleGroup>, "className" | "size">;

export default function ReviewFilterMultiple({
  reviewSummary,
  dispatch,
  filterState,
  ...props
}: ReviewFilterMultipleProps) {
  const { totalReviewsWithImages, totalReviewsWithText } =
    React.use(reviewSummary);

  const getFilterCount = (value: ReviewFilter) => {
    if (value === "with-images") return totalReviewsWithImages;
    return totalReviewsWithText;
  };

  const getSelectedFilters = (state: ReviewState): ReviewFilter[] => {
    const filters: ReviewFilter[] = [];

    if (state.hasImages) {
      filters.push("with-images");
    }

    if (state.hasReviews) {
      filters.push("with-reviews");
    }

    return filters;
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={getSelectedFilters(filterState)}
      onValueChange={(value: ReviewFilter[]) => {
        if (value.includes("with-images")) {
          dispatch({
            type: "SET_HAS_IMAGES",
            value: true,
          });
        } else {
          dispatch({
            type: "SET_HAS_IMAGES",
            value: false,
          });
        }

        if (value.includes("with-reviews")) {
          dispatch({
            type: "SET_HAS_REVIEWS",
            value: true,
          });
        } else {
          dispatch({
            type: "SET_HAS_REVIEWS",
            value: false,
          });
        }
      }}
      {...props}
    >
      {FILTER_OPTIONS.map(({ label, value }, index) => (
        <ToggleGroupItem value={value} key={index}>
          {label} ({getFilterCount(value)})
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
