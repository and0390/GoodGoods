import { getCart } from "@/app/(shared)/_lib/getCart";
import { getSession } from "@/app/(shared)/_lib/getSession";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          message: "Authentication is required to access this resource",
          body: null,
        },
        { status: 401 }
      );
    }

    const cart = await getCart(session.user.id);

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          code: "NOT_FOUND",
          message: "Unable to find the requested cart",
          body: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Cart items fetched successfully.",
        body: cart,
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
