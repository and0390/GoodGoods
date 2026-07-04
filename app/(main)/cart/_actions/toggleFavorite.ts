"use server";

import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";
import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";

const ADD_MESSAGE = "1 Item has been added to your favorites";
const REMOVE_MESSAGE = "1 Item has been removed from your favorites";

export const toggleFavorite = actionClient
  .inputSchema(idSchema)
  .action(
    async ({ parsedInput: productId, ctx }): Promise<ActionResponseData> => {
      const userId = ctx.user.id;

      try {
        await prisma.favorite.create({
          data: {
            product: { connect: { id: productId } },
            user: { connect: { id: ctx.user.id } },
          },
        });

        return {
          success: true,
          message: ADD_MESSAGE,
          body: null,
        };
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            await prisma.favorite.delete({
              where: { userId_productId: { userId, productId } },
            });

            return {
              success: true,
              message: REMOVE_MESSAGE,
              body: null,
            };
          }
        }

        throw err;
      }
    }
  );
