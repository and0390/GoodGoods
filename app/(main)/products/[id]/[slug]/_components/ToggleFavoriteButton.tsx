"use client";

import FavoriteButton from "@/app/(shared)/_components/FavoriteButton";
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
import { useRouter } from "next/navigation";
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
          variant: "ghost",
          className: "p-0!",
        })}
      >
        <FaRegHeart className="size-5.5" />
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
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
  const [, startTransition] = React.useTransition();
  const router = useRouter();

  const handleToggleFavorite = () => {
    startTransition(async () => {
      const nextIsFavorited = !isFavorited;
      setIsFavoriteStateOpt(nextIsFavorited);
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
              setFavoritesCount((prev) =>
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

  return (
    <div className="ms-auto flex items-center gap-2">
      <FavoriteButton
        isFavorited={favoriteStateOpt.isFavorited}
        onClick={
          isAuthenticated ? handleToggleFavorite : () => router.push("/login")
        }
      />
      <p className="text-base font-normal text-card-foreground uppercase">
        Favorite{" "}
        <span className="text-muted-foreground">
          ({formatCount(favoriteStateOpt.favoritesCount)})
        </span>
      </p>
    </div>
  );
}
