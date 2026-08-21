import { PrismaPg } from "@prisma/adapter-pg";
import { DiscountType, PrismaClient } from "./app/generated/prisma/client";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function getSecondCategory() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      parent: {
        select: {
          id: true,
          name: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  console.log(categories);
}

await getSecondCategory();
