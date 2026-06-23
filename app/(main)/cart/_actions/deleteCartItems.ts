"use server";

import { getCart } from "@/app/(shared)/_lib/getCart";
import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";
import { Cart } from "@/app/(shared)/_types/cart";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { refresh } from "next/cache";
import { z } from "zod";

export const deleteCartItems = actionClient
  .inputSchema(z.array(idSchema))
  .action(
    async ({
      parsedInput: cartItemIdList,
      ctx,
    }): Promise<ActionResponseData> => {
      const userId = ctx.user.id;

      const { count } = await prisma.cartItem.deleteMany({
        where: {
          id: {
            in: cartItemIdList,
          },
          cart: { userId },
        },
      });

      if (count === 0) {
        return {
          success: false,
          message: "Unable to delete items from your cart",
        };
      }

      // to keep the cart badge in the header in sync
      refresh();

      const message =
        count > 1
          ? `${count} items have been deleted from your cart`
          : `${count} item has been deleted from your cart`;

      return {
        success: true,
        message,
        body: null,
      };
    }
  );
