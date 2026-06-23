import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const CartItemListSkeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex w-full flex-2 flex-col gap-3", className)}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, index, arr) => {
        const isFirstIndex = index === 0;
        const isLastIndex = index === arr.length - 1;
        return (
          <div key={index}>
            {isFirstIndex ? (
              <Card className="h-14 w-full rounded-t-2xl rounded-b-none">
                <CardContent className="flex size-full justify-start ps-10">
                  <Skeleton className="h-6 w-30" />
                </CardContent>
              </Card>
            ) : (
              <Card
                className={cn(
                  "h-30 w-full rounded-none",
                  isLastIndex && "rounded-b-2xl"
                )}
              >
                <CardContent className="size-full ps-10">
                  <div className="grid h-full w-full grid-cols-[auto_1fr_auto] grid-rows-[auto_auto_auto] gap-x-3 gap-y-1">
                    <div className="row-span-3">
                      <Skeleton className="size-[86px]" />
                    </div>

                    <div className="min-w-0 items-start justify-self-start">
                      <Skeleton className="h-6 w-78" />
                    </div>

                    <div className="col-start-2 row-start-2 flex items-start">
                      <Skeleton className="h-6 w-40" />
                    </div>

                    <div className="col-start-3 row-span-2 row-start-1 flex min-w-0 items-start gap-1 justify-self-end font-semibold">
                      <Skeleton className="h-6 w-25" />
                    </div>

                    <div className="col-span-2 col-start-2 row-start-3 items-end justify-self-end">
                      <Skeleton className="h-8 w-40" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
};
