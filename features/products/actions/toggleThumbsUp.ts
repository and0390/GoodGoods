"use server";

import { idSchema } from "@/app/(shared)/_schemas/idSchema";
import { ActionResponseData } from "@/app/(shared)/_types/actionResponse";
import { toggleReviewThumbsUp } from "@/app/generated/prisma/sql";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { createId } from "@paralleldrive/cuid2";
import "server-only";

const toggleThumbsUp = actionClient
  .inputSchema(idSchema)
  .action(async ({ ctx, parsedInput: reviewId }) => {
    const [result] = await prisma.$queryRawTyped(
      toggleReviewThumbsUp(createId(), ctx.user.id, reviewId)
    );

    return {
      helpfulCount: result.helpfulCount,
      isLikedByUser: result.liked ?? false,
    };
  });

export default toggleThumbsUp;
