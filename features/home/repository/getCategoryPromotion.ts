import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import "server-only";

export default async function getCategoryPromotion<
  T extends Prisma.PromotionSelect,
>({
  where,
  select,
}: {
  where: Pick<Prisma.PromotionWhereInput, "category">;
  select: T;
}) {
  return await prisma.promotion.findMany({
    where,
    select,
  });
}
