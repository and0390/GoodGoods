import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import "server-only";

export default async function getProductPromotion<
  T extends Prisma.PromotionSelect,
>({
  where,
  select,
}: {
  where: Pick<Prisma.PromotionWhereInput, "products">;
  select: T;
}) {
  return await prisma.promotion.findMany({
    where: {
      ...where,
      scope: "PRODUCT",
      isActive: true,
      endDate: { gte: new Date() },
      startDate: { lte: new Date() },
      OR: [
        { usageLimit: null },
        { usedCount: { lt: prisma.promotion.fields.usageLimit } },
      ],
    },
    select,
  });
}
