"use server";

import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const addToCart = actionClient
  .inputSchema(z.tuple([idSchema, z.int().nonnegative().default(1)]))
  .action(async ({ parsedInput, ctx }): Promise<ActionResponseData> => {
    const userId = ctx.user.id;
    const [productId, quantity] = parsedInput;

    const cart = await prisma.cart.findUniqueOrThrow({
      where: { userId },
      select: { id: true },
    });

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
    });

    return {
      success: true,
      message: "Product was added successfully",
      body: null,
    };
  });
