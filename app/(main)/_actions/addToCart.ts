"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.int().nonnegative().default(1),
});

export const addToCart = actionClient
  .inputSchema(addToCartSchema)
  .action(async ({ parsedInput: { quantity, productId }, ctx }) => {
    const cart = await prisma.cart.findUniqueOrThrow({
      where: { userId: ctx.user.id },
      select: { id: true },
    });

    const res = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
      select: {
        quantity: true,
      },
    });

    return {
      quantity: res.quantity,
    };
  });
