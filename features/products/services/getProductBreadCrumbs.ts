import { Category } from "@/app/(shared)/_types/category";
import { getCategoryAncestors } from "@/app/generated/prisma/sql";
import prisma from "@/lib/prisma";
import "server-only";

export default async function getProductBreadcrumbs(
  categoryId: string,
  productName: string,
  productSlug: string
): Promise<Category[]> {
  const ancestors = await prisma.$queryRawTyped(
    getCategoryAncestors(categoryId)
  );

  const orderedBreadcrumbs = ancestors
    .map((cat): Category | null => {
      if (!cat.id || !cat.name || !cat.slug) return null;
      return {
        id: cat.id,
        name: cat.name,
        slug: `/${cat.slug}`,
      };
    })
    .filter((cat): cat is Category => Boolean(cat))
    .reverse();

  return [
    ...orderedBreadcrumbs,
    { id: crypto.randomUUID(), name: productName, slug: productSlug },
  ];
}
