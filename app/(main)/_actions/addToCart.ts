"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export default async function addToCart(
  productId: string,
  quantity: number = 1
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "Operation is not allowed.",
      body: null,
    };
  }

  const res = await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    });

    const cartItem = await tx.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: quantity,
      },
    });

    return {
      success: true,
      code: "SUCCESS",
      message: "Product was added successfully",
      body: cartItem,
    };
  });

  refresh();

  return res;
}
