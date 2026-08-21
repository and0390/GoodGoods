SELECT DISTINCT ON (search_term)
  search_term,
  p.id,
  p.name,
  p."imageUrls"
FROM unnest($1::text[]) AS search_term
JOIN "Product" p 
    ON (
        p.name ILIKE '%' || search_term || '%'
        OR p.name % search_term
    )
ORDER BY 
search_term, 
CASE
    WHEN p.name ILIKE '%' || search_term || '%' THEN 0
    ELSE 1
END,
similarity(p.name, search_term),
p.sold DESC