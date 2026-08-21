ALTER TABLE "Order"
ADD COLUMN IF NOT EXISTS "promotionId" TEXT,
ADD COLUMN IF NOT EXISTS "promoCode" TEXT,
ADD COLUMN IF NOT EXISTS "appliedPromotions" JSONB;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Order_promotionId_fkey'
  ) THEN
    ALTER TABLE "Order"
    ADD CONSTRAINT "Order_promotionId_fkey"
    FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;
  END IF;
END $$;
