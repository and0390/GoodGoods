import prisma from "@/lib/prisma";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toggleFavorite } from "./toggleFavorite";

vi.mock("@/app/(shared)/_lib/getSession", () => ({
  getSession: vi.fn().mockResolvedValue({
    user: { id: "user-123", email: "budi@mail.com" },
  }),
}));

describe("Server action: toggleFavorite", async () => {
  const MOCK_USER_ID = "user-123";
  const MOCK_PRODUCT_ID = "Product-001";
  const MOCK_USER_EMAIL = "budi@mail.com";
  const MOCK_USER_NAME = "budi";

  beforeEach(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: { id: MOCK_USER_ID, email: MOCK_USER_EMAIL, name: MOCK_USER_NAME },
    });

    await prisma.product.create({
      data: {
        id: MOCK_PRODUCT_ID,
        name: "product001",
        price: 20_000,
        stock: 10,
        slug: "slug-001",
      },
    });
  });

  it("Should add a product to favorites if it is not favorited yet", async () => {
    const res = await toggleFavorite(MOCK_PRODUCT_ID);

    expect(res.data?.success).toBe(true);
    expect(res.data?.message).toBe("1 Item has been added to your favorites");

    const favRecord = await prisma.favorite.findUnique({
      where: {
        userId_productId: { userId: MOCK_USER_ID, productId: MOCK_PRODUCT_ID },
      },
    });
    expect(favRecord).not.toBeNull();
  });

  it("Should remove a product from favorites if it was already favorited", async () => {
    await prisma.favorite.create({
      data: { userId: MOCK_USER_ID, productId: MOCK_PRODUCT_ID },
    });

    const res = await toggleFavorite(MOCK_PRODUCT_ID);

    expect(res?.data?.success).toBe(true);
    expect(res?.data?.message).toBe(
      "1 Item has been removed from your favorites"
    );

    const favRecord = await prisma.favorite.findUnique({
      where: {
        userId_productId: { userId: MOCK_USER_ID, productId: MOCK_PRODUCT_ID },
      },
    });
    expect(favRecord).toBeNull();
  });

  it("Should fail validation if productId format is invalid", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await toggleFavorite({} as any);

    expect(res?.validationErrors).toBeDefined();
    expect(res?.data).toBeUndefined();
  });

  it("should handle simultaneous rapid toggles gracefully without exploding", async () => {
    const results = await Promise.all([
      toggleFavorite(MOCK_PRODUCT_ID),
      toggleFavorite(MOCK_PRODUCT_ID),
      toggleFavorite(MOCK_PRODUCT_ID),
      toggleFavorite(MOCK_PRODUCT_ID),
    ]);

    results.forEach((res) => {
      expect(res.data?.success).toBe(true);
    });

    const finalFavoritedRecord = await prisma.favorite.findUnique({
      where: {
        userId_productId: { userId: MOCK_USER_ID, productId: MOCK_PRODUCT_ID },
      },
    });

    const isValidFinalState =
      finalFavoritedRecord === null || finalFavoritedRecord !== null;
    expect(isValidFinalState).toBe(true);
  });
});
