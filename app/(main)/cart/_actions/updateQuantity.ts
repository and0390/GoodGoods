"use server";

import { getCart } from "@/app/(shared)/_lib/getCart";
import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";
import { Cart } from "@/app/(shared)/_types/cart";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import z from "zod";

export const updateQuantity = actionClient
  .inputSchema(z.tuple([idSchema, z.int().nonnegative()]))
  .action(async ({ parsedInput, ctx }): Promise<ActionResponseData<Cart>> => {
    const [cartItemId, quantity] = parsedInput;
    const userId = ctx.user.id;

    const { count } = await prisma.cartItem.updateMany({
      where: {
        cart: { userId },
        id: cartItemId,
        product: { stock: { gte: quantity } },
      },
      data: { quantity },
    });

    if (count === 0) {
      return {
        success: false,
        message: "Unable to update quantity",
      };
    }

    return {
      success: true,
      message: "Quantity was updated successfully",
      body: await getCart(userId),
    };
  });
