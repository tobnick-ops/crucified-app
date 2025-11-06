import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: [{ difficulty: "asc" }, { title: "asc" }],
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";

    return NextResponse.json(
      {
        message,
      },
      { status: 503 }
    );
  }
}
