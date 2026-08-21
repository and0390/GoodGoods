-- CreateTable
CREATE TABLE "UserProductView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProductView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserProductView_userId_viewedAt_idx" ON "UserProductView"("userId", "viewedAt");

-- CreateIndex
CREATE INDEX "UserProductView_productId_idx" ON "UserProductView"("productId");

-- AddForeignKey
ALTER TABLE "UserProductView" ADD CONSTRAINT "UserProductView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductView" ADD CONSTRAINT "UserProductView_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
