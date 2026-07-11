/*
  Warnings:

  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weight" INTEGER;

UPDATE "Product"
SET "weight" = 0
WHERE "weight" IS NULL;

ALTER TABLE "Product"
ALTER COLUMN "weight" SET NOT NULL;
