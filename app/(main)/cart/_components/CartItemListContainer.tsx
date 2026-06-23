"use client";

import { HttpError } from "@/app/(shared)/_lib/api";
import { CartPreviewError } from "../../_components/cartHoverCard/CartPreviewError";
import { useCartContext } from "../contexts/CartContext";
import { CartItemList } from "./CartItemList";

const CartItemListView = () => {
  const { isSuccess, error, refetch } = useCartContext();

  const statusCode =
    (error instanceof HttpError && error.statusCode) || undefined;

  return (
    <div className="flex flex-col">
      <h1 className="my-4 text-2xl font-semibold">Your Cart</h1>
      {isSuccess ? (
        <CartItemList />
      ) : (
        <CartPreviewError
          className="h-auto w-full rounded-2xl bg-muted py-20"
          variant="grid"
          statusCode={statusCode}
          size="lg"
          onRetry={refetch}
        />
      )}
    </div>
  );
};

export default CartItemListView;
