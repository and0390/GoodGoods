import { Cart, CartItem } from "@/app/(shared)/_types/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartPreviewItem } from "./CartPreviewItem";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { CartPreviewSkeleton } from "./CardSkeleton";
import { MdErrorOutline } from "react-icons/md";
import { CartPreviewError } from "./CartPreviewError";

type CartPreviewItemListProps = {
  cartItems: CartItem[];
};

const CartPreviewItemList = ({ cartItems }: CartPreviewItemListProps) => {
  const hasList = cartItems.length > 0;

  if (!hasList) {
    return <CartPreviewEmpty />;
  }

  return (
    <ScrollArea classNameViewport="max-h-78 w-full" classNameScrollbar="me-0.5">
      <div className="flex w-full flex-col gap-4 p-3 pe-4">
        {cartItems.map((cartItem) => (
          <CartPreviewItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </ScrollArea>
  );
};

type CartPreviewProps = {
  cartItems: CartItem[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
};

export const CartPreview = ({
  cartItems,
  isAuthenticated,
  isError,
  isLoading,
}: CartPreviewProps) => {
  if (!isAuthenticated) {
    return <CartPreviewEmpty />;
  }

  if (isLoading) {
    return <CartPreviewSkeleton />;
  }

  if (isError) {
    return <CartPreviewError />;
  }

  return <CartPreviewItemList cartItems={cartItems} />;
};
