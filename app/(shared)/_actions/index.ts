"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function updateCartItemQuantity(
  productId: string,
  quantity: number
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (!cartItem) {
    throw new Error("Item not found");
  }

  const updatedQuantity = cartItem.quantity + quantity;

  if (updatedQuantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: updatedQuantity },
    });
  }

  return { success: true };
}
