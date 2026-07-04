import prisma from "@/lib/prisma";
import { cache } from "react";

export const getCartWithItems = cache(async (userId: string) => {
  return await prisma.cartItem.findMany({
    where: { cart: { userId } },
    include: { product: true },
  });
});
