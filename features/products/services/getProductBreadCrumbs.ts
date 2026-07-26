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
    .map((cat) => {
      const category: Category = {
        id: cat.id!,
        name: cat.name!,
        slug: `/${cat.slug!}`,
      };
      return category;
    })
    .reverse();

  return [
    ...orderedBreadcrumbs,
    { id: crypto.randomUUID(), name: productName, slug: productSlug },
  ];
}
