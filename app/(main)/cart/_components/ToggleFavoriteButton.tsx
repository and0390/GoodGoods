import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useToggleFavorite from "../_hooks/useToggleFavorite";

type ToggleFavoriteButtonProps = {
  isFavorited: boolean;
  productId: string;
};

export const ToggleFavoriteButton = ({
  isFavorited,
  productId,
}: ToggleFavoriteButtonProps) => {
  const { mutate } = useToggleFavorite(productId);

  const handleToggleFavorite = () => {
    mutate();
  };

  return (
    <Button variant="plain" size="fit" onClick={handleToggleFavorite}>
      {isFavorited ? (
        <FaHeart className="size-5.5 text-rose-500" />
      ) : (
        <FaRegHeart className="size-5.5" />
      )}
    </Button>
  );
};
