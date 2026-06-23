import { getSessionCached } from "@/app/(shared)/_lib/getSessionCached";
import { redirect } from "next/navigation";
import { CartPageClient } from "./_components/CartPageClient";
import prisma from "@/lib/prisma";
import { Product } from "@/app/(shared)/_types/product";
import CartProvider from "./contexts/CartContext";
import { getCart } from "@/app/(shared)/_lib/getCart";
import { Suspense } from "react";
import SelectedItemsProvider from "./contexts/SelectedItemsContext";
import { CartItemListSkeleton } from "./_components/CartItemListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import RecommendedProductsGridSkeleton from "./_components/RecommendedProductsGridSkeleton";
import CartItemListView from "./_components/CartItemListContainer";
import RecommendedProductsGrid from "./_components/RecommendedProductsGrid";

export default async function CartPage() {
  const session = await getSessionCached();
  const products = prisma.product
    .findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        slug: true,
        stock: true,
      },
      take: 8,
    })
    .then((rawProducts) => {
      const products = rawProducts.map((rawProduct) => {
        const product: Product = {
          id: rawProduct.id,
          imageUrl: rawProduct.imageUrl,
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
        <SelectedItemsProvider>
          <CartPageClient
            leftSection={
              <div className="flex w-full flex-2 flex-col gap-16">
                <Suspense
                  fallback={
                    <>
                      <div className="flex w-full flex-col">
                        <h1 className="my-4 text-2xl font-semibold">
                          Your Cart
                        </h1>

                        <CartItemListSkeleton />
                      </div>
                      <div className="flex flex-col">
                        <Skeleton className="mb-6 h-[30px] w-60" />
                        <RecommendedProductsGridSkeleton />
                      </div>
                    </>
                  }
                  name="cart-provider"
                >
                  <CartProvider cartPromise={cartPromise}>
                    <CartItemListView />
                    <div className="flex w-full flex-col">
                      <h1 className="mb-6 text-2xl font-semibold">
                        Recommended for You
                      </h1>
                      <Suspense
                        fallback={<RecommendedProductsGridSkeleton />}
                        name="recommended-product-cart"
                      >
                        <RecommendedProductsGrid productsPromise={products} />
                      </Suspense>
                    </div>
                  </CartProvider>
                </Suspense>
              </div>
            }
          />
        </SelectedItemsProvider>
      </div>
    </div>
  );
}
