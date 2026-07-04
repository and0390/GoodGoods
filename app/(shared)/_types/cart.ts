import { Product } from "./product";

export type CartItem = {
  product: Product;
  id: string;
  isFavorited: boolean;
  isQuantityAdjusted: boolean;
  quantity: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
};
