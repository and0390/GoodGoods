"use client";

import { PaginatedReview, Review } from "@/app/(shared)/_types/productReview";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import toggleThumbsUp from "../actions/toggleThumbsUp";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { FilterValue } from "../../product-reviews/utis/reviewFilter";
import { cn } from "@/lib/utils";
import useThumbsUp from "../../product-reviews/hooks/useThumbsUp";

type ThumbsUpButtonProps = {
  review: Review;
  isAuthenticated: boolean;
  isLikedByUser: boolean;
  productId: string;
  filter: FilterValue;
  page: number;
};

export default function HelpfulButton({
  review,
  isAuthenticated,
  isLikedByUser,
  filter,
  page,
  productId,
}: ThumbsUpButtonProps) {
  const router = useRouter();
  const { mutate } = useThumbsUp({
    filter,
    page,
    productId,
  });

  const handleOnClick = () => {
    if (isAuthenticated) {
      mutate(review.id);
    } else {
      router.push("/login");
    }
  };

  const hasHelpfulCount = review.helpfulCount > 0;

  return (
    <div className="ms-auto flex items-start gap-1 md:ms-0">
      <button className="flex flex-none gap-1" onClick={handleOnClick}>
        <p className="relative translate-y-[1.2px] text-sm font-normal text-muted-foreground md:hidden">
          Helpful ({review.helpfulCount})
        </p>
        <ThumbsUp
          className={cn(
            "size-[18px] flex-none text-muted-foreground md:size-5",
            isLikedByUser && "fill-muted-foreground"
          )}
        />
      </button>
      {hasHelpfulCount && (
        <p className="hidden text-sm font-normal text-muted-foreground md:block">
          {review.helpfulCount} People found this Helpful
        </p>
      )}
    </div>
  );
}
