import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import slugify from "slugify";
import { Prisma } from "../app/generated/prisma/client";
import { categories } from "./categorySeed";
import { products } from "./productSeed";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function seedCategories(prisma: PrismaClient) {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        sortOrder: cat.sortOrder,
        parentId: cat.parentId,
      },
      update: {},
    });
  }
}

const seedProducts = async (prisma: PrismaClient) => {
  for (const product of products) {
    const imageUrls = Array.from({
      length: faker.number.int({ min: 1, max: 10 }),
    }).map(() => faker.image.url());

    await prisma.product.upsert({
      where: { id: product.id },
      create: {
        id: product.id,
        name: product.name,
        description: faker.commerce.productDescription(),
        price: parseInt(
          faker.commerce.price({ min: 50_000, max: 10_000_000, dec: 0 })
        ),
        imageUrls,
        slug: slugify(product.name, { strict: true, trim: true }),
        stock: faker.number.int({ min: 0, max: 500 }),
        category: { connect: { id: product.category } },
        weight: faker.number.int({ min: 10, max: 2000 }),
      },
      update: {},
    });
  }
};

async function main() {
  const categorySet = new Set(categories.map((cat) => cat.id));

  for (const product of products) {
    if (!categorySet.has(product.category)) {
      throw new Error(
        `${product.category} - ${product.name} has a category that doesn't exist`
      );
    }
  }

  await seedCategories(prisma);
  await seedProducts(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
