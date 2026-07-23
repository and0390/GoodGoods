import { Skeleton } from "@/components/ui/skeleton";

function ProductReviewSkeleton() {
  return (
    <div className="flex w-full flex-col justify-start gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="size-8 flex-none rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-[49px]" />
            <Skeleton className="h-3.5 w-[68px]" />
            <Skeleton className="h-4 w-[105px]" />
          </div>
        </div>
        <Skeleton className="size-5" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="h-5 w-[180px]" />
      </div>
    </div>
  );
}

export default function ProductReviewListSkeleton() {
  return (
    <div className="mb-6 flex flex-col gap-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <ProductReviewSkeleton key={index} />
      ))}
    </div>
  );
}
