import { getCart } from "@/app/(shared)/_lib/getCart";
import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { ProductPreview } from "@/app/(shared)/_types/product";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CartPageClient } from "./_components/CartPageClient";

export default async function CartPage() {
  const session = await getSessionCached();
  const products = prisma.product
    .findMany({
      select: {
        imageUrls: true,
        id: true,
        name: true,
        price: true,
        slug: true,
        stock: true,
      },
      take: 8,
    })
    .then((rawProducts) => {
      const products = rawProducts.map((rawProduct) => {
        const product: ProductPreview = {
          id: rawProduct.id,
          imageUrl: rawProduct.imageUrls[0],
          name: rawProduct.name,
          price: rawProduct.price,
          slug: rawProduct.slug,
          stock: rawProduct.stock,
        };
        return product;
      });

      return products;
    });

  if (!session) {
    return redirect("/login");
  }

  const cartPromise = getCart(session.user.id);

  return (
    <div className="flex flex-1 flex-col">
      <div className="container mx-auto flex flex-1 pb-8">
        <CartPageClient cartPromise={cartPromise} productsPromise={products} />
      </div>
    </div>
  );
}
