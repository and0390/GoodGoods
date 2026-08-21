import { ProductCartItem } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import { ButtonPrimitive2 } from "@/components/ui/ButtonPrimitive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddToCartDropdownItem from "@/features/cart/components/AddToCartDropdownItem";
import { Ellipsis } from "lucide-react";

export default function ProductCardActions({
  isAuthenticated,
  product,
}: {
  isAuthenticated: boolean;
  product: ProductCartItem;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonPrimitive2 className="h-auto! rounded-sm p-0">
          <Ellipsis className="size-4" />
          <span className="sr-only">options</span>
        </ButtonPrimitive2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <AddToCartDropdownItem
            product={product}
            isAuthenticated={isAuthenticated}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
