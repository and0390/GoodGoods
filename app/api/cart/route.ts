import { CartWithItems } from "@/app/(shared)/_types/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "You must be logged in to access cart items.",
          body: null,
        },
        { status: 401 }
      );
    }

    const cart: CartWithItems | null = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Cart items fetched successfully.",
        body: cart?.items ?? [],
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);

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
