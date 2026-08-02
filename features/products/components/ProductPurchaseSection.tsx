"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ProductDetail } from "@/shared/_types/product";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import React from "react";
import useQuantityInputGroup from "../hooks/useQuantityInputGroup";
import AddToCartButton from "./AddToCartButton";
import ShippingInformationDialog from "./ShippingInformationDialog";

type ProductPurchaseSectionProps = {
  product: ProductDetail;
  isAuthenticated: boolean;
};

export default function ProductPurchaseSection({
  product,
  isAuthenticated,
}: ProductPurchaseSectionProps) {
  const [{ quantity, isOverStock }, setQuantityState] = React.useState({
    quantity: 1,
    isOverStock: false,
  });

  const {
    inputRef,
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
    onChangeValue: (quantity, isOverStock) =>
      setQuantityState({ quantity, isOverStock }),
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
            <InputGroup className="size-auto overflow-hidden p-0 hover:border-input has-disabled:bg-transparent has-disabled:opacity-100 has-[[data-slot=input-group-control]:focus-visible]:border-input! has-[[data-slot=input-group-control]:focus-visible]:ring-0! dark:has-disabled:bg-input/30 dark:has-disabled:opacity-100">
              <InputGroupInput
                ref={inputRef}
                className="h-9 w-10 py-0 text-center"
                value={inputValue}
                id="quantityInput"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
                aria-invalid={isOverStock}
                aria-describedby={isOverStock ? "stockError" : undefined}
              />
              <InputGroupAddon
                align="inline-start"
                className="p-0 has-[>button]:ml-0"
              >
                <InputGroupButton
                  aria-label="decrease quantity"
                  title="decrease"
                  onClick={handleDecrement}
                  className="m-0! size-9 rounded-none border-0 px-0"
                  disabled={isMinReached}
                >
                  <Minus />
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                className="p-0 has-[>button]:mr-0"
              >
                <InputGroupButton
                  aria-label="increase quantity"
                  title="increase"
                  className="size-9 rounded-none border-0"
                  onClick={handleIncrement}
                  disabled={isMaxReached}
                >
                  <Plus />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
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
              id="stockError"
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
