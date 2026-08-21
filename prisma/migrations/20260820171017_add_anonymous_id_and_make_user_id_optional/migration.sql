-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UserProductView" ADD COLUMN     "anonymousId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
