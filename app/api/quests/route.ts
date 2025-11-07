// Quests API - Get Daily & Weekly Quests with Progress
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
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Get all daily quests (pool of 10, rotate 3 daily)
    const dailyQuests = await prisma.quest.findMany({
      where: { type: 'DAILY' },
      take: 3, // Rotate 3 per day
    });

    // Get all weekly quests (pool of 8, rotate 3 weekly)
    const weeklyQuests = await prisma.quest.findMany({
      where: { type: 'WEEKLY' },
      take: 3, // Rotate 3 per week
    });

    // Get user's quest progress
    const questProgress = await prisma.characterQuest.findMany({
      where: { characterId: character.id },
    });

    const progressMap = new Map(questProgress.map(p => [p.questId, p]));

    // Map quests with progress
    const mapQuestWithProgress = (quest: any) => {
      const progress = progressMap.get(quest.id);
      const requirement = typeof quest.requirement === 'string' 
        ? JSON.parse(quest.requirement).value 
        : 1;

      return {
        id: quest.id,
        type: quest.type,
        title: quest.title,
        description: quest.description,
        rewardXp: quest.rewardXp,
        rewardGold: quest.rewardGold,
        progress: progress?.progress || 0,
        requirement,
        isCompleted: progress?.isCompleted || false,
      };
    };

    return NextResponse.json({
      dailyQuests: dailyQuests.map(mapQuestWithProgress),
      weeklyQuests: weeklyQuests.map(mapQuestWithProgress),
    });
  } catch (error) {
    console.error('Error fetching quests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

