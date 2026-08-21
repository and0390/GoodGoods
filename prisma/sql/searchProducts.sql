-- @param {String} $1:query
-- @param {Int} $2:limit
SELECT
  p.id,
  p.name,
  p.slug,
  p."imageUrls",
  GREATEST(
    similarity(p.name, $1),
    similarity(c.name, $1),
    similarity(parent.name, $1),
    similarity(gp.name, $1)
  ) AS score
FROM "Product" p
LEFT JOIN "Category" c ON c.id = p."categoryId"
LEFT JOIN "Category" parent ON parent.id = c."parentId"
LEFT JOIN "Category" gp ON gp.id = parent."parentId"
WHERE
  p.name % $1
  OR c.name % $1
  OR parent.name % $1
  OR gp.name % $1
ORDER BY score DESC
LIMIT $2