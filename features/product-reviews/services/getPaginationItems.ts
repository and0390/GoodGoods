type PaginationItem = number | "ellipsis";

export default function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PaginationItem[] = [];

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  items.push(1);

  if (leftSibling > 2) {
    items.push("ellipsis");
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    items.push(page);
  }

  if (rightSibling < totalPages - 1) {
    items.push("ellipsis");
  }

  return items;
}
