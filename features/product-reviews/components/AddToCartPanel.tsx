"use client";

import { ProductDetail } from "@/app/(shared)/_types/product";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Image from "next/image";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Minus, Plus } from "lucide-react";
import React, { useEffect } from "react";
import useQuantityInputGroup from "@/features/products/hooks/useQuantityInputGroup";
import useAddToCart from "@/features/cart/hooks/useAddToCart";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { useMediaQuery } from "usehooks-ts";
import useIsDesktop from "../../../hooks/useDesktop";
import QuantityInputGroup from "@/features/products/components/QuantityInputGroup";

type AddToCartPanelProps = {
  product: ProductDetail;
  isAuthenticated: boolean;
};

export default function AddToCartPanel({
  product,
  isAuthenticated,
}: AddToCartPanelProps) {
  const { name, stock, basePrice: price, imageUrls } = product;

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
    isOverMax: isOverStock,
    quantity,
  } = useQuantityInputGroup({
    min: 1,
    max: stock,
  });

  {
    /* lg tailwind */
  }
  const isLg = useIsDesktop();

  return (
    <Sheet key={isLg ? "desktop-close" : "mobile-open"}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-[216px] flex-1 rounded-full px-0 text-sm md:flex-none"
        >
          <IconShoppingCartPlus className="hidden lg:inline" />
          Add to Cart
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="z-70 pt-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Add to Cart</SheetTitle>
          <SheetDescription>
            Choose the quantity you want to add to your cart before confirming.
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full gap-2 px-4">
          <Image
            src={imageUrls[0]}
            alt={`${name} preview 1`}
            height={120}
            width={120}
            className="size-30 flex-none object-contain"
          />
          <div className="flex flex-1 flex-col">
            <h2 className="text-lg font-semibold text-red-700">
              {formatCurrency(price)}
            </h2>
            <p className="text-sm font-normal text-muted-foreground">
              Stock: {stock}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between px-4">
          <label htmlFor="quantityInput" className="text-sm font-normal">
            Quantity
          </label>

          <QuantityInputGroup
            className="[&_button]:size-7 [&>input]:h-7 [&>input]:w-8"
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
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <AddToCartButton
              quantity={quantity}
              isAuthenticated={isAuthenticated}
              product={{ ...product, imageUrl: imageUrls[0] }}
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
