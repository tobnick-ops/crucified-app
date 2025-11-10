// Achievements API - Get All Achievements with User Progress
// GAMEREADY Feature

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { addXP } from '@/lib/api/character';
import { syncCharacterAchievements } from '@/lib/api/achievements';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    const syncResult = await syncCharacterAchievements(character.id);

    if (syncResult.totalRewardXp > 0) {
      await addXP(character.id, syncResult.totalRewardXp);
    }

    return NextResponse.json({
      achievements: syncResult.achievements,
      newlyUnlockedIds: syncResult.newlyUnlockedIds,
      rewardedXp: syncResult.totalRewardXp,
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

