import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import pg from "pg";
import {
  Prisma,
  PrismaClient,
  DiscountType,
  PromotionSource,
  PromotionScope,
} from "../app/generated/prisma/client";
import { categories } from "./categorySeed";
import { categoryConfigs } from "./productSeed";
import { attributeTemplates } from "./productSpecification";
import { mockUsers } from "./userSeed";
import { positiveReviews, neutralReviews, negativeReviews } from "./reviewSeed";
import {
  generateProductsForCategories,
  generateReviewsForProducts,
  runInBatches,
  ProductSeed,
  ReviewSeed,
} from "./seedFactories";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

// Configure scale of products per category from environment variable or default to 10
const PRODUCTS_PER_CATEGORY = process.env.SEED_PRODUCTS_PER_CATEGORY
  ? parseInt(process.env.SEED_PRODUCTS_PER_CATEGORY, 10)
  : 10;

const ORDERS_PER_USER_MIN = process.env.SEED_ORDERS_PER_USER_MIN
  ? parseInt(process.env.SEED_ORDERS_PER_USER_MIN, 10)
  : 3;

const ORDERS_PER_USER_MAX = process.env.SEED_ORDERS_PER_USER_MAX
  ? parseInt(process.env.SEED_ORDERS_PER_USER_MAX, 10)
  : 8;

const ORDER_ITEMS_MAX = process.env.SEED_ORDER_ITEMS_MAX
  ? parseInt(process.env.SEED_ORDER_ITEMS_MAX, 10)
  : 5;

async function cleanDatabase() {
  console.log("Cleaning up existing database records (excluding Banners)...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.reviewHelpful.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.searchLog.deleteMany();

  // NOTE: Banners are kept completely untouched as requested

  await prisma.promotion.deleteMany();
  await prisma.product.deleteMany();
  await prisma.categoryAttribute.deleteMany();

  // Break category self-relation parent-child loop to delete categories safely
  await prisma.category.updateMany({ data: { parentId: null } });
  await prisma.category.deleteMany();

  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleanup completed successfully.");
}

async function seedUser(prisma: PrismaClient) {
  console.log(`Seeding ${mockUsers.length} users...`);
  const tasks = mockUsers.map(
    (user) => () =>
      prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        },
      })
  );
  await runInBatches(tasks, 50);
}

async function seedCategories(prisma: PrismaClient) {
  console.log(
    `Seeding ${categories.length} categories (root and nested levels)...`
  );

  // 1. Root categories (parentId = null)
  const roots = categories.filter((c) => !c.parentId);
  for (const cat of roots) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
      },
    });
  }

  // 2. Subcategories (Level 1)
  const level1 = categories.filter(
    (c) => c.parentId && roots.some((r) => r.id === c.parentId)
  );
  for (const cat of level1) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
        parentId: cat.parentId,
      },
    });
  }

  // 3. Subcategories (Level 2 - Leaves)
  const level2 = categories.filter(
    (c) => c.parentId && level1.some((l1) => l1.id === c.parentId)
  );
  for (const cat of level2) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
        parentId: cat.parentId,
      },
    });
  }

  console.log(
    `Seeding ${attributeTemplates.length} category attribute templates...`
  );
  const attrTasks = attributeTemplates.map(
    (attr) => () =>
      prisma.categoryAttribute.create({
        data: {
          id: attr.id,
          name: attr.name,
          categoryId: attr.categoryId,
          isRequired: true,
        },
      })
  );
  await runInBatches(attrTasks, 50);
}

async function seedProducts(prisma: PrismaClient, products: ProductSeed[]) {
  console.log(`Seeding ${products.length} products to database in batches...`);
  const tasks = products.map(
    (product) => () =>
      prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrls: product.imageUrls,
          slug: product.slug,
          stock: product.stock,
          weight: product.weight,
          sold: product.sold,
          category: { connect: { id: product.category } },
        },
      })
  );
  await runInBatches(tasks, 40);
}

async function seedSpecifications(
  prisma: PrismaClient,
  products: ProductSeed[]
) {
  console.log("Seeding product specification values in batches...");
  const specTasks: Array<() => Promise<unknown>> = [];

  for (const product of products) {
    const templates = attributeTemplates.filter(
      (t) => t.categoryId === product.category
    );

    for (const t of templates) {
      const randomValue = faker.helpers.arrayElement(t.pool);
      specTasks.push(() =>
        prisma.productSpecification.create({
          data: {
            productId: product.id,
            attributeTemplateId: t.id,
            value: randomValue,
          },
        })
      );
    }
  }

  await runInBatches(specTasks, 50);
}

async function seedReviews(prisma: PrismaClient, reviews: ReviewSeed[]) {
  console.log(`Seeding ${reviews.length} ratings and reviews in batches...`);
  const reviewTasks = reviews.map(
    (review) => () =>
      prisma.review.create({
        data: {
          id: review.id,
          rating: review.rating,
          content: review.content,
          productId: review.productId,
          userId: review.userId,
          helpfulCount: review.helpfulCount,
          imageUrls: review.imageUrls,
        },
      })
  );
  await runInBatches(reviewTasks, 40);

  console.log("Seeding review helpful votes in batches...");
  const helpfulTasks: Array<() => Promise<unknown>> = [];

  for (const rev of reviews) {
    const votingUsers = mockUsers.filter((u) => u.id !== rev.userId);
    const votesCount = faker.number.int({
      min: 0,
      max: Math.min(3, votingUsers.length),
    });
    const chosenVoters = faker.helpers.arrayElements(votingUsers, votesCount);

    for (const voter of chosenVoters) {
      helpfulTasks.push(() =>
        prisma.reviewHelpful.create({
          data: {
            userId: voter.id,
            reviewId: rev.id,
          },
        })
      );
    }
  }

  await runInBatches(helpfulTasks, 50);
}

async function seedSearchLog(
  prisma: PrismaClient,
  products: ProductSeed[],
  limit = 50
) {
  for (const { name } of products.slice(0, limit)) {
    await prisma.searchLog.create({
      data: { query: name },
    });
  }
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function calculatePromotionDiscount(
  subtotal: number,
  promotion: {
    type: DiscountType;
    value: number;
    maxDiscount: number | null;
  }
): number {
  const rawDiscount =
    promotion.type === DiscountType.PERCENTAGE
      ? Math.floor((subtotal * promotion.value) / 100)
      : promotion.value;

  const cappedByMax =
    promotion.maxDiscount && promotion.maxDiscount > 0
      ? Math.min(rawDiscount, promotion.maxDiscount)
      : rawDiscount;

  return clampNumber(cappedByMax, 0, subtotal);
}

function generateOrderNumber(sequence: number, createdAt: Date): string {
  const y = createdAt.getFullYear();
  const m = String(createdAt.getMonth() + 1).padStart(2, "0");
  const d = String(createdAt.getDate()).padStart(2, "0");
  const serial = String(sequence).padStart(5, "0");
  return `GG${y}${m}${d}${serial}`;
}

function buildPromotionCode(prefix: string, index: number): string {
  const suffix = String(index + 1).padStart(3, "0");
  const random = faker.string.alphanumeric({ length: 4, casing: "upper" });
  return `${prefix}-${suffix}-${random}`;
}

async function seedPromotions(prisma: PrismaClient) {
  console.log(
    "Seeding promotions with controlled ratio and realistic scopes..."
  );

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      categoryId: true,
      price: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      parentId: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (products.length === 0 || categories.length === 0) {
    console.log(
      "Skipping promotion seed: products or categories not available."
    );
    return;
  }

  const configuredTotal = process.env.SEED_PROMOTIONS_TOTAL
    ? parseInt(process.env.SEED_PROMOTIONS_TOTAL, 10)
    : Math.round(products.length * 0.08);

  const totalPromotions = clampNumber(configuredTotal, 20, 200);

  // Target ratios requested:
  // - source: 60% voucher, 40% flash sale
  // - scope: 40% category, 10% platform-wide, 50% product
  const targetVoucherCount = Math.round(totalPromotions * 0.6);
  const targetFlashCount = totalPromotions - targetVoucherCount;

  const targetCategoryCount = Math.round(totalPromotions * 0.4);
  const targetPlatformWideCount = Math.max(
    1,
    Math.round(totalPromotions * 0.1)
  );
  const targetProductCount =
    totalPromotions - targetCategoryCount - targetPlatformWideCount;

  const promotionSkeletons: Array<{
    source: PromotionSource;
    scope: PromotionScope;
  }> = [];

  let remainingVoucher = targetVoucherCount;
  let remainingFlash = targetFlashCount;

  const pushSkeleton = (
    scope: PromotionScope,
    preferredSource?: PromotionSource
  ) => {
    let source: PromotionSource;

    if (preferredSource === PromotionSource.VOUCHER && remainingVoucher > 0) {
      source = PromotionSource.VOUCHER;
    } else if (
      preferredSource === PromotionSource.FLASH_SALE &&
      remainingFlash > 0
    ) {
      source = PromotionSource.FLASH_SALE;
    } else if (remainingVoucher === 0) {
      source = PromotionSource.FLASH_SALE;
    } else if (remainingFlash === 0) {
      source = PromotionSource.VOUCHER;
    } else {
      const voucherProbability =
        remainingVoucher / (remainingVoucher + remainingFlash);
      source =
        faker.number.float({ min: 0, max: 1 }) < voucherProbability
          ? PromotionSource.VOUCHER
          : PromotionSource.FLASH_SALE;
    }

    if (source === PromotionSource.VOUCHER) {
      remainingVoucher -= 1;
    } else {
      remainingFlash -= 1;
    }

    promotionSkeletons.push({ source, scope });
  };

  for (let i = 0; i < targetPlatformWideCount; i++) {
    pushSkeleton(PromotionScope.PLATFORM_WIDE, PromotionSource.VOUCHER);
  }

  for (let i = 0; i < targetCategoryCount; i++) {
    pushSkeleton(PromotionScope.CATEGORY);
  }

  for (let i = 0; i < targetProductCount; i++) {
    pushSkeleton(PromotionScope.PRODUCT);
  }

  for (let i = 0; i < promotionSkeletons.length; i++) {
    const skeleton = promotionSkeletons[i];
    const startDate = faker.date.recent({ days: 15 });
    const endDate = faker.date.soon({ days: 45, refDate: startDate });

    const isVoucher = skeleton.source === PromotionSource.VOUCHER;
    const isPercentage = isVoucher
      ? faker.number.int({ min: 1, max: 100 }) <= 45
      : true;

    const value = isPercentage
      ? faker.number.int({ min: 10, max: 35 })
      : faker.helpers.arrayElement([
          15000, 20000, 25000, 30000, 50000, 75000, 100000,
        ]);

    const minPurchase = faker.helpers.arrayElement([
      50000, 75000, 100000, 150000, 200000, 300000, 500000, 750000,
    ]);

    const usageLimit = faker.helpers.arrayElement([
      100, 250, 500, 1000, 2000, 5000,
    ]);

    const usedCount = faker.number.int({
      min: 0,
      max: Math.floor(usageLimit * 0.8),
    });

    const maxDiscount =
      isPercentage || faker.number.int({ min: 1, max: 100 }) <= 35
        ? faker.helpers.arrayElement([30000, 50000, 75000, 100000, 150000])
        : null;

    const scopeLabel =
      skeleton.scope === PromotionScope.PRODUCT
        ? "Product"
        : skeleton.scope === PromotionScope.CATEGORY
          ? "Category"
          : "Platform";

    const sourceLabel =
      skeleton.source === PromotionSource.VOUCHER ? "Voucher" : "Flash Sale";

    const promotionData: Parameters<typeof prisma.promotion.create>[0]["data"] =
      {
        name: `${scopeLabel} ${sourceLabel} #${String(i + 1).padStart(3, "0")}`,
        code: isVoucher
          ? buildPromotionCode(
              skeleton.scope === PromotionScope.PLATFORM_WIDE
                ? "GLB"
                : skeleton.scope === PromotionScope.CATEGORY
                  ? "CAT"
                  : "PRD",
              i
            )
          : null,
        value,
        minPurchase,
        maxDiscount,
        usageLimit,
        usedCount,
        type: isPercentage
          ? DiscountType.PERCENTAGE
          : DiscountType.FIXED_AMOUNT,
        scope: skeleton.scope,
        startDate,
        endDate,
        isActive: true,
        source: skeleton.source,
      };

    if (skeleton.scope === PromotionScope.CATEGORY) {
      const selectedCategory = faker.helpers.arrayElement(categories);
      promotionData.category = {
        connect: {
          id: selectedCategory.id,
        },
      };
    }

    if (skeleton.scope === PromotionScope.PRODUCT) {
      const totalConnected = faker.number.int({ min: 1, max: 8 });
      const selectedProducts = faker.helpers.arrayElements(
        products,
        totalConnected
      );
      promotionData.products = {
        connect: selectedProducts.map((product) => ({ id: product.id })),
      };
    }

    await prisma.promotion.create({ data: promotionData });
  }

  const sourceSummary = await prisma.promotion.groupBy({
    by: ["source"],
    _count: true,
  });

  const scopeSummary = await prisma.promotion.groupBy({
    by: ["scope"],
    _count: true,
  });

  console.log("Promotion source distribution:", sourceSummary);
  console.log("Promotion scope distribution:", scopeSummary);
}

async function seedOrders(prisma: PrismaClient) {
  console.log("Seeding realistic orders and order items...");

  const orderColumns = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Order'
  `;

  const orderColumnSet = new Set(orderColumns.map((col) => col.column_name));
  const hasPromotionIdColumn = orderColumnSet.has("promotionId");
  const hasPromoCodeColumn = orderColumnSet.has("promoCode");
  const hasAppliedPromotionsColumn = orderColumnSet.has("appliedPromotions");

  if (
    !hasPromotionIdColumn ||
    !hasPromoCodeColumn ||
    !hasAppliedPromotionsColumn
  ) {
    console.warn(
      "Order promotion columns are partially missing in DB. Seed will continue with fallback fields only."
    );
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      imageUrls: true,
      price: true,
      categoryId: true,
    },
  });

  const promotions = await prisma.promotion.findMany({
    where: { isActive: true },
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  if (users.length === 0 || products.length === 0) {
    console.log("Skipping order seed: users or products are not available.");
    return;
  }

  const orderTasks: Array<() => Promise<unknown>> = [];
  let sequence = 1;

  for (const user of users) {
    const orderCount = faker.number.int({
      min: ORDERS_PER_USER_MIN,
      max: Math.max(ORDERS_PER_USER_MIN, ORDERS_PER_USER_MAX),
    });

    for (let i = 0; i < orderCount; i++) {
      orderTasks.push(async () => {
        const createdAt = faker.date.recent({ days: 21 });
        const chosenCount = faker.number.int({
          min: 1,
          max: Math.min(ORDER_ITEMS_MAX, 8),
        });

        const selectedProducts = faker.helpers.arrayElements(
          products,
          chosenCount
        );

        const items = selectedProducts.map((product) => {
          const quantity = faker.number.int({ min: 1, max: 4 });
          const priceShiftRate = faker.number.float({ min: -0.08, max: 0.05 });
          const finalPrice = Math.max(
            1000,
            Math.round((product.price * (1 + priceShiftRate)) / 1000) * 1000
          );
          return {
            productId: product.id,
            productName: product.name,
            productImage: product.imageUrls[0] ?? "",
            quantity,
            price: finalPrice,
            totalPrice: finalPrice * quantity,
            categoryId: product.categoryId,
          };
        });

        const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

        const shippingFee =
          subtotal >= 700000
            ? faker.helpers.arrayElement([0, 9000, 12000])
            : subtotal >= 300000
              ? faker.helpers.arrayElement([9000, 12000, 15000, 18000])
              : faker.helpers.arrayElement([15000, 18000, 20000, 25000]);

        const categoryIds = new Set(items.map((item) => item.categoryId));
        const productIds = new Set(items.map((item) => item.productId));

        const applicablePromotions = promotions.filter((promotion) => {
          if (subtotal < promotion.minPurchase) {
            return false;
          }

          if (
            createdAt < promotion.startDate ||
            createdAt > promotion.endDate
          ) {
            return false;
          }

          if (promotion.scope === PromotionScope.PLATFORM_WIDE) {
            return true;
          }

          if (promotion.scope === PromotionScope.CATEGORY) {
            return (
              !!promotion.categoryId && categoryIds.has(promotion.categoryId)
            );
          }

          if (promotion.scope === PromotionScope.PRODUCT) {
            return promotion.products.some((promotionProduct) =>
              productIds.has(promotionProduct.id)
            );
          }

          return false;
        });

        const shouldApplyPromotion =
          applicablePromotions.length > 0 &&
          faker.number.int({ min: 1, max: 100 }) <= 68;

        const selectedPromotion = shouldApplyPromotion
          ? faker.helpers.arrayElement(applicablePromotions)
          : null;

        const discount = selectedPromotion
          ? calculatePromotionDiscount(subtotal, selectedPromotion)
          : 0;

        const totalAmount = Math.max(0, subtotal + shippingFee - discount);

        const statusRoll = faker.number.int({ min: 1, max: 100 });
        const status =
          statusRoll <= 8
            ? "PENDING_PAYMENT"
            : statusRoll <= 15
              ? "PAID"
              : statusRoll <= 30
                ? "PROCESSING"
                : statusRoll <= 50
                  ? "SHIPPED"
                  : statusRoll <= 94
                    ? "COMPLETED"
                    : statusRoll <= 98
                      ? "CANCELLED"
                      : "REFUNDED";

        const paidAt =
          status === "PENDING_PAYMENT" || status === "CANCELLED"
            ? null
            : faker.date.soon({ days: 1, refDate: createdAt });

        const completedAt =
          status === "COMPLETED"
            ? faker.date.soon({ days: 7, refDate: paidAt ?? createdAt })
            : null;

        const cancelledAt =
          status === "CANCELLED"
            ? faker.date.soon({ days: 2, refDate: createdAt })
            : null;

        const orderNumber = generateOrderNumber(sequence, createdAt);
        sequence += 1;

        const orderData: Prisma.OrderCreateInput = {
          orderNumber,
          user: {
            connect: {
              id: user.id,
            },
          },
          status,
          subtotal,
          shippingFee,
          discount,
          totalAmount,
          shippingAddress: {
            recipientName: user.name,
            phone: faker.string.numeric(12),
            line1: faker.location.streetAddress(),
            district: faker.location.county(),
            city: faker.location.city(),
            province: faker.location.state(),
            postalCode: faker.location.zipCode("#####"),
            notes: faker.helpers.arrayElement([
              "Titip satpam jika rumah kosong",
              "Hubungi penerima sebelum antar",
              "Pengiriman normal",
              "Jangan lipat paket",
            ]),
          },
          createdAt,
          paidAt,
          completedAt,
          cancelledAt,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              productImage: item.productImage,
              quantity: item.quantity,
              price: item.price,
              totalPrice: item.totalPrice,
            })),
          },
        };

        if (hasPromotionIdColumn && selectedPromotion) {
          orderData.promotion = {
            connect: {
              id: selectedPromotion.id,
            },
          };
        }

        if (hasPromoCodeColumn) {
          orderData.promoCode = selectedPromotion?.code ?? null;
        }

        if (hasAppliedPromotionsColumn) {
          orderData.appliedPromotions = selectedPromotion
            ? {
                promotionId: selectedPromotion.id,
                promotionName: selectedPromotion.name,
                scope: selectedPromotion.scope,
                source: selectedPromotion.source,
                discount,
              }
            : null;
        }

        await prisma.order.create({
          data: orderData,
          select: { id: true },
        });
      });
    }
  }

  await runInBatches(orderTasks, 20);
}

async function main() {
  console.log(
    `Starting scalable seed database sequence... (Configured products/category: ${PRODUCTS_PER_CATEGORY})`
  );

  await cleanDatabase();
  await seedUser(prisma);
  await seedCategories(prisma);

  // Dynamically generate data using factories
  const generatedProducts = generateProductsForCategories(
    categoryConfigs,
    PRODUCTS_PER_CATEGORY
  );
  const generatedReviews = generateReviewsForProducts(
    generatedProducts,
    mockUsers,
    positiveReviews,
    neutralReviews,
    negativeReviews
  );

  await seedProducts(prisma, generatedProducts);
  await seedReviews(prisma, generatedReviews);
  await seedSpecifications(prisma, generatedProducts);
  await seedPromotions(prisma);
  await seedOrders(prisma);
  await seedSearchLog(prisma, generatedProducts);

  console.log(
    "Database seeding completed successfully (Banners were untouched)!"
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (err) => {
    console.error("Seeding failed with error:", err);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
