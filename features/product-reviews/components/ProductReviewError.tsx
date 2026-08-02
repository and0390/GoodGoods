import { PaginatedReview } from "@/app/(shared)/_types/productReview";
import { IconExclamationCircle } from "@tabler/icons-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function ProductReviewError({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<NoInfer<PaginatedReview>, Error>>;
}) {
  return (
    <div className="mb-6 flex h-full w-full flex-col items-center justify-center gap-3 md:h-72">
      <IconExclamationCircle className="size-[46px] flex-none text-destructive md:size-[64px]" />
      <h2 className="text-base font-semibold md:text-lg">
        Something went wrong while fetching reviews
      </h2>
      <Button variant="outline" size="lg" onClick={() => refetch()}>
        Try again
      </Button>
    </div>
  );
}
