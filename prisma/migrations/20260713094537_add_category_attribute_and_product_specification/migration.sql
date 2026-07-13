-- CreateTable
CREATE TABLE "CategoryAttribute" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CategoryAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSpecification" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeTemplateId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryAttribute_categoryId_idx" ON "CategoryAttribute"("categoryId");

-- CreateIndex
CREATE INDEX "ProductSpecification_productId_idx" ON "ProductSpecification"("productId");

-- CreateIndex
CREATE INDEX "ProductSpecification_attributeTemplateId_idx" ON "ProductSpecification"("attributeTemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSpecification_productId_attributeTemplateId_key" ON "ProductSpecification"("productId", "attributeTemplateId");

-- AddForeignKey
ALTER TABLE "CategoryAttribute" ADD CONSTRAINT "CategoryAttribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_attributeTemplateId_fkey" FOREIGN KEY ("attributeTemplateId") REFERENCES "CategoryAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
