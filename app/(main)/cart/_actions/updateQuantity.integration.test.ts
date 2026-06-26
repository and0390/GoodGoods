import { describe, it, expect, beforeEach, vi } from "vitest";
import prisma from "@/lib/prisma";
import { updateQuantity } from "./updateQuantity";
import { getSession } from "@/app/(shared)/_lib/getSession";

vi.mock("next/cache", () => ({
  refresh: vi.fn(),
}));

vi.mock("@/app/(shared)/_lib/getSession", () => ({
  getSession: vi.fn().mockResolvedValue({
    user: { id: "user-123", email: "budi@mail.com" },
  }),
}));

describe("Server Action: updateQuantity", async () => {
  const MOCK_USER_ID = "user-123";
  const MOCK_PRODUCT_ID = "prod-apple";
  const MOCK_CART_ITEM_ID = "cart-item-xyz";
  const MOCK_USER_EMAIL = "budi@mail.com";
  const MOCK_USER_NAME = "budi";

  beforeEach(async () => {
    await prisma.cartItem.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.user.create({
      data: { id: MOCK_USER_ID, email: MOCK_USER_EMAIL, name: MOCK_USER_NAME },
    });

    await prisma.product.create({
      data: {
        id: MOCK_PRODUCT_ID,
        name: "product-001",
        price: 20_000,
        stock: 10,
        slug: "slug-001",
      },
    });

    await prisma.cart.create({
      data: {
        id: "cart-123",
        userId: MOCK_USER_ID,
        items: {
          create: {
            id: MOCK_CART_ITEM_ID,
            productId: MOCK_PRODUCT_ID,
            quantity: 1,
          },
        },
      },
    });
  });

  it("should successfully update quantity when stock is sufficient", async () => {
    const res = await updateQuantity([MOCK_CART_ITEM_ID, 5]);

    expect(res.data?.success).toBe(true);
    expect(res?.data?.message).toContain("successfully");

    const updatedItem = await prisma.cartItem.findUnique({
      where: { id: MOCK_CART_ITEM_ID },
    });
    expect(updatedItem?.quantity).toBe(5);
  });

  it("Should fail when requested quantity exceeds product stock", async () => {
    const res = await updateQuantity([MOCK_CART_ITEM_ID, 12]);

    expect(res.data?.success).toBe(false);
    expect(res.data?.message).toBe("Unable to update quantity");

    const currentItem = await prisma.cartItem.findUnique({
      where: { id: MOCK_CART_ITEM_ID },
    });
    expect(currentItem?.quantity).toBe(1);
  });

  it("Should fail if the cart item belongs to another user", async () => {
    const currentDate = new Date();

    const fourMonthsAgo = new Date(currentDate);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    vi.mocked(getSession).mockResolvedValueOnce({
      user: {
        id: "stranger-001",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const res = await updateQuantity([MOCK_CART_ITEM_ID, 5]);

    expect(res.data?.success).toBe(false);
    expect(res.data?.message).toBe("Unable to update quantity");

    const currentItem = await prisma.cartItem.findUnique({
      where: { id: MOCK_CART_ITEM_ID },
    });

    expect(currentItem?.quantity).toBe(1);
  });

  it("Should fail validation if quantity is negative", async () => {
    const res = await updateQuantity([MOCK_CART_ITEM_ID, -5]);

    expect(res?.validationErrors).toBeDefined();
    expect(res?.data).toBeUndefined();
  });
});
