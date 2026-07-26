WITH inserted AS (
    INSERT INTO "Favorite" ("id", "productId", "userId")
    VALUES ($1, $2, $3)
    ON CONFLICT ("productId", "userId") DO NOTHING
    RETURNING 1
),
deleted AS (
    DELETE FROM "Favorite"
    WHERE "productId" = $2
        AND "userId" = $3
        AND NOT EXISTS (SELECT 1 FROM inserted)
    RETURNING 1
)
UPDATE "Product"
SET "favoriteCount" = 
    "favoriteCount"
    + (SELECT COUNT(*) FROM inserted)
    - (SELECT COUNT(*) FROM deleted)
WHERE id = $2 
RETURNING 
    "favoriteCount",
    EXISTS (SELECT 1 FROM inserted) AS isFavorited;