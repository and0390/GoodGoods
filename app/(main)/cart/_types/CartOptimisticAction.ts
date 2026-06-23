import { Cart } from "@/app/(shared)/_types/cart";
import { Product } from "@/app/(shared)/_types/product";

export type CartOptimisticAction =
  | { type: "DELETE_ITEM"; itemId: string }
  | { type: "DELETE_ITEMS"; itemIdList: string[] }
  | {
      type: "ADD_ITEM_OR_UPDATE_QTY";
      product: Product;
      increment: number;
      quantity?: number;
    }
  | { type: "ADD_TO_FAVORITES"; productId: string };
