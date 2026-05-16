import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "./ProductGrid";
import prisma from "@/lib/prisma";

export const ProductTabs = async () => {
  const products = await prisma.product.findMany({});
  const extendedProducts = products.map(({ name, ...rest }) => ({
    ...rest,
    title: name,
    rating: 0,
    imageId: "",
  }));

  return (
    <Tabs defaultValue="forYou">
      <TabsList variant="line">
        <TabsTrigger value="forYou">For You</TabsTrigger>
        <TabsTrigger value="mall">Mall</TabsTrigger>
        <TabsTrigger value="yourProducts">Your Products</TabsTrigger>
      </TabsList>
      <TabsContent value="forYou">
        <ProductGrid products={extendedProducts} />
      </TabsContent>
      <TabsContent value="mall">
        <ProductGrid products={[]} />
      </TabsContent>
      <TabsContent value="yourProducts">
        <ProductGrid products={[]} />
      </TabsContent>
    </Tabs>
  );
};
