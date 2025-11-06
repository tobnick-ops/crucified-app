// Night Watch API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { completeNightWatch } from '@/lib/api/daily';

export async function POST(request: NextRequest) {
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

    const result = await completeNightWatch(character.id);

    return NextResponse.json({
      message: 'Nachtwache abgeschlossen',
      ...result,
    });
  } catch (error: any) {
    console.error('Night watch error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Abschließen der Nachtwache' },
      { status: 500 }
    );
  }
}

