// Character Fragments API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterFragments, getCollectionBonus } from '@/lib/api/fragments';

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

    const fragments = await getCharacterFragments(character.id);
    const totalFragments = await prisma.fragment.count();
    const unlockedCount = fragments.length;
    const collectionPercentage = totalFragments > 0 ? (unlockedCount / totalFragments) * 100 : 0;
    const collectionBonus = getCollectionBonus(collectionPercentage);

    return NextResponse.json({
      fragments,
      unlockedCount,
      totalFragments,
      collectionPercentage,
      collectionBonus,
    });
  } catch (error) {
    console.error('Character fragments error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Fragmente' },
      { status: 500 }
    );
  }
}

