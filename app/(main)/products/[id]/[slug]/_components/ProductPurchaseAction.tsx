"use client";

import { ProductDetail } from "@/shared/_types/product";
import ShippingDetailDialog from "./shippingDetailDialog";
import { ShieldCheck, Truck } from "lucide-react";
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
  const [isOverStock, setIsOverStock] = React.useState(false);

  return (
    <dl className="flex flex-col gap-5">
      <div className="flex items-start">
        <p className="flex-none basis-30 text-start text-sm text-muted-foreground">
          Shipping
        </p>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <Truck className="size-5 flex-none text-green-600" />
            <ShippingDetailDialog />
          </div>
          <p className="ms-7 text-xs font-normal text-muted-foreground">
            Get a voucher up to Rp10.000 if your order is late
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="flex-none basis-30 text-start text-sm text-muted-foreground">
          GoodGoods
          <br /> Guarantee
        </p>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 flex-none text-primary" />
          <p className="min-w-0 text-sm font-normal text-card-foreground">
            10 - Day Return Policy &middot; 100% Original &middot; Cash On
            Delivery
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <p className="flex-none basis-30 text-sm font-normal text-muted-foreground">
            Quantity
          </p>
          <div className="flex items-center gap-3">
            <QuantityInputGroup
              max={product.stock}
              initialQuantity={quantity}
              onChangeValue={(value, isOverMax) => {
                setQuantity(value);
                setIsOverStock(isOverMax);
              }}
            />
            <span className="text-xs font-normal text-muted-foreground">
              {product.stock} available
            </span>
          </div>
        </div>
        {isOverStock && (
          <p className="ms-28 text-sm text-destructive">
            Stock is not sufficient
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <AddToCartButton
          quantity={quantity}
          isAuthenticated={isAuthenticated}
          product={{ ...product, imageUrl: product.imageUrls[0] }}
        />
        <Button variant="default" size="lg">
          Buy Now
        </Button>
      </div>
    </dl>
  );
}
