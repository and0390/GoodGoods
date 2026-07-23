"use client";

import { PaginatedReview, Review } from "@/app/(shared)/_types/productReview";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import toggleThumbsUp from "../_action/toggleThumbsUp";
import { toastWithButton } from "@/components/ui/toastWithButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { FilterValue } from "../_lib/reviewFilter";
import { cn } from "@/lib/utils";
import useThumbsUp from "../_hooks/useThumbsUp";

type ThumbsUpButtonProps = {
  review: Review;
  isAuthenticated: boolean;
  isLikedByUser: boolean;
  productId: string;
  filter: FilterValue;
  page: number;
};

export default function ThumbsUpButton({
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

  return (
    <div className="flex items-center gap-1">
      <button className="size-5 flex-none" onClick={handleOnClick}>
        <ThumbsUp
          className={cn(
            "size-full text-muted-foreground",
            isLikedByUser && "fill-muted-foreground"
          )}
        />
      </button>
      {review.helpfulCount > 0 && (
        <p className="text-sm font-normal text-muted-foreground">
          {review.helpfulCount} People found this Helpful
        </p>
      )}
    </div>
  );
}
