// Character Rank API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterRank } from '@/lib/api/leaderboard';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') || 'total') as 'total' | 'level' | 'collection' | 'faith' | 'completion';

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

    const rank = await getCharacterRank(character.id, category);

    return NextResponse.json({
      rank: rank.rank,
      totalPlayers: rank.totalPlayers,
      category,
    });
  } catch (error) {
    console.error('Rank error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden des Rangs' },
      { status: 500 }
    );
  }
}

