import getPersonalizedFeed from "./getPersonalizedFeed";

export default async function getHomeFeed({
  cursor,
  category,
  limit,
  userId,
  anonymousId,
}: {
  cursor: string | null;
  limit: number;
  category: string | null;
  userId: string | null;
  anonymousId: string | null;
}) {
  const finalCategory = category === "for-you" ? null : category;

  return getPersonalizedFeed({
    userId,
    anonymousId,
    category: finalCategory,
    cursor,
    limit,
  });
}
