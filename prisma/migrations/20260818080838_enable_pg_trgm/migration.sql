
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product" USING GIN ("name" gin_trgm_ops);
