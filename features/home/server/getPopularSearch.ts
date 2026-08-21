import { PopularSearch } from "@/app/(shared)/_types/search";
import { getRepresentativeProduct } from "@/app/generated/prisma/sql/getRepresentativeProduct";
import prisma from "@/lib/prisma";

export default async function getPopularSearch(limit: number) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const popular = await prisma.searchLog.groupBy({
    by: ["query"],
    where: { createdAt: { gte: sevenDaysAgo } },
    _count: { query: true },
    orderBy: {
      _count: {
        query: "desc",
      },
    },
    take: limit,
  });

  const products = await prisma.$queryRawTyped(
    getRepresentativeProduct(popular.map(({ query }) => query))
  );

  const imageMap = Object.fromEntries(
    products.map((p) => [p.search_term, p.imageUrls![0]])
  );

  return popular.map(
    (p): PopularSearch => ({ query: p.query, imageUrl: imageMap[p.query] })
  );
}
