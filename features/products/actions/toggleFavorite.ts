"use server";

import { actionClient } from "@/lib/safe-action";
import z from "zod";
import "server-only";
import prisma from "@/lib/prisma";
import { toggleFavorite as toggleFavoriteDb } from "@/app/generated/prisma/sql";
import { createId } from "@paralleldrive/cuid2";

const toggleFavorite = actionClient
  .inputSchema(z.string())
  .action(async ({ ctx, parsedInput: productId }) => {
    const [result] = await prisma.$queryRawTyped(
      toggleFavoriteDb(createId(), productId, ctx.user.id)
    );

    return {
      favoriteCount: result.favoriteCount,
      isFavorited: result.isfavorited ?? false,
    };
  });

export default toggleFavorite;
