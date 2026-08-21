"use client";

import { Cart } from "@/app/(shared)/_types/cart";
import StateComponent from "@/components/StateComponent";
import {
  HoverCard,
  HoverCardContentAnimated,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CartButton from "@/features/cart/components/CartButton";
import { IconExclamationCircle } from "@tabler/icons-react";
import React from "react";
import { TbShoppingCartSearch } from "react-icons/tb";
import CartHoverCardContentSkeleton from "../../../app/(main)/cart/_components/hover-card/CardItemListSkeleton";
import CartItemList from "../../../app/(main)/cart/_components/hover-card/CartItemList";
import { useCartQuery } from "../../../app/(main)/cart/_hooks/useCartQuery";

type CartHoverCardProps = {
  isAuthenticated: boolean;
  cart: Promise<Cart> | null;
};

export default function CartHoverCard({
  cart,
  isAuthenticated,
}: CartHoverCardProps) {
  const [openHoverCard, setOpenHoverCard] = React.useState(false);
  // if user is not logged in, just show it right away, as we're not fetching or preparing any data
  const [pausedLoading, setPausedLoading] = React.useState(isAuthenticated);

  const { isPending, data, isSuccess, refetch } = useCartQuery({
    enabled: isAuthenticated && openHoverCard,
    initialData: cart ? React.use(cart) : undefined,
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

  const href = isAuthenticated ? "/cart" : "/login?next=/cart";

  return (
    <HoverCard
      openDelay={100}
      closeDelay={200}
      open={openHoverCard}
      onOpenChange={isAuthenticated ? handleOpenHoverCard : setOpenHoverCard}
    >
      <HoverCardTrigger asChild>
        <CartButton href={href} totalQuantity={data?.totalQuantity} />
      </HoverCardTrigger>

      <HoverCardContentAnimated
        key={isLoading ? "x" : "y"} // make content remount each time loading state changes
        bodyClassName="group w-120 overflow-hidden rounded-t-none rounded-b-2xl p-0"
        contentClassName="flex w-full flex-col"
        sideOffset={74}
      >
        {(() => {
          if (!isAuthenticated)
            return (
              <StateComponent
                header="Oops, Your cart seems empty"
                className="h-fit! py-10 [&_.message-icon-container]:bg-transparent [&_.message-icon-container]:p-0 [&_.message-icon-header]:text-2xl! [&_.message-icon-header]:font-bold! [&_.message-icon-message]:leading-tight!"
                icon={<TbShoppingCartSearch className="size-30 text-primary" />}
                message="Let's fill your cart with items you like!"
                action={{
                  label: "Start shopping",
                  className: "font-semibold px-12 mt-2",
                }}
              />
            );
          if (isLoading) return <CartHoverCardContentSkeleton />;
          if (isSuccess) return <CartItemList cart={data} />;

          return (
            <StateComponent
              header="Looks like something isn't quite right"
              className="h-fit! py-10 [&_.message-icon-container]:bg-transparent [&_.message-icon-container]:p-0 [&_.message-icon-header]:text-2xl! [&_.message-icon-header]:font-bold! [&_.message-icon-message]:max-w-sm [&_.message-icon-message]:leading-tight!"
              icon={
                <IconExclamationCircle
                  stroke={2}
                  className="size-30 text-destructive"
                />
              }
              message="Please check your internet connection and try again later"
              action={{
                label: "Try again",
                onClick: () => refetch(),
                className: "font-semibold px-12 mt-2",
              }}
            />
          );
        })()}
      </HoverCardContentAnimated>
    </HoverCard>
  );
}
