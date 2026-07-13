import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import slugify from "slugify";
import { PrismaClient } from "../app/generated/prisma/client";
import { categories } from "./categorySeed";
import { products } from "./productSeed";
import { attributeTemplates } from "./productSpecification";

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

  for (const attr of attributeTemplates) {
    await prisma.categoryAttribute.create({
      data: {
        id: attr.id,
        name: attr.name,
        categoryId: attr.categoryId,
        isRequired: true,
      },
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

async function seedSpecifications(prisma: PrismaClient) {
  for (const product of products) {
    const templates = attributeTemplates.filter(
      (t) => t.categoryId === product.category
    );

    for (const t of templates) {
      const randomValue = faker.helpers.arrayElement(t.pool);

      await prisma.productSpecification.create({
        data: {
          productId: product.id,
          attributeTemplateId: t.id,
          value: randomValue,
        },
      });
    }
  }
}

async function main() {
  await seedCategories(prisma);
  await seedProducts(prisma);
  await seedSpecifications(prisma);
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
