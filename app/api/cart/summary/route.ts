import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const calculateTotalSchema = z.object({
  itemIds: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "Authentication.",
          body: null,
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = calculateTotalSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "Please send a valid body",
          body: null,
        },
        {
          status: 400,
        }
      );
    }

    const totalPrice = await prisma.cartItem
      .findMany({
        where: { id: { in: parsed.data.itemIds } },
        select: { quantity: true, product: { select: { price: true } } },
      })
      .then((products) =>
        products.reduce(
          (acc, curr) => acc + curr.product.price * curr.quantity,
          0
        )
      );

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Total price was calculated successfully",
        body: {
          totalPrice,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[NextServer calculate-total]:", err);

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
        body: null,
      },
      {
        status: 500,
      }
    );
  }
}
