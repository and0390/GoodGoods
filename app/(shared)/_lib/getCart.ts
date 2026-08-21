import discountAmountToPercentage from "@/features/cart/utils/discountAmountToPercentage";
import getCategoryPromotionsGroupedById from "@/features/home/repository/getCategoryPromotionsGroupedById";
import {
  MIN_PROMOTION_FIELDS_TO_COMPUTE,
  WHERE_ACTIVE_PROMOTIONS,
} from "@/features/home/utils/promotionQuery";
import getBestPromotion from "@/features/products/utils/getBestPromotion";
import prisma from "@/lib/prisma";
import { Cart, CartItem } from "../_types/cart";

export async function getCart(userId: string): Promise<Cart> {
  const [rawCart, cartItemAggregate] = await Promise.all([
    prisma.cart.findUniqueOrThrow({
      where: { userId },
      select: {
        id: true,
        items: {
          select: {
            product: {
              select: {
                id: true,
                _count: { select: { favorites: { where: { userId } } } },
                imageUrls: true,
                name: true,
                price: true,
                slug: true,
                stock: true,
                sold: true,
                category: {
                  select: {
                    id: true,
                    parent: {
                      select: { id: true, parent: { select: { id: true } } },
                    },
                  },
                },
                promotions: {
                  where: {
                    ...WHERE_ACTIVE_PROMOTIONS,
                    scope: "PRODUCT",
                  },
                  select: {
                    ...MIN_PROMOTION_FIELDS_TO_COMPUTE,
                    id: true,
                  },
                },
              },
            },
            quantity: true,
            id: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    }),
    prisma.cartItem.aggregate({
      where: { cart: { userId } },
      _sum: { quantity: true },
    }),
  ]);

  const categoryPromos = await getCategoryPromotionsGroupedById(
    rawCart.items.map((item) => item.product.category)
  );

  const items = rawCart.items.map((rawCartItem): CartItem => {
    const productCatIds = [
      rawCartItem.product.category.id,
      rawCartItem.product.category.parent?.id,
      rawCartItem.product.category.parent?.parent?.id,
    ].filter((id): id is string => !!id);

    const matchedCatPromos = productCatIds.flatMap(
      (id) => categoryPromos[id] ?? []
    );

    const applicable = [...matchedCatPromos, ...rawCartItem.product.promotions];

    const bestPromo = getBestPromotion(applicable, rawCartItem.product.price);

    return {
      id: rawCartItem.id,
      product: {
        promotion: bestPromo && {
          id: bestPromo.id,
          discountPercent:
            bestPromo.type === "FIXED_AMOUNT"
              ? discountAmountToPercentage(
                  bestPromo.discountPrice,
                  rawCartItem.product.price
                )
              : bestPromo.value,
          finalPrice: bestPromo.finalPrice,
        },
        sold: rawCartItem.product.sold,
        id: rawCartItem.product.id,
        imageUrl: rawCartItem.product.imageUrls[0],
        name: rawCartItem.product.name,
        basePrice: rawCartItem.product.price,
        slug: rawCartItem.product.slug,
        stock: rawCartItem.product.stock,
      },
      quantity: rawCartItem.quantity,
      isQuantityAdjusted: true,
      isFavoritedByUser: rawCartItem.product._count.favorites > 0,
    };
  });

  return {
    id: rawCart.id,
    items,
    totalQuantity: cartItemAggregate._sum.quantity ?? 0,
    userId,
  };
}
