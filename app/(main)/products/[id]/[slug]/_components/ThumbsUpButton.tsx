"use client";

import { Review } from "@/app/(shared)/_types/review";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import toggleThumbsUp from "../_action/toggleThumbsUp";
import { toastWithButton } from "@/components/ui/toastWithButton";

type ThumbsUpButtonProps = {
  review: Review;
  isAuthenticated: boolean;
  isThumbsUp: boolean;
};

type ThumbsUpState = {
  isThumbsUp: boolean;
  helpfulCount: number;
};

export default function ThumbsUpButton({
  review,
  isAuthenticated,
  isThumbsUp,
}: ThumbsUpButtonProps) {
  const [thumbsUpState, setThumbsUpState] = React.useState<ThumbsUpState>({
    isThumbsUp,
    helpfulCount: review.helpfulCount,
  });
  const [thumbsUpStateOpt, toggleThumbsUpStateOpt] = React.useOptimistic(
    thumbsUpState,
    (state, _: void) => {
      const nextIsThumbsUp = !state.isThumbsUp;
      return {
        isThumbsUp: nextIsThumbsUp,
        helpfulCount: state.helpfulCount + (nextIsThumbsUp ? 1 : -1),
      };
    }
  );
  const [_, startTransition] = React.useTransition();

  const handleToggleThumbsUp = () => {
    startTransition(async () => {
      toggleThumbsUpStateOpt();
      try {
        const { serverError, data } = await toggleThumbsUp(review.id);

        if (data) {
          if (data.success) {
            const { helpfulCount, liked } = data.body;

            startTransition(() => {
              setThumbsUpState({ helpfulCount, isThumbsUp: liked });
            });
          }
        } else if (serverError) {
          toastWithButton({
            type: "error",
            message: serverError,
          });
        }
      } catch (err) {
        console.warn(err);
        toastWithButton({
          type: "error",
          message:
            "Something went wrong, Please check your internet connection and try again later",
        });
      }
    });
  };

  return (
    <div className="flex text-muted-foreground">
      {isAuthenticated ? (
        <Button
          className="h-auto text-muted-foreground"
          variant="plain"
          size="icon-lg"
          onClick={handleToggleThumbsUp}
        >
          {!thumbsUpStateOpt.isThumbsUp ? (
            <ThumbsUp className="size-5" />
          ) : (
            <ThumbsUp className="size-5" fill="currentColor" />
          )}
        </Button>
      ) : (
        <Link
          href="/login"
          className={buttonVariants({
            size: "icon-lg",
            variant: "plain",
            className: "h-auto text-muted-foreground",
          })}
        >
          <ThumbsUp className="size-5" />
        </Link>
      )}
      ({thumbsUpStateOpt.helpfulCount})
    </div>
  );
}
