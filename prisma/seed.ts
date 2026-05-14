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
  await prisma.banner.createMany({
    data: [
      {
        title: "Yuk belanja di GoodGoods",
        imageId: "banner-1_psamz3",
        order: 1,
      },
      {
        title: "Malas belanja ke mal?",
        imageId: "banner-2_yajqyd",
        order: 2,
      },
      {
        title: "Mau transaksi lebih hemat?",
        imageId: "banner-3_wco4xy",
        order: 3,
      },
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
