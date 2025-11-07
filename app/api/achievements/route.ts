// Achievements API - Get All Achievements with User Progress
// GAMEREADY Feature

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
      include: {
        lessons: true,
        missions: true,
        fragments: true,
      },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Get all achievements
    const achievements = await prisma.achievement.findMany({
      orderBy: [
        { category: 'asc' },
        { requirement: 'asc' },
      ],
    });

    // Get user's unlocked achievements
    const unlocked = await prisma.characterAchievement.findMany({
      where: { characterId: character.id },
    });

    const unlockedIds = new Set(unlocked.map(u => u.achievementId));

    // Calculate progress for each achievement
    const achievementsWithProgress = achievements.map(achievement => {
      const isUnlocked = unlockedIds.has(achievement.id);
      let progress = 0;

      // Calculate progress based on achievement key
      if (achievement.key.startsWith('lessons_')) {
        progress = character.lessons.filter(l => l.completedAt).length;
      } else if (achievement.key.startsWith('missions_')) {
        progress = character.missions.filter(m => m.completedAt).length;
      } else if (achievement.key.startsWith('fragments_')) {
        progress = character.fragments.length;
      } else if (achievement.key.startsWith('level_')) {
        progress = character.level;
      }

      return {
        ...achievement,
        isUnlocked,
        progress: isUnlocked ? achievement.requirement : progress,
      };
    });

    return NextResponse.json({
      achievements: achievementsWithProgress,
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

