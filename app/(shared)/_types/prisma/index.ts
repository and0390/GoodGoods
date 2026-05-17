import { Prisma } from "../../../generated/prisma/client";

export type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type BannerList = Prisma.BannerGetPayload<{}>[];
