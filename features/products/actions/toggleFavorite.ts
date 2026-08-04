"use server";

import { actionClient } from "@/lib/safe-action";
import z from "zod";
import "server-only";
import prisma from "@/lib/prisma";
import { toggleFavorite as toggleFavoriteDb } from "@/app/generated/prisma/sql";
import { createId } from "@paralleldrive/cuid2";

const toggleFavorite = actionClient.inputSchema(z.string()).action(
  async ({
    ctx,
    parsedInput: productId,
  }): Promise<{
    action: "ADD_TO_FAVORITE" | "REMOVE_TO_FAVORITE";
    favoriteCount: number;
    isFavorited: boolean;
  }> => {
    const [result] = await prisma.$queryRawTyped(
      toggleFavoriteDb(createId(), productId, ctx.user.id)
    );

    return {
      action: result.isfavorited ? "ADD_TO_FAVORITE" : "REMOVE_TO_FAVORITE",
      favoriteCount: result.favoriteCount,
      isFavorited: result.isfavorited ?? false,
    };
  }
);

export default toggleFavorite;
