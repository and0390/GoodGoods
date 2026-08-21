import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import "server-only";
import { MIN_PROMOTION_FIELDS_TO_COMPUTE } from "../utils/promotionQuery";

export default async function getCategoryPromotionsGroupedById({
  where,
}: {
  where?: Prisma.PromotionWhereInput;
}) {
  const categoryPromos = await prisma.promotion.findMany({
    where,
    select: {
      id: true,
      ...MIN_PROMOTION_FIELDS_TO_COMPUTE,
    },
  });

  const categoryPromoMap: Record<string, typeof categoryPromos> = {};
  for (const promo of categoryPromos) {
    if (!promo.categoryId) continue;
    const existing = categoryPromoMap[promo.categoryId] ?? [];
    existing.push(promo);
    categoryPromoMap[promo.categoryId] = existing;
  }

  return categoryPromoMap;
}
