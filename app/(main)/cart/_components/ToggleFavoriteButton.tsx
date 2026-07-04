import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useToggleFavorite from "../_hooks/useToggleFavorite";

type ToggleFavoriteButtonProps = {
  isFavorited: boolean;
  productId: string;
  cartItemId: string;
};

export const ToggleFavoriteButton = ({
  isFavorited,
  cartItemId,
  productId,
}: ToggleFavoriteButtonProps) => {
  const { mutate } = useToggleFavorite(cartItemId);

  const handleToggleFavorite = () => {
    mutate(productId);
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
