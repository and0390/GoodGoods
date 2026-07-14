"use client";

import { toggleFavorite } from "@/cart/_actions/toggleFavorite";
import { Button, buttonVariants } from "@/components/ui/button";
import { toastWithButton } from "@/components/ui/toastWithButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import formatCount from "@/lib/formatCount";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type ToggleFavoriteBaseProps = {
  isAuthenticated: boolean;
  isFavorited: boolean;
  productId: string;
  setIsFavoritedAction: React.Dispatch<React.SetStateAction<boolean>>;
  setFavoritesCountAction: React.Dispatch<React.SetStateAction<number>>;
  setFavoriteStateAction: (value: boolean) => void;
};

export function ToggleFavoriteButtonBase(props: ToggleFavoriteBaseProps) {
  const [, startTransition] = React.useTransition();

  const handleToggleFavorite = () => {
    startTransition(async () => {
      const nextIsFavorited = !props.isFavorited;
      props.setFavoriteStateAction(nextIsFavorited);
      try {
        const { serverError, data } = await toggleFavorite(props.productId);

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
              props.setIsFavoritedAction((prev) => !prev);
              props.setFavoritesCountAction((prev) =>
                nextIsFavorited ? prev + 1 : prev - 1
              );
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

  if (!props.isAuthenticated) {
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: "plain",
          className: "p-0!",
        })}
      >
        <FaRegHeart className="size-5.5" />
      </Link>
    );
  }

  return (
    <Button
      variant="plain"
      type="button"
      className="p-0!"
      onClick={handleToggleFavorite}
    >
      {props.isFavorited ? (
        <FaHeart className="size-5.5 text-rose-500" />
      ) : (
        <FaRegHeart className="size-5.5" />
      )}
    </Button>
  );
}

type ToggleFavoriteButtonProps = {
  IsFavorited: boolean;
  favoritesCount: number;
  isAuthenticated: boolean;
  productId: string;
};

export default function ToggleFavoriteButton({
  IsFavorited: initialIsFavorited,
  favoritesCount: initialFavoritesCount,
  isAuthenticated,
  productId,
}: ToggleFavoriteButtonProps) {
  const [favoritesCount, setFavoritesCount] = React.useState(
    initialFavoritesCount
  );
  const [isFavorited, setIsFavorited] = React.useState(initialIsFavorited);
  const [favoriteStateOpt, setIsFavoriteStateOpt] = React.useOptimistic<
    {
      isFavorited: boolean;
      favoritesCount: number;
    },
    boolean
  >(
    {
      isFavorited: isFavorited,
      favoritesCount: favoritesCount,
    },
    (state, newIsFavorited) => ({
      isFavorited: newIsFavorited,
      favoritesCount: newIsFavorited
        ? state.favoritesCount + 1
        : state.favoritesCount - 1,
    })
  );

  return (
    <div className="flex items-center gap-2">
      <ToggleFavoriteButtonBase
        isAuthenticated={isAuthenticated}
        isFavorited={favoriteStateOpt.isFavorited}
        productId={productId}
        setFavoriteStateAction={setIsFavoriteStateOpt}
        setIsFavoritedAction={setIsFavorited}
        setFavoritesCountAction={setFavoritesCount}
      />
      <span className="text-base tracking-wide uppercase">Favorite</span>
      <span className="text-base font-light">
        ({formatCount(favoriteStateOpt.favoritesCount)})
      </span>
    </div>
  );
}
