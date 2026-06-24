import { CartItem } from "@/app/(shared)/_types/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartPreviewEmpty } from "./CartPreviewEmpty";
import { CartPreviewItem } from "./CartPreviewItem";

type CartHoverCardItemListProps = {
  cartItems: CartItem[];
};

const CartHoverCardItemList = ({ cartItems }: CartHoverCardItemListProps) => {
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

export default CartHoverCardItemList;
