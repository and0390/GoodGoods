import { Skeleton } from "@/components/ui/skeleton";

export const CartPreviewSkeleton = () => {
  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between px-3 pt-3">
        <Skeleton className="h-7 w-28" />

        <Skeleton className="h-5 w-16" />
      </div>

      <div className="flex w-full flex-col gap-4 p-3 pt-0">
        {Array.from({ length: 3 }).map((_, index) => (
          <CartPreviewItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const CartPreviewItemSkeleton = () => {
  return (
    <div className="grid h-full w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-3 gap-y-1">
      <div className="row-span-2">
        <Skeleton className="size-14 rounded-sm" />
      </div>

      <div className="min-w-0">
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="col-start-2 row-start-2">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
