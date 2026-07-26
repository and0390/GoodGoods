import { IconPencilSearch } from "@tabler/icons-react";
import { FilterValue } from "../utis/reviewFilter";

export default function ProductReviewEmpty({
  filter,
}: {
  filter: FilterValue;
}) {
  return (
    <div className="flex h-72 w-full flex-col items-center justify-center gap-3 bg-card">
      <IconPencilSearch className="size-[76px] flex-none text-primary" />
      <h3 className="text-lg font-bold">
        {filter === "all" ? "No Reviews Yet" : "No Reviews Found"}
      </h3>
      <p className="text-base font-semibold text-muted-foreground">
        {filter === "all"
          ? "Be the first buyer to leave a review and help others make their choice!"
          : `There are no ${filter} star reviews for this product yet.`}
      </p>
    </div>
  );
}
