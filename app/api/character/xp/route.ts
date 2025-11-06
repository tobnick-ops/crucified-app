// XP API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { addXP } from '@/lib/api/character';

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
    const { xpAmount } = body;

    if (!xpAmount || typeof xpAmount !== 'number' || xpAmount <= 0) {
      return NextResponse.json(
        { error: 'Ungültige XP-Menge' },
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

    // Add XP
    const result = await addXP(character.id, xpAmount);

    return NextResponse.json({
      message: 'XP hinzugefügt',
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
      newXP: result.newXP,
      statsGained: result.statsGained,
    });
  } catch (error) {
    console.error('XP error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Hinzufügen von XP' },
      { status: 500 }
    );
  }
}

