import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isFavorited: boolean;
} & React.ComponentProps<"button">;

export default function FavoriteButton({
  isFavorited,
  className,
  ...props
}: FavoriteButtonProps) {
  return (
    <button className={cn("size-8", className)} {...props}>
      <Heart className={cn("size-full", isFavorited && "fill-red-600")} />
    </button>
  );
}
