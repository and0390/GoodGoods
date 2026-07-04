import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const CATEGORIES = [
  "laptop",
  "smartphone",
  "headphone",
  "sneakers",
  "watch",
  "backpack",
  "camera",
  "keyboard",
];

const generateSlug = (name: string, id: string) => {
  return `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${id.slice(0, 6)}`;
};

const generateProducts = (count: number) => {
  return Array.from({ length: count }, () => {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const id = faker.string.uuid();
    const name = faker.commerce.productName();

    // picsum kasih foto random, seed dari id supaya fotonya konsisten
    // (foto yang sama tiap kali seeder dijalanin buat produk yang sama)
    const seed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/seed/${seed}/400/400`;

    return {
      id,
      name,
      description: faker.commerce.productDescription(),
      price: parseInt(
        faker.commerce.price({ min: 50000, max: 10000000, dec: 0 })
      ),
      imageUrl,
      slug: generateSlug(name, id),
      stock: faker.number.int({ min: 0, max: 500 }),
    };
  });
};

async function main() {
  await prisma.product.deleteMany();

  const products = generateProducts(20);

  const x = await prisma.product.createMany({
    data: products,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
