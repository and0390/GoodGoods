import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "./ProductGrid";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ForYouTab = async (
  props: Omit<React.ComponentProps<typeof TabsTrigger>, "value">
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const name = session ? session.user.name : "You";

  return (
    <TabsTrigger value="forYou" {...props}>
      For {name}
    </TabsTrigger>
  );
};

export const ProductTabs = async () => {
  const products = await prisma.product.findMany({});
  const extendedProducts = products.map((product) => ({
    ...product,
    rating: 0,
  }));

  return (
    <Tabs defaultValue="forYou">
      <TabsList variant="line">
        <ForYouTab />
        <TabsTrigger value="mall">Mall</TabsTrigger>
        <TabsTrigger value="yourProducts">Your Products</TabsTrigger>
      </TabsList>
      <TabsContent value="forYou">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
      <TabsContent value="mall">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
      <TabsContent value="yourProducts">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
    </Tabs>
  );
};
