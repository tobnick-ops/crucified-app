// Character Skills API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterSkillProgress } from '@/lib/api/rabbi';

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

    const skillProgress = await getCharacterSkillProgress(character.id);

    if (!skillProgress) {
      return NextResponse.json(
        { error: 'Skill Tree nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(skillProgress);
  } catch (error) {
    console.error('Skills error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Skills' },
      { status: 500 }
    );
  }
}

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
    const { skillId } = body;

    if (!skillId) {
      return NextResponse.json(
        { error: 'Skill ID ist erforderlich' },
        { status: 400 }
      );
    }

    // Lade Character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
      include: {
        stats: true,
      },
    });

    if (!character || !character.stats) {
      return NextResponse.json(
        { error: 'Charakter nicht gefunden' },
        { status: 404 }
      );
    }

    // Lade Skill
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      include: {
        skillTree: true,
      },
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill nicht gefunden' },
        { status: 404 }
      );
    }

    // Prüfe ob Skill zum Character's Rabbi gehört
    if (skill.skillTree.rabbiId !== character.currentRabbiId) {
      return NextResponse.json(
        { error: 'Skill gehört nicht zu deinem Rabbi' },
        { status: 400 }
      );
    }

    // Prüfe Level Requirement
    if (character.level < skill.levelRequirement) {
      return NextResponse.json(
        { error: `Level ${skill.levelRequirement} erforderlich` },
        { status: 400 }
      );
    }

    // Prüfe ob Parent Skill unlocked ist
    if (skill.parentSkillId) {
      const parentSkill = await prisma.characterSkill.findUnique({
        where: {
          characterId_skillId: {
            characterId: character.id,
            skillId: skill.parentSkillId,
          },
        },
      });

      if (!parentSkill) {
        return NextResponse.json(
          { error: 'Parent Skill muss zuerst freigeschaltet werden' },
          { status: 400 }
        );
      }
    }

    // Prüfe ob Skill bereits unlocked ist
    const existingSkill = await prisma.characterSkill.findUnique({
      where: {
        characterId_skillId: {
          characterId: character.id,
          skillId: skillId,
        },
      },
    });

    if (existingSkill) {
      // Skill level up
      await prisma.characterSkill.update({
        where: {
          characterId_skillId: {
            characterId: character.id,
            skillId: skillId,
          },
        },
        data: {
          level: { increment: 1 },
        },
      });
    } else {
      // Skill unlock
      await prisma.characterSkill.create({
        data: {
          characterId: character.id,
          skillId: skillId,
          level: 1,
        },
      });
    }

    // Parse Effect und wende Stats an
    // Effect ist JSON String mit Stat-Boni
    try {
      const effect = JSON.parse(skill.effect);
      if (effect.stats) {
        // TODO: Stats anwenden basierend auf Skill Level
        // Für jetzt: einfache Stat-Boni
      }
    } catch (e) {
      // Effect nicht parseable, ignorieren
    }

    return NextResponse.json({
      message: 'Skill erfolgreich freigeschaltet',
      skillId: skillId,
    });
  } catch (error) {
    console.error('Skill unlock error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Freischalten des Skills' },
      { status: 500 }
    );
  }
}

