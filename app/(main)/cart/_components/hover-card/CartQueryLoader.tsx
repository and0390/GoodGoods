"use client";

import {
  HoverCard,
  HoverCardContentAnimated,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useCartQuery } from "../../_hooks/useCartQuery";
import CartItemListSkeleton from "./CardItemListSkeleton";
import CartHeader, { CartHoverCardHeaderSkeleton } from "./CartHeader";
import { CartPreviewEmpty } from "../CartPreviewEmpty";
import { CartPreviewError } from "../CartPreviewError";
import CartItemList from "./CartItemList";

type CartHoverCardClient = {
  triggerContent: React.ReactNode;
  isAuthenticated: boolean;
};

const CartQueryLoader = ({
  triggerContent,
  isAuthenticated,
}: CartHoverCardClient) => {
  const [openHoverCard, setOpenHoverCard] = React.useState(false);
  // if user is not logged in, just show it right away, as we're not fetching or preparing any data
  const [pausedLoading, setPausedLoading] = React.useState(isAuthenticated);

  const {
    isPending,
    data: cart,
    isSuccess,
  } = useCartQuery({
    enabled: isAuthenticated && openHoverCard,
  });

  const handleOpenHoverCard = (value: boolean) => {
    setOpenHoverCard(value);

    if (value) {
      setTimeout(() => setPausedLoading(false), 500);
    } else {
      setPausedLoading(true);
    }
  };

  const isLoading = isPending || pausedLoading;

  return (
    <HoverCard
      openDelay={100}
      closeDelay={200}
      open={openHoverCard}
      onOpenChange={isAuthenticated ? handleOpenHoverCard : setOpenHoverCard}
    >
      <HoverCardTrigger asChild>{triggerContent}</HoverCardTrigger>

      <HoverCardContentAnimated
        key={Number(isLoading)} // make content remount each time loading state changes
        bodyClassName="group w-110 overflow-hidden rounded-t-none rounded-b-2xl p-0"
        contentClassName="flex w-full flex-col"
        sideOffset={55}
      >
        {!isAuthenticated ? null : isLoading ? (
          <CartHoverCardHeaderSkeleton />
        ) : isSuccess ? (
          <CartHeader totalQuantity={cart.totalQuantity} />
        ) : (
          <CartPreviewError />
        )}
        <Separator />
        {!isAuthenticated ? (
          <CartPreviewEmpty />
        ) : isLoading ? (
          <CartItemListSkeleton />
        ) : isSuccess ? (
          <CartItemList cartItems={cart.items} />
        ) : (
          <CartPreviewError />
        )}
      </HoverCardContentAnimated>
    </HoverCard>
  );
};

export default CartQueryLoader;
