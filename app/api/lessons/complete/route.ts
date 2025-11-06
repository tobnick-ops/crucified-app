// Complete Lesson API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { completeLesson } from '@/lib/api/lessons';

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
    const { lessonId, answers } = body;

    if (!lessonId || !answers) {
      return NextResponse.json(
        { error: 'Lesson ID und Answers sind erforderlich' },
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

    const result = await completeLesson(character.id, lessonId, answers);

    return NextResponse.json({
      message: 'Lektion erfolgreich abgeschlossen',
      score: result.score,
      experienceGained: result.experienceGained,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
    });
  } catch (error: any) {
    console.error('Complete lesson error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Abschließen der Lektion' },
      { status: 500 }
    );
  }
}

