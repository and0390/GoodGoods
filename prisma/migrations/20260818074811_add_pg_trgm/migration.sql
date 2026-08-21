-- This is an empty migration.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX product_name_trgm_idx ON "Product" USING GIN (name gin_trgm_ops);
CREATE INDEX category_name_trgm_idx ON "Category" USING GIN (name gin_trgm_ops);