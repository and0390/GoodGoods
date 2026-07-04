import { CartWithItems } from "@/app/(shared)/_types/prisma";
import prisma from "@/lib/prisma";
import { CartPreviewClient } from "./CardPreviewClient";
import { CartPreviewEmpty } from "./CartPreviewEmpty";

type CartPreviewProps = {
  userId: string;
};

export const CartPreview = async ({ userId }: CartPreviewProps) => {
  const cartWithItems: CartWithItems | null = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!cartWithItems) return <CartPreviewEmpty />;

  const totalQuantity = cartWithItems.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartPreviewClient
      cartWithItems={cartWithItems.items}
      totalQuantity={totalQuantity}
    />
  );
};
