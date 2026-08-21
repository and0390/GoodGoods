import { getSession } from "@/app/(shared)/_lib/getSession";
import getHomeFeed from "@/features/home/server/getHomeFeed";
import { getAnonId } from "@/lib/anonId";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const productsQuerySchema = z.object({
  category: z.string(),
  limit: z.coerce.number().min(1).default(10),
  cursor: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const queryResult = productsQuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
      cursor: searchParams.get("cursor") ?? undefined,
      category: searchParams.get("category") ?? undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "Invalid query",
          error: z.flattenError(queryResult.error),
        },
        { status: 400 }
      );
    }

    const session = await getSession();
    const anonymousId = session ? null : await getAnonId();

    const { cursor, limit, category } = queryResult.data;

    const products = await getHomeFeed({
      limit,
      cursor: cursor ?? null,
      category,
      userId: session?.user.id ?? null,
      anonymousId: anonymousId,
    });

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "products fetched successfully.",
        body: products,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        body: null,
      },
      { status: 500 }
    );
  }
}
