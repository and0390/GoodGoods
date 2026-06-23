import { CartItem } from "@/app/(shared)/_types/cart";

export type CartItems = Omit<CartItem, "product"> & {
  product: Pick<CartItem["product"], "id" | "name" | "imageUrl" | "price">;
};
