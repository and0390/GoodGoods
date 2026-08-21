-- CreateEnum
CREATE TYPE "PromotionScope" AS ENUM ('PRODUCT', 'CATEGORY', 'PLATFORM_WIDE');

-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "scope" "PromotionScope" NOT NULL DEFAULT 'PRODUCT';

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
