import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartHoverCardContentSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between p-4">
        <Skeleton className="h-7 w-26" />
        <Skeleton className="h-7 w-20" />
      </div>
      <Separator />
      <div className="flex w-full flex-col gap-4 p-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex w-full gap-3" key={index}>
            <Skeleton className="size-[60px] rounded-sm" />
            <div className="flex w-full flex-col justify-between">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-5 w-[40%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
