"use client";

import { CartItem } from "@/app/(shared)/_types/cart";
import {
  HoverCard,
  HoverCardSlideToTopContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useCartQuery } from "../../_hooks/useCartQuery";
import { CartPreview } from "./CartPreview";
import { CartHoverCardHeader } from "./CartHoverCardHeader";
import { DefaultError } from "@tanstack/react-query";

type CartHoverCardClient = {
  triggerContent: React.ReactNode;
  isAuthenticated: boolean;
};

export const CartHoverCardClient = ({
  triggerContent,
  isAuthenticated,
}: CartHoverCardClient) => {
  const [openHoverCard, setOpenHoverCard] = React.useState(false);

  // if user is not logged in, just show it right away, as we're not fetching or preparing any data
  const [pausedLoading, setPausedLoading] = React.useState(isAuthenticated);

  const {
    isPending,
    data: rawData,
    isError,
  } = useCartQuery<DefaultError, CartItem[]>({
    select: (data) => data.items,
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

  const data = rawData ?? [];

  return (
    <HoverCard
      openDelay={100}
      closeDelay={200}
      open={openHoverCard}
      onOpenChange={isAuthenticated ? handleOpenHoverCard : setOpenHoverCard}
    >
      <HoverCardTrigger asChild>{triggerContent}</HoverCardTrigger>

      <HoverCardSlideToTopContent
        key={Number(isLoading)} // make content remount each time loading state changes
        className="flex w-110 flex-col rounded-t-none p-0"
        sideOffset={55}
      >
        <CartHoverCardHeader
          cartItems={data}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
        <Separator />
        <CartPreview
          isError={isError}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          cartItems={data}
        />
      </HoverCardSlideToTopContent>
    </HoverCard>
  );
};
