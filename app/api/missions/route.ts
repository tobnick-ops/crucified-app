// Missions API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAvailableMissions } from '@/lib/api/missions';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
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

    const missions = await getAvailableMissions(character.id);

    return NextResponse.json({
      missions,
    });
  } catch (error) {
    console.error('Missions error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Missionen' },
      { status: 500 }
    );
  }
}

