// Character Stats API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterWithStats } from '@/lib/api/character';

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

    const characterWithStats = await getCharacterWithStats(character.id);

    if (!characterWithStats) {
      return NextResponse.json(
        { error: 'Charakter-Statistiken nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(characterWithStats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Statistiken' },
      { status: 500 }
    );
  }
}

