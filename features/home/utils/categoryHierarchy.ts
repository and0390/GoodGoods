type CategoryTree = {
  id: string;
  parent: CategoryTree | null;
};

export function getCategoryHierarchyIds<T extends CategoryTree>(
  categoryTree: T
) {
  return [
    categoryTree.id,
    categoryTree.parent?.id,
    categoryTree.parent?.parent?.id,
  ].filter((id): id is string => Boolean(id));
}

export default function getDistinctCategoryIds<T extends CategoryTree>(
  categoryTree: T[]
) {
  return [
    ...new Set(
      categoryTree.flatMap((tree) => {
        return getCategoryHierarchyIds(tree);
      })
    ),
  ];
}
