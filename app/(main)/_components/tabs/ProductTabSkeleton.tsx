import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-6 w-8/12" />
      <Skeleton className="h-4 w-6/12" />
    </div>
  );
};

export const ProductTabSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-2/12" />
      <div className="grid grid-cols-3 gap-3.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
