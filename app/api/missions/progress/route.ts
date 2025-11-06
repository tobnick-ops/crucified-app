// Mission Progress API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateMissionProgress } from '@/lib/api/missions';

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
    const { missionId, objectiveId, value } = body;

    if (!missionId || !objectiveId || value === undefined) {
      return NextResponse.json(
        { error: 'Mission ID, Objective ID und Value sind erforderlich' },
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

    const result = await updateMissionProgress(
      character.id,
      missionId,
      objectiveId,
      value
    );

    return NextResponse.json({
      message: 'Mission-Fortschritt aktualisiert',
      ...result,
    });
  } catch (error: any) {
    console.error('Mission progress error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Aktualisieren des Fortschritts' },
      { status: 500 }
    );
  }
}

