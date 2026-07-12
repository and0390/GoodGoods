"use client";

import { toggleFavorite } from "@/cart/_actions/toggleFavorite";
import { Button, buttonVariants } from "@/components/ui/button";
import { toastWithButton } from "@/components/ui/toastWithButton";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type ToggleFavoriteProps = {
  isAuthenticated: boolean;
  initialIsFavorited: boolean;
  productId: string;
} & React.ComponentProps<typeof Button>;

export default function ToggleFavoriteButton({
  isAuthenticated,
  initialIsFavorited,
  productId,
  ...props
}: ToggleFavoriteProps) {
  const [isFavorited, setIsFavorited] = React.useState(initialIsFavorited);
  const [isFavoritedOpt, setIsFavoritedOpt] = React.useOptimistic(isFavorited);
  const [, startTransition] = React.useTransition();

  const handleToggleFavorite = () => {
    startTransition(async () => {
      setIsFavoritedOpt((prev) => !prev);
      try {
        const { serverError, data } = await toggleFavorite(productId);

        if (serverError) {
          toastWithButton({
            type: "error",
            message: serverError,
          });
        } else if (data) {
          if (!data.success) {
            toastWithButton({
              type: "error",
              message: data.message,
            });
          } else {
            startTransition(() => {
              setIsFavorited((prev) => !prev);
            });
          }
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

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={buttonVariants({ variant: "plain" })}>
        <FaRegHeart className="size-5.5" />
      </Link>
    );
  }

  return (
    <Button
      {...props}
      variant="plain"
      type="button"
      onClick={handleToggleFavorite}
    >
      {isFavoritedOpt ? (
        <FaHeart className="size-5.5 text-rose-500" />
      ) : (
        <FaRegHeart className="size-5.5" />
      )}
    </Button>
  );
}
