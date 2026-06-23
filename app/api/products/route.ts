import { getSession } from "@/app/(shared)/_lib/getSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function GET() {
  const session = getSession();

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

  const x = await prisma.product.findMany({});
}
