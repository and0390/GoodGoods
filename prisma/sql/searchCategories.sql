-- @param {String} $1:query
-- @param {Int} $2:limit
SELECT
  id,
  name,
  slug,
  similarity(name, $1) AS score
FROM "Category"
WHERE name % $1
ORDER BY score DESC
LIMIT $2