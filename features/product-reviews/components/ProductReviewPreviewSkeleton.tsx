import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProductReviewsPreviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <Skeleton className="h-[18px] w-[116px]" />
        </div>
        <Skeleton className="size-[18px]" />
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index, arr) => {
          const isLastIndex = index === arr.length - 1;
          return (
            <Skeleton
              key={index}
              className={cn("h-4", isLastIndex ? "w-[80%]" : "w-full")}
            />
          );
        })}
      </div>

      <div className="ms-auto flex items-center gap-1">
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="size-[18px]" />
      </div>
    </div>
  );
}
