import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function RatingStars({
  rating,
  className,
  ...props
}: { rating: number } & React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4 text-rating md:size-3",
            index < Math.round(rating) && "fill-current"
          )}
        />
      ))}
    </div>
  );
}
