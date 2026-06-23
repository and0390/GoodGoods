import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { RiShoppingCart2Line } from "react-icons/ri";

export const CartWithBadge = async ({ userId }: { userId: string }) => {
  const aggregate = await prisma.cartItem.aggregate({
    where: { cart: { userId } },
    _sum: {
      quantity: true,
    },
  });

  const totalQuantity = aggregate._sum.quantity ?? 0;

  if (totalQuantity === 0) {
    return <RiShoppingCart2Line className="size-5" />;
  }

  return (
    <div className="relative">
      <RiShoppingCart2Line className="size-6 rounded-full" />
      <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 px-1">
        {totalQuantity}
      </Badge>
    </div>
  );
};
