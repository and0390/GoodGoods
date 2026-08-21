import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const MIN_PROMOTION_FIELDS_TO_COMPUTE: Prisma.PromotionSelect = {
  value: true,
  name: true,
  minPurchase: true,
  type: true,
  source: true,
  maxDiscount: true,
  categoryId: true,
};

export const WHERE_ACTIVE_PROMOTIONS: Prisma.PromotionWhereInput = {
  isActive: true,
  endDate: { gte: new Date() },
  startDate: { lte: new Date() },
  OR: [
    { usageLimit: null },
    { usedCount: { lt: prisma.promotion.fields.usageLimit } },
  ],
};
