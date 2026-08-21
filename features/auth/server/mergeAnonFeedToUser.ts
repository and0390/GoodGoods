import { getAnonId } from "@/lib/anonId";
import prisma from "@/lib/prisma";

export default async function mergeAnonFeedToUser(userId: string) {
  const anonId = await getAnonId();

  if (!anonId) return { count: 0 };

  return await prisma.userProductView.updateMany({
    where: { anonymousId: anonId },
    data: { userId, anonymousId: null },
  });
}
