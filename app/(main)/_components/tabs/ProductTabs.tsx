import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "./ProductGrid";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ProductPreview } from "@/app/(shared)/_types/product";

const ForYouTab = async ({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsTrigger>, "value">) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const name = session ? session.user.name : "You";

  return (
    <TabsTrigger
      value="forYou"
      className={cn("relative flex-none", className)}
      {...props}
    >
      For {name}
    </TabsTrigger>
  );
};

export const ProductTabs = async () => {
  const products = await prisma.product.findMany().then((rawProducts) => {
    const products = rawProducts.map((rawProduct): ProductPreview => {
      return {
        id: rawProduct.id,
        imageUrl: rawProduct.imageUrls[0],
        name: rawProduct.name,
        price: rawProduct.price,
        slug: rawProduct.slug,
        stock: rawProduct.stock,
      };
    });

    return products;
  });

  const extendedProducts = products.map((product) => ({
    ...product,
    rating: 0,
  }));

  return (
    <Tabs className="" defaultValue="forYou">
      <TabsList
        variant="line"
        className="sticky top-25 z-30 h-13! w-full justify-start border-b bg-muted"
      >
        <div className="container mx-auto h-full">
          <ForYouTab />
          <TabsTrigger value="mall" className="flex-none">
            Mall
          </TabsTrigger>
          <TabsTrigger value="yourProducts" className="flex-none">
            Your Products
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="forYou" className="container mx-auto px-1">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
      <TabsContent value="mall" className="container mx-auto px-1">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
      <TabsContent value="yourProducts" className="container mx-auto px-1">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
    </Tabs>
  );
};
