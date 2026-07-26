"use client";

import React from "react";
import toggleFavorite from "../actions/toggleFavorite";
import { toastWithButton } from "@/components/ui/toastWithButton";
import safeAction from "@/lib/safeTransition";

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
        const { isFavorited, favoriteCount } = data;
        startTransition(() => {
          setFavoriteState({ isFavorited, favoriteCount });
        });
      }
    });
  };

  return {
    ...optimisticState,
    handleToggleFavorite,
  };
}
