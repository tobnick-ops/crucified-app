import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Datenbankfehler";

    return NextResponse.json(
      {
        status: "degraded",
        database: false,
        message,
      },
      { status: 503 }
    );
  }
}
