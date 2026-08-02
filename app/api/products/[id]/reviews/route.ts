import getPaginatedProductReview, {
  LIMIT_PER_PAGE,
} from "@/app/(shared)/_lib/getPaginatedProductReview";
import { getSession } from "@/app/(shared)/_lib/getSession";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const reviewQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(10).default(LIMIT_PER_PAGE),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  withImages: z.stringbool(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getSession();

    const searchParams = request.nextUrl.searchParams;

    const queryResult = reviewQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      rating: searchParams.get("rating") ?? undefined,
      withImages: searchParams.get("withImages") ?? undefined,
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

    const { limit, page, rating, withImages } = queryResult.data;

    const body = await getPaginatedProductReview(
      id,
      session?.user.id ?? null,
      rating ?? null,
      withImages,
      page,
      limit
    );

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "reviews fetched successfully.",
        body,
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
