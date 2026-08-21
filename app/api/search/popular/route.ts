import getPopularSearch from "@/features/home/server/getPopularSearch";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const popularSearchQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const queryResult = popularSearchQuerySchema.safeParse({
      limit: searchParams.get("limit") ?? undefined,
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

    const { limit } = queryResult.data;

    const popularSearch = await getPopularSearch(limit);

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Search recommendations fetched successfully.",
        body: popularSearch,
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
        ...(process.env.NODE_ENV === "development" && {
          error: err instanceof Error ? err.message : String(err),
        }),
      },
      { status: 500 }
    );
  }
}
