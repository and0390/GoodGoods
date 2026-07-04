import prisma from "@/lib/prisma";
import { Cart, CartItem } from "../_types/cart";

export const getCart = async (userId: string) => {
  return await prisma.cart
    .findUniqueOrThrow({
      where: { userId },
      include: {
        items: {
          select: {
            product: {
              select: {
                id: true,
                imageUrl: true,
                name: true,
                price: true,
                slug: true,
                stock: true,
                favorites: { where: { userId }, select: { id: true }, take: 1 },
              },
            },
            id: true,
            quantity: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      omit: { createdAt: true, updatedAt: true },
    })
    .then(async (rawCart) => {
      const staleItems = rawCart.items.filter(
        (item) => item.quantity > item.product.stock
      );

      await prisma.$transaction(
        staleItems.map((staleItem) =>
          prisma.cartItem.updateMany({
            where: {
              id: staleItem.id,
              cartId: rawCart.id,
              productId: staleItem.product.id,
              quantity: { gt: staleItem.product.stock },
            },
            data: { quantity: staleItem.product.stock },
          })
        )
      );

      const items = rawCart.items.map((rawCartItem) => {
        /// update quantity to the latest
        const adjustedQuantity = Math.min(
          rawCartItem.quantity,
          rawCartItem.product.stock
        );

        const cartItem: CartItem = {
          id: rawCartItem.id,
          product: {
            id: rawCartItem.product.id,
            imageUrl: rawCartItem.product.imageUrl,
            name: rawCartItem.product.name,
            price: rawCartItem.product.price,
            slug: rawCartItem.product.slug,
            stock: rawCartItem.product.stock,
          },
          quantity: adjustedQuantity,
          isQuantityAdjusted: rawCartItem.quantity > rawCartItem.product.stock,
          isFavorited: rawCartItem.product.favorites.length === 1,
        };
        return cartItem;
      });

      const totalQuantity = items.reduce(
        (acc, current) => acc + current.quantity,
        0
      );

      const cart: Cart = {
        id: rawCart.id,
        items,
        totalQuantity,
        userId,
      };

      return cart;
    });
};
