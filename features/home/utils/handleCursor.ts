export default function handleCursor<T extends { id: string }>(
  items: T[],
  limit: number
) {
  const hasMore = items.length > limit;
  if (hasMore) items.pop();
  const nextCursor = hasMore ? items[items.length - 1].id : null;
  return { items, nextCursor };
}
