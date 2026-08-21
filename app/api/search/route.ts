import { SearchQuery } from "@/app/(shared)/_types/search";
import { searchCategories, searchProducts } from "@/app/generated/prisma/sql";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const searchQuerySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(50),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const queryResult = searchQuerySchema.safeParse({
      q: searchParams.get("q") ?? undefined,
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

    const { limit, q } = queryResult.data;

    const [rawProducts, rawCategories] = await Promise.all([
      prisma.$queryRawTyped(searchProducts(q, limit)),
      prisma.$queryRawTyped(searchCategories(q, 5)),
    ]);

    const products = rawProducts.map(
      (product): SearchQuery["products"][number] => {
        return {
          id: product.id,
          imageUrl: product.imageUrls![0],
          name: product.name,
          slug: product.slug,
        };
      }
    );

    const categories = rawCategories.map(
      (cat): SearchQuery["categories"][number] => {
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        };
      }
    );

    const body: SearchQuery = {
      products,
      categories,
    };

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Search recommendations fetched successfully.",
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
