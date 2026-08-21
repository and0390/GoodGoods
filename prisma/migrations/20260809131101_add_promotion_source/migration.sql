-- CreateEnum
CREATE TYPE "PromotionSource" AS ENUM ('VOUCHER', 'FLASH_SALE');

-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "source" "PromotionSource";
