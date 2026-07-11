 WITH RECURSIVE category_tree AS (
      SELECT id, name, slug, "parentId"
      FROM "Category"
      WHERE id = $1
      
      UNION ALL
      
      SELECT c.id, c.name, c.slug, c."parentId"
      FROM "Category" c
      INNER JOIN category_tree ct ON c.id = ct."parentId"
    )
    SELECT * FROM category_tree;