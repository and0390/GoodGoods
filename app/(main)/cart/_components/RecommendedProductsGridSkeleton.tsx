import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecommendedProductsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-4 gap-y-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="h-90 overflow-hidden rounded-xl py-0">
          <CardContent className="size-full px-0">
            <Skeleton className="h-[60%] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendedProductsGridSkeleton;
