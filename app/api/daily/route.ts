// Daily System API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getDailyCurrency, getStreak, getWeeklyBonus } from '@/lib/api/daily';

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

    const dailyCurrency = await getDailyCurrency(character.id);
    const streak = await getStreak(character.id);
    const weeklyBonus = await getWeeklyBonus(character.id);

    return NextResponse.json({
      dailyCurrency,
      streak,
      weeklyBonus,
    });
  } catch (error) {
    console.error('Daily error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der täglichen Daten' },
      { status: 500 }
    );
  }
}

