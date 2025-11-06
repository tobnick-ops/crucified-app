// Start Mission API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { startMission } from '@/lib/api/missions';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { missionId } = body;

    if (!missionId) {
      return NextResponse.json(
        { error: 'Mission ID ist erforderlich' },
        { status: 400 }
      );
    }

    // Lade Character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (!character) {
      return NextResponse.json(
        { error: 'Charakter nicht gefunden' },
        { status: 404 }
      );
    }

    const result = await startMission(character.id, missionId);

    return NextResponse.json({
      message: 'Mission gestartet',
      ...result,
    });
  } catch (error: any) {
    console.error('Start mission error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Starten der Mission' },
      { status: 500 }
    );
  }
}

