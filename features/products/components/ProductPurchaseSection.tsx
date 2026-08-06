"use client";

import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/shared/_types/product";
import { ShieldCheck, Truck } from "lucide-react";
import useQuantityInputGroup from "../hooks/useQuantityInputGroup";
import AddToCartButton from "./AddToCartButton";
import QuantityInputGroup from "./QuantityInputGroup";
import ShippingInformationDialog from "./ShippingInformationDialog";

type ProductPurchaseSectionProps = {
  product: ProductDetail;
  isAuthenticated: boolean;
};

export default function ProductPurchaseSection({
  product,
  isAuthenticated,
}: ProductPurchaseSectionProps) {
  const {
    inputRef,
    isOverMax: isOverStock,
    quantity,
    inputValue,
    handleDecrement,
    handleIncrement,
    handleKeyDown,
    handleOnBlur,
    handleOnChange,
    isMaxReached,
    isMinReached,
  } = useQuantityInputGroup({
    min: 1,
    max: product.stock,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start">
        <p className="flex-none basis-30 text-start text-sm text-muted-foreground">
          Shipping
        </p>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <Truck className="size-5 flex-none text-green-600" />
            <ShippingInformationDialog />
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
          <label
            htmlFor="quantityInput"
            className="flex-none basis-30 text-sm font-normal text-muted-foreground"
          >
            Quantity
          </label>

          <div className="flex items-center gap-3">
            <QuantityInputGroup
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleInputOnBlur={handleOnBlur}
              handleInputOnChange={handleOnChange}
              handleInputOnKeyDown={handleKeyDown}
              inputRef={inputRef}
              inputValue={inputValue}
              isMaxReached={isMaxReached}
              isMinReached={isMinReached}
              isOverMax={isOverStock}
            />
            <span
              className="text-xs font-normal text-muted-foreground"
              id="stockError"
            >
              {product.stock} available
            </span>
          </div>
        </div>
        {isOverStock && (
          <div className="flex">
            <div className="flex-none basis-30" />
            <p
              id="quantity-error"
              role="alert"
              className="text-sm text-destructive"
            >
              Stock is not sufficient
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <AddToCartButton
          quantity={quantity}
          isAuthenticated={isAuthenticated}
          product={{ ...product, imageUrl: product.imageUrls[0] }}
        />
        <Button variant="default" className="h-12 px-15 text-base">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
