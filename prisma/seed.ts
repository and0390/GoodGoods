import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const findUser = async () => {
  const user = await prisma.user.findUnique({
    where: { email: "andreasjonathan132@gmail.com" },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const findCart = async () => {
  const user = await findUser();

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};

const deleteCartItems = async () => {
  await prisma.cartItem.deleteMany({});
};

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Wireless Headphones", price: 299000 },
      { name: "Gaming Mouse", price: 185000 },
      { name: "Mechanical Keyboard", price: 450000 },
      { name: "Smart Watch", price: 799000 },
      { name: "Bluetooth Speaker", price: 259000 },
      { name: "Laptop Stand", price: 120000 },
      { name: "USB-C Hub", price: 99000 },
      { name: "Webcam HD", price: 349000 },
      { name: "Portable SSD", price: 899000 },
      { name: "Gaming Chair", price: 1250000 },
      { name: "Monitor 24 Inch", price: 1750000 },
      { name: "Desk Lamp LED", price: 89000 },
      { name: "Tablet Android", price: 2300000 },
      { name: "Power Bank 20000mAh", price: 275000 },
      { name: "Noise Cancelling Earbuds", price: 499000 },
    ],
  });

  //   await prisma.cartItem.deleteMany({});
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
