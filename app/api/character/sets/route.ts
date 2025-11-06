// Character Sets API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterSets } from '@/lib/api/sets';

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

    const characterSets = await getCharacterSets(character.id);

    return NextResponse.json({
      sets: characterSets || [],
    });
  } catch (error) {
    console.error('Character sets error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Sets' },
      { status: 500 }
    );
  }
}

