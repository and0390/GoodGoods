import { ProductCartItem } from "./product";

export type CartItem = {
  product: ProductCartItem;
  id: string;
  isFavoritedByUser: boolean;
  isQuantityAdjusted: boolean;
  quantity: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
};
