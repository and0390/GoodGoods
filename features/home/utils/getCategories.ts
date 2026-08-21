type CategoryTree = {
  id: string;
  parent: CategoryTree | null;
};

export default function getActiveCategoryIds<T extends CategoryTree>(
  categoryTree: T
) {
  return [
    categoryTree.id,
    categoryTree.parent?.id,
    categoryTree.parent?.parent?.id,
  ].filter((id): id is string => Boolean(id));
}
