import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "andreasjonathan132@gmail.com" },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Create some Products
  const product1 = await prisma.product.create({
    data: {
      name: "Mechanical Keyboard G613",
      price: 1200000,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Logitech MX Master 3S",
      price: 1500000,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "satu",
      price: 1,
    },
  });

  // 3. Create a Cart for the user
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  // 4. Add items to the Cart
  await prisma.cartItem.createMany({
    data: [
      {
        cartId: cart.id,
        productId: product1.id,
        quantity: 1,
      },
      {
        cartId: cart.id,
        productId: product2.id,
        quantity: 2,
      },
    ],
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
