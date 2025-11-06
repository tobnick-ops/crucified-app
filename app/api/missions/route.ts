import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const missions = await prisma.mission.findMany({
      orderBy: [{ rewardXp: "asc" }, { title: "asc" }],
    });

    return NextResponse.json({ missions });
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
