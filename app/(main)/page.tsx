import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarouselBanner } from "./_components/banner/CarouselBanner";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="w-full bg-muted/75 sm:py-6">
        <div className="container mx-auto">
          <CarouselBanner />
        </div>
      </div>
      <div className="w-full bg-muted/75">
        <div className="container mx-auto py-6">
          <Tabs defaultValue="forYou">
            <TabsList variant="line">
              <TabsTrigger value="forYou">For You</TabsTrigger>
              <TabsTrigger value="mall">Mall</TabsTrigger>
              <TabsTrigger value="yourProducts">Your Products</TabsTrigger>
            </TabsList>
            <TabsContent value="forYou">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="mall">Change your password here.</TabsContent>
            <TabsContent value="yourProducts">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
