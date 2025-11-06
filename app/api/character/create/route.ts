// Character Creation API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateTotalStrength } from '@/lib/game/formulas';

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
    const { rabbiId, name } = body;

    if (!rabbiId || !name) {
      return NextResponse.json(
        { error: 'Name und Rabbi sind erforderlich' },
        { status: 400 }
      );
    }

    // Prüfe ob Rabbi existiert
    const rabbi = await prisma.rabbi.findUnique({
      where: { id: rabbiId },
      include: {
        startingBook: true,
        startingSkillTree: true,
      },
    });

    if (!rabbi) {
      return NextResponse.json(
        { error: 'Rabbi nicht gefunden' },
        { status: 404 }
      );
    }

    // Prüfe ob User bereits einen Character hat
    const existingCharacter = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (existingCharacter) {
      return NextResponse.json(
        { error: 'Du hast bereits einen Charakter' },
        { status: 400 }
      );
    }

    // Character erstellen
    const character = await prisma.character.create({
      data: {
        userId: session.user.id,
        name,
        level: 1,
        experience: 0,
        strength: 0,
        currentRabbiId: rabbiId,
      },
    });

    // Character Stats initialisieren (Start-Werte: 10 pro Stat)
    const initialStats = {
      faith: 10,
      wisdom: 10,
      knowledge: 10,
      service: 10,
      leadership: 10,
    };

    // Berechne Total Strength
    const totalStrength = calculateTotalStrength(
      initialStats,
      0, // Equipment Strength (später)
      0, // Set Bonuses (später)
      0  // Fragment Collection % (später)
    );

    await prisma.characterStats.create({
      data: {
        characterId: character.id,
        ...initialStats,
        totalStrength,
      },
    });

    // Update Character mit Total Strength
    await prisma.character.update({
      where: { id: character.id },
      data: { strength: totalStrength },
    });

    // Character Rabbi Progress initialisieren
    await prisma.characterRabbiProgress.create({
      data: {
        characterId: character.id,
        rabbiId: rabbiId,
        progressPercentage: 0,
        unlockedSkills: [],
      },
    });

    // Starting Equipment (einfache Toga) - wird später implementiert
    // TODO: Basis-Ausrüstung hinzufügen

    return NextResponse.json(
      {
        message: 'Charakter erfolgreich erstellt',
        character: {
          id: character.id,
          name: character.name,
          level: character.level,
          rabbi: {
            id: rabbi.id,
            name: rabbi.name,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Character creation error:', error);
    return NextResponse.json(
      { error: 'Charakter-Erstellung fehlgeschlagen' },
      { status: 500 }
    );
  }
}

