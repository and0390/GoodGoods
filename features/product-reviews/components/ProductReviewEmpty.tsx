import { IconPencilSearch } from "@tabler/icons-react";
import { ReviewPaginationState } from "../utis/reviewPaginationReducer";

export default function ProductReviewEmpty({
  filterState,
}: {
  filterState: ReviewPaginationState;
}) {
  const { rating } = filterState;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-card md:h-72">
      <div className="rounded-full bg-primary p-3 md:p-4">
        <IconPencilSearch className="size-[46px] flex-none rounded-full text-primary-foreground md:size-[64px]" />
      </div>
      <h3 className="mt-3 text-base font-medium md:text-lg">
        {rating === null ? "No Reviews Yet" : "No Reviews Found"}
      </h3>
      <p className="text-center text-sm font-medium text-muted-foreground md:text-base">
        {rating === null
          ? "Be the first buyer to leave a review and help others make their choice!"
          : "There are no reviews for this filter yet."}
      </p>
    </div>
  );
}
