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
    <div className="mb-6 flex h-72 w-full flex-col items-center justify-center gap-3">
      <IconExclamationCircle className="size-[76px] flex-none text-destructive" />
      <h2 className="text-lg font-bold">
        Something went wrong while fetching reviews
      </h2>
      <Button variant="default" size="lg" onClick={() => refetch()}>
        Try again
      </Button>
    </div>
  );
}
