"use server";

import { actionClient } from "@/lib/safe-action";
import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";

const MESSAGE = "1 Item has been added to your favorites";

const addToFavorites = actionClient
  .inputSchema(idSchema)
  .action(
    async ({ parsedInput: productId, ctx }): Promise<ActionResponseData> => {
      const userId = ctx.user.id;

      try {
        await prisma.favorite.create({
          data: {
            product: { connect: { id: productId } },
            user: { connect: { id: userId } },
          },
        });

        return {
          success: true,
          message: MESSAGE,
          body: null,
        };
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return {
              success: true,
              message: MESSAGE,
              body: null,
            };
          }
        }

        throw err;
      }
    }
  );

export default addToFavorites;
