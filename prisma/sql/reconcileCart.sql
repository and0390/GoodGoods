-- @param {String} $1:userId

WITH deleted_items AS (
    DELETE FROM "cart_item" ci
    USING "Product" p, "cart" c
    WHERE ci."productId" = p.id 
        AND ci."cartId" = c.id
        AND c."userId" = $1
        AND p.stock = 0
    RETURNING ci."productId" 
),
updated_items AS (
    UPDATE "cart_item" ci
    SET quantity = p.stock
    FROM "Product" p, "cart" c
    WHERE ci."productId" = p.id
        AND ci."cartId" = c.id
        AND c."userId" = $1
        AND p.stock > 0
        AND ci.quantity > p.stock
    RETURNING ci."productId" 
)
SELECT
    ARRAY(
        SELECT "productId"
        FROM deleted_items
    ) AS deleted_items,
    ARRAY(
        SELECT "productId"  
        FROM updated_items
    ) AS updated_items;
