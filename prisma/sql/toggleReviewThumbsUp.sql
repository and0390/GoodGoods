WITH inserted AS (
    INSERT INTO "ReviewHelpful" ("id", "userId", "reviewId") 
    VALUES ($1, $2, $3)
    ON CONFLICT ("userId", "reviewId") DO NOTHING
    RETURNING 1
),
deleted AS (
    DELETE FROM "ReviewHelpful"
    WHERE "userId" = $2
      AND "reviewId" = $3
      AND NOT EXISTS (SELECT 1 FROM inserted)
    RETURNING 1
)
UPDATE "Review"
SET "helpfulCount" =
    "helpfulCount"
    + (SELECT COUNT(*) FROM inserted)
    - (SELECT COUNT(*) FROM deleted)
WHERE id = $3
    RETURNING 
        "helpfulCount",
        EXISTS (SELECT  1 FROM inserted) AS liked;