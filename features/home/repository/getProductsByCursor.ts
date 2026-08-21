import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import "server-only";
import {
  MIN_PROMOTION_FIELDS_TO_COMPUTE,
  WHERE_ACTIVE_PROMOTIONS,
} from "../utils/promotionQuery";

export default async function getProductsByCursor({
  where,
  limit,
  cursor,
  orderBy,
}: {
  orderBy?:
    | Prisma.ProductOrderByWithRelationInput
    | Prisma.ProductOrderByWithRelationInput[];
  where?: Prisma.ProductWhereInput;
  limit: number;
  cursor: string | null;
}) {
  return await prisma.product.findMany({
    where,
    take: limit + 1,
    select: {
      id: true,
      price: true,
      name: true,
      imageUrls: true,
      sold: true,
      stock: true,
      slug: true,
      category: {
        select: {
          id: true,
          parent: { select: { id: true, parent: { select: { id: true } } } },
        },
      },
      promotions: {
        where: {
          ...WHERE_ACTIVE_PROMOTIONS,
          scope: "PRODUCT",
        },
        select: {
          id: true,
          ...MIN_PROMOTION_FIELDS_TO_COMPUTE,
        },
      },
    },
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
    orderBy,
  });
}
