"use client";

import { Heart } from "lucide-react";
import useFavorite from "../hooks/useFavorite";
import { cn } from "@/lib/utils";
import formatCount from "@/lib/formatCount";
import { useRouter } from "next/navigation";
import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";

type FavoriteButtonProps = {
  favoriteCount: number;
  isFavorited: boolean;
  productId: string;
  isAuthenticated: boolean;
};

export default function FavoriteButton({
  favoriteCount: initialFavoriteCount,
  isFavorited: initialIsFavorited,
  productId,
  isAuthenticated,
}: FavoriteButtonProps) {
  const { isFavorited, handleToggleFavorite, favoriteCount } = useFavorite({
    favoriteCount: initialFavoriteCount,
    isFavorited: initialIsFavorited,
    productId,
  });
  const router = useRouter();

  return (
    <ButtonPrimitive2
      type="button"
      onClick={
        isAuthenticated ? handleToggleFavorite : () => router.push("/login")
      }
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorited}
      className="size-5 items-center justify-center rounded-full border-border bg-card p-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:flex md:size-11 md:border md:p-0 lg:size-fit lg:flex-none lg:gap-2 lg:border-0"
    >
      <Heart
        className={cn(
          "size-full text-card-foreground md:size-6 lg:size-7",
          isFavorited && "fill-red-600 text-red-600"
        )}
      />
      <p className="hidden text-base font-normal text-card-foreground lg:block">
        Favorite{" "}
        <span className="text-muted-foreground">
          ({formatCount(favoriteCount)})
        </span>
      </p>
    </ButtonPrimitive2>
  );
}
