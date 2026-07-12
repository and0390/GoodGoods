"use client";

import { ProductDetail } from "@/shared/_types/product";
import ShippingDetailDialog from "./shippingDetailDialog";
import { ShieldCheck } from "lucide-react";
import QuantityInputGroup from "@/shared/_components/QuantityInputGroup";
import AddToCartButton from "./AddToCartButton";
import { Button } from "@/components/ui/button";
import React from "react";

type ProductPurchaseActionProps = {
  product: ProductDetail;
  isAuthenticated: boolean;
};

export default function ProductPurchaseAction({
  product,
  isAuthenticated,
}: ProductPurchaseActionProps) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <>
      <dl className="mb-8 flex flex-col gap-3.5 ps-3.5 text-sm">
        <div className="flex items-center">
          <div className="basis-[100px]">
            <span className="text-muted-foreground">Shipping</span>
          </div>
          <div>
            <ShippingDetailDialog />
          </div>
        </div>
        <div className="flex items-center">
          <div className="basis-[100px]">
            <span className="text-muted-foreground">
              GoodGoods
              <br /> Guarantee
            </span>
          </div>
          <div className="flex items-center gap-2 ps-2.5">
            <ShieldCheck className="size-6 text-foreground" />
            10 - Day Return Policy &middot; 100% Original &middot; Cash On
            Delivery
          </div>
        </div>
        <div className="flex items-center">
          <div className="basis-[100px] text-muted-foreground">Quantity</div>
          <div className="flex items-center gap-5 ps-2.5">
            <QuantityInputGroup
              max={product.stock}
              initialQuantity={quantity}
              onChangeValue={setQuantity}
            />
            <span className="text-xs text-muted-foreground">
              {product.stock} available
            </span>
          </div>
        </div>
      </dl>

      <div className="flex w-full gap-3">
        <AddToCartButton
          quantity={quantity}
          isAuthenticated={isAuthenticated}
          product={{ ...product, imageUrl: product.imageUrls[0] }}
        />
        <Button variant="default" size="lg" className="h-10 flex-1">
          Buy Now
        </Button>
      </div>
    </>
  );
}
