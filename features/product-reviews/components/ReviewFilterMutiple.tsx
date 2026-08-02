import { ReviewSummary } from "@/app/(shared)/_types/productReview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { ReviewPaginationAction } from "../utis/reviewPaginationReducer";

const FILTER_OPTIONS = [
  { label: "With Images", value: "with-images" },
  { label: "With Reviews", value: "with-reviews" },
] as const;

type ReviewFilter = (typeof FILTER_OPTIONS)[number]["value"];

type ReviewFilterMultipleProps = {
  reviewSummary: Promise<ReviewSummary>;
  dispatch: React.ActionDispatch<[action: ReviewPaginationAction]>;
} & Pick<React.ComponentProps<typeof ToggleGroup>, "className" | "size">;

export default function ReviewFilterMultiple({
  reviewSummary,
  dispatch,
  ...props
}: ReviewFilterMultipleProps) {
  const { totalReviewsWithImages } = React.use(reviewSummary);
  const [filter, setFilter] = React.useState<ReviewFilter[]>([]);

  const getFilterCount = (value: ReviewFilter) => {
    if (value === "with-images") return totalReviewsWithImages;
    return 0;
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={filter}
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
            type: "SET_HAS_TEXT",
            value: true,
          });
        } else {
          dispatch({
            type: "SET_HAS_TEXT",
            value: false,
          });
        }

        setFilter(value);
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
