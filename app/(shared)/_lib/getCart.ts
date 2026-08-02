import prisma from "@/lib/prisma";
import { Cart, CartItem } from "../_types/cart";
import { reconcileCart } from "@/app/generated/prisma/sql";

export const getCart = async (userId: string) => {
  const reconcileResult = await prisma.$queryRawTyped(reconcileCart(userId));
  const [rawCart, cartItemCount] = await prisma.$transaction([
    prisma.cart.findUniqueOrThrow({
      where: { userId },
      select: {
        items: {
          select: {
            product: {
              select: {
                id: true,
                imageUrls: true,
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
        id: true,
      },
    }),
    prisma.cartItem.count({ where: { cart: { userId } } }),
  ]);

  const { deleted_items: deletedItems, updated_items: updatedItems } =
    reconcileResult[0];

  const items = rawCart.items.map((rawCartItem) => {
    const cartItem: CartItem = {
      id: rawCartItem.id,
      product: {
        id: rawCartItem.product.id,
        imageUrl: rawCartItem.product.imageUrls[0],
        name: rawCartItem.product.name,
        price: rawCartItem.product.price,
        slug: rawCartItem.product.slug,
        stock: rawCartItem.product.stock,
      },
      quantity: rawCartItem.quantity,
      isQuantityAdjusted: true,
      isFavorited: rawCartItem.product.favorites.length === 1,
    };
    return cartItem;
  });

  const cart: Cart = {
    id: rawCart.id,
    items,
    updatedItems: updatedItems ?? [],
    deletedItems: deletedItems ?? [],
    totalQuantity: cartItemCount,
    userId,
  };

  return cart;
};
