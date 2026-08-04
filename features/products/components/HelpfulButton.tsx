"use client";

import { Review } from "@/app/(shared)/_types/productReview";
import { ReviewPaginationState } from "@/features/product-reviews/utis/reviewPaginationReducer";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import useThumbsUp from "../../product-reviews/hooks/useThumbsUp";

type ThumbsUpButtonProps = {
  review: Review;
  isAuthenticated: boolean;
  isLikedByUser: boolean;
  productId: string;
  filterState: ReviewPaginationState;
} & Pick<React.ComponentProps<"button">, "className">;

export default function HelpfulButton({
  review,
  isAuthenticated,
  isLikedByUser,
  filterState,
  productId,
  className,
}: ThumbsUpButtonProps) {
  const router = useRouter();
  const { mutate } = useThumbsUp({
    filterState,
    productId,
  });

  const handleOnClick = () => {
    if (isAuthenticated) {
      mutate(review.id);
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      className={cn(
        "ms-auto flex flex-none flex-row-reverse items-end gap-1 md:ms-0 md:flex-row",
        className
      )}
      onClick={handleOnClick}
    >
      <ThumbsUp
        className={cn(
          "size-[18px] flex-none text-muted-foreground md:size-5",
          isLikedByUser && "fill-muted-foreground"
        )}
      />
      <p className="relative translate-y-px text-base leading-none font-normal text-muted-foreground">
        {review.helpfulCount}
      </p>
    </button>
  );
}
