"use client";

import React from "react";
import toggleFavorite from "../actions/toggleFavorite";
import { toastWithButton } from "@/components/ui/toastWithButton";
import safeAction from "@/lib/safeActionWrappers";

export default function useFavorite({
  favoriteCount,
  isFavorited,
  productId,
}: {
  isFavorited: boolean;
  favoriteCount: number;
  productId: string;
}) {
  const [favoriteState, setFavoriteState] = React.useState({
    isFavorited,
    favoriteCount,
  });

  const [optimisticState, setOptimisticState] = React.useOptimistic({
    isFavorited: favoriteState.isFavorited,
    favoriteCount: favoriteState.favoriteCount,
  });
  const [, startTransition] = React.useTransition();

  const handleToggleFavorite = () => {
    startTransition(async () => {
      setOptimisticState(({ favoriteCount, isFavorited }) => {
        const nextIsFavorited = !isFavorited;
        return {
          isFavorited: nextIsFavorited,
          favoriteCount: nextIsFavorited
            ? favoriteCount + 1
            : favoriteCount - 1,
        };
      });

      const { data, serverError } = await safeAction(toggleFavorite(productId));

      if (serverError) {
        toastWithButton({
          type: "error",
          message: serverError,
        });
      } else if (data) {
        const { isFavorited, favoriteCount, action } = data;
        const message =
          action === "ADD_TO_FAVORITE"
            ? "Added to Favorite"
            : "Removed from Favorite";

        startTransition(() => {
          setFavoriteState({ isFavorited, favoriteCount });
        });
        toastWithButton({
          type: "success",
          message,
          position: "bottom-center",
          id: `toast-favorite-${productId}`,
        });
      }
    });
  };

  return {
    ...optimisticState,
    handleToggleFavorite,
  };
}
