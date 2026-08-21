import { Skeleton } from "@/components/ui/skeleton";
import { GAP, MIN_COLUMN_WIDTH } from "../productGridConfig";

export default function ProductTabSkeleton() {
  return (
    <div
      style={{ columnWidth: `${MIN_COLUMN_WIDTH}px`, gap: `${GAP}px` }}
      className="mb-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:grid md:columns-auto"
    >
      {Array.from({ length: 20 }).map((_, index) => {
        return (
          <Skeleton
            style={{ marginBottom: `${GAP}px` }}
            className="h-[280px] min-h-[280px] w-full break-inside-avoid rounded-sm md:mb-0! md:break-inside-auto md:even:h-[280px]"
            key={index}
          />
        );
      })}
    </div>
  );
}
