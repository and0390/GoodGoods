import prisma from "@/lib/prisma";
import "server-only";
import getCategoryPromotion from "../../home/repository/getCategoryPromotion";
import getBestPromotion from "../utils/getBestPromotion";
import { ProductPreview } from "@/app/(shared)/_types/product";
import discountAmountToPercentage from "@/features/cart/utils/discountAmountToPercentage";

export default async function getProductsByCategory({
  cursor,
  limit = 20,
  categoryId,
}: {
  limit?: number;
  cursor?: string;
  categoryId: string;
}) {
  const now = new Date();

  const rawProducts = await prisma.product.findMany({
    where: { categoryId },
    take: limit ? limit + 1 : undefined,
    select: {
      id: true,
      price: true,
      name: true,
      imageUrls: true,
      sold: true,
      stock: true,
      slug: true,
      promotions: {
        where: {
          scope: "PRODUCT",
          isActive: true,
          endDate: { gte: now },
          startDate: { lte: now },
          OR: [
            { usageLimit: null },
            { usedCount: { lt: prisma.promotion.fields.usageLimit } },
          ],
        },
        select: {
          id: true,
          value: true,
          name: true,
          minPurchase: true,
          type: true,
          source: true,
          maxDiscount: true,
          categoryId: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          parent: {
            select: {
              id: true,
              name: true,
              parent: { select: { id: true, name: true } },
            },
          },
        },
      }, // fetch 3 levels of category
    },
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
    orderBy: {
      createdAt: "asc",
    },
  });

  const allCategoryIds = [
    ...new Set(
      rawProducts.flatMap((product) => {
        const cat = product.category;
        return [cat.id, cat.parent?.id, cat.parent?.parent?.id].filter(
          Boolean
        ) as string[];
      })
    ),
  ];

  const categoryPromos = await getCategoryPromotion({
    where: { category: { id: { in: allCategoryIds } } },
    select: {
      id: true,
      value: true,
      name: true,
      minPurchase: true,
      type: true,
      source: true,
      maxDiscount: true,
      categoryId: true,
    },
  });

  const hasMore = rawProducts.length > limit;

  if (hasMore) {
    rawProducts.pop();
  }

  const nextCursor = hasMore ? rawProducts[rawProducts.length - 1].id : null;

  const productIds = rawProducts.map((product) => product.id);

  const reviewAggregate = await prisma.review.groupBy({
    where: { productId: { in: productIds } },
    by: ["productId"],
    _avg: {
      rating: true,
    },
  });

  const reviewAggregateMap = Object.fromEntries(
    reviewAggregate.map((item) => [item.productId, item._avg.rating ?? 0])
  );

  const categoryPromoMap = new Map<string, typeof categoryPromos>();

  for (const promo of categoryPromos) {
    if (!promo.categoryId) continue;
    const existing = categoryPromoMap.get(promo.categoryId) ?? [];
    existing.push(promo);
    categoryPromoMap.set(promo.categoryId, existing);
  }

  const products = rawProducts.map((rawProduct): ProductPreview => {
    const productCatIds = [
      rawProduct.category.id,
      rawProduct.category.parent?.id,
      rawProduct.category.parent?.parent?.id,
    ].filter((id): id is string => Boolean(id));

    const matchedCatPromos = productCatIds.flatMap(
      (id) => categoryPromoMap.get(id) ?? []
    );

    const applicable = [...rawProduct.promotions, ...matchedCatPromos];

    const bestPromo = getBestPromotion(applicable, rawProduct.price);

    return {
      id: rawProduct.id,
      imageUrl: rawProduct.imageUrls[0],
      name: rawProduct.name,
      basePrice: rawProduct.price,
      slug: rawProduct.slug,
      sold: rawProduct.sold,
      stock: rawProduct.stock,
      avgRating: reviewAggregateMap[rawProduct.id] ?? 0, // fallback to 0 if the product doesn't exist in the entry (the product has no reviews yet)
      promotion: bestPromo
        ? {
            source: bestPromo.source,
            discountPercent:
              bestPromo.type === "PERCENTAGE"
                ? bestPromo.value
                : discountAmountToPercentage(
                    bestPromo.discountPrice,
                    rawProduct.price
                  ),
            finalPrice: bestPromo.finalPrice,
          }
        : null,
    };
  });

  return {
    products,
    nextCursor,
  };
}
