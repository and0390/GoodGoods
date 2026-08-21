-- @param {Int} $1:limit
WITH ranked_products AS (
  SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.price,
    p.slug,
    p."imageUrls",
    p."favoriteCount",
    
    c1.id AS category_id,
    c1.name AS category_name,
    
    c2.id AS parent_category_id,
    c2.name AS parent_category_name,
    
    c3.id AS grandparent_category_id,
    c3.name AS grandparent_category_name,
    
    COALESCE(c3.id, c2.id, c1.id) AS root_category_id,
    
    ROW_NUMBER() OVER (
      PARTITION BY COALESCE(c3.id, c2.id, c1.id)
      ORDER BY p."favoriteCount" DESC
    ) AS rn
  FROM "Product" p
  INNER JOIN "Category" c1 ON p."categoryId" = c1.id
  LEFT JOIN "Category" c2 ON c1."parentId" = c2.id
  LEFT JOIN "Category" c3 ON c2."parentId" = c3.id
  WHERE EXISTS (
    SELECT 1 FROM "Promotion" promo
    WHERE promo.scope = 'CATEGORY'
      AND promo.type = 'PERCENTAGE'
      AND promo."categoryId" IN (c1.id, c2.id, c3.id)
      AND promo."isActive" = true
      AND promo."startDate" <= NOW()
      AND promo."endDate" >= NOW()
      AND p.price >= promo."minPurchase"
  )
)
SELECT 
  product_id,
  product_name,
  price,
  slug,
  "imageUrls",
  category_id,
  category_name,
  parent_category_id,
  parent_category_name,
  grandparent_category_id,
  grandparent_category_name
FROM ranked_products
WHERE rn = 1
ORDER BY "favoriteCount" DESC
LIMIT $1;