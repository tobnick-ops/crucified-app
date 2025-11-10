import { prisma } from '@/lib/prisma';

interface SyncAchievementsResult {
  achievements: Array<{
    id: string;
    key: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    requirement: number;
    rewardXp: number;
    isSecret: boolean;
    isUnlocked: boolean;
    progress: number;
  }>;
  newlyUnlockedIds: string[];
  totalRewardXp: number;
}

export async function syncCharacterAchievements(
  characterId: string
): Promise<SyncAchievementsResult> {
  const result = await prisma.$transaction(async (tx) => {
    const character = await tx.character.findUnique({
      where: { id: characterId },
      include: {
        lessons: {
          select: {
            completedAt: true,
            score: true,
          },
        },
        missions: {
          select: {
            completedAt: true,
            status: true,
            progressJson: true,
          },
        },
        fragments: true,
        equipment: {
          include: {
            equipment: true,
          },
        },
        stats: true,
        createdAt: true,
      },
    });

    if (!character) {
      return null;
    }

    const achievements = await tx.achievement.findMany({
      orderBy: [
        { category: 'asc' },
        { requirement: 'asc' },
      ],
    });

    const unlocked = await tx.characterAchievement.findMany({
      where: { characterId },
    });

    const unlockedIds = new Set(unlocked.map((entry) => entry.achievementId));
    const achievementsWithProgress: SyncAchievementsResult['achievements'] = [];
    const newlyUnlockedIds: string[] = [];
    let totalRewardXp = 0;

    const lessonsCompleted = character.lessons.filter((lesson) => !!lesson.completedAt).length;
    const perfectLessons = character.lessons.filter((lesson) => lesson.score >= 100).length;
    const completedMissions = character.missions.filter((mission) => !!mission.completedAt);
    const missionsCompleted = completedMissions.length;
    const fragmentsUnlocked = character.fragments.length;
    const equippedItems = character.equipment.filter((item) => item.isEquipped);
    const equippedSlots = new Set(equippedItems.map((item) => item.slot));
    const hasLegendaryItem = character.equipment.some((item) =>
      item.equipment?.rarity === 'LEGENDARY' || item.equipment?.rarity === 'ARTIFACT'
    );
    const totalStrength = character.stats?.totalStrength ?? 0;

    const missionCompletionStreak = (() => {
      if (completedMissions.length === 0) {
        return 0;
      }

      const uniqueDays = Array.from(
        new Set(
          completedMissions
            .filter((mission) => mission.completedAt)
            .map((mission) => {
              const date = new Date(mission.completedAt!);
              date.setHours(0, 0, 0, 0);
              return date.getTime();
            })
        )
      ).sort((a, b) => a - b);

      if (uniqueDays.length === 0) {
        return 0;
      }

      let currentStreak = 1;
      let bestStreak = 1;

      for (let i = 1; i < uniqueDays.length; i++) {
        const previousDay = uniqueDays[i - 1];
        const currentDay = uniqueDays[i];
        const differenceInDays = (currentDay - previousDay) / (1000 * 60 * 60 * 24);

        if (differenceInDays === 1) {
          currentStreak += 1;
        } else if (differenceInDays > 1) {
          currentStreak = 1;
        }

        bestStreak = Math.max(bestStreak, currentStreak);
      }

      return bestStreak;
    })();

    const hasCompletedMissionObjectives = character.missions.some((mission) => {
      if (mission.status !== 'completed') {
        return false;
      }

      if (!mission.progressJson) {
        return true;
      }

      try {
        const progressData = JSON.parse(mission.progressJson) as Record<
          string,
          { completed?: boolean }
        >;
        return Object.values(progressData).every((entry) => entry.completed === true);
      } catch (error) {
        console.warn('Failed to parse mission progress JSON for achievement check', error);
        return true;
      }
    });

    for (const achievement of achievements) {
      let progress = 0;

      if (achievement.key === 'first_lesson') {
        progress = lessonsCompleted > 0 ? 1 : 0;
      } else if (achievement.key.startsWith('lessons_')) {
        progress = lessonsCompleted;
      } else if (achievement.key === 'perfect_lesson') {
        progress = perfectLessons > 0 ? 1 : 0;
      } else if (achievement.key.startsWith('perfect_')) {
        progress = perfectLessons;
      } else if (achievement.key === 'first_mission') {
        progress = missionsCompleted > 0 ? 1 : 0;
      } else if (achievement.key.startsWith('missions_')) {
        progress = missionsCompleted;
      } else if (achievement.key === 'mission_streak_3') {
        progress = missionCompletionStreak;
      } else if (achievement.key.startsWith('fragments_')) {
        progress = fragmentsUnlocked;
      } else if (achievement.key === 'first_fragment') {
        progress = fragmentsUnlocked > 0 ? 1 : 0;
      } else if (achievement.key.startsWith('level_')) {
        progress = character.level;
      } else if (achievement.key === 'first_equipment') {
        progress = equippedItems.length > 0 ? 1 : 0;
      } else if (achievement.key === 'all_slots') {
        progress = equippedSlots.size;
      } else if (achievement.key === 'legendary_item') {
        progress = hasLegendaryItem ? 1 : 0;
      } else if (achievement.key === 'all_objectives') {
        progress = hasCompletedMissionObjectives ? 1 : 0;
      } else if (achievement.key === 'strength_1000') {
        progress = totalStrength;
      } else if (achievement.key === 'strength_5000') {
        progress = totalStrength;
      } else if (achievement.key === 'first_day') {
        progress = 1; // Charakter existiert, daher automatisch erfüllt
      }

      if (!unlockedIds.has(achievement.id) && progress >= achievement.requirement) {
        await tx.characterAchievement.create({
          data: {
            characterId,
            achievementId: achievement.id,
          },
        });

        newlyUnlockedIds.push(achievement.id);
        unlockedIds.add(achievement.id);
        totalRewardXp += achievement.rewardXp;
      }

      achievementsWithProgress.push({
        ...achievement,
        isUnlocked: unlockedIds.has(achievement.id),
        progress: unlockedIds.has(achievement.id)
          ? achievement.requirement
          : Math.min(progress, achievement.requirement),
      });
    }

    return {
      achievements: achievementsWithProgress,
      newlyUnlockedIds,
      totalRewardXp,
    } satisfies SyncAchievementsResult;
  });

  if (!result) {
    return {
      achievements: [],
      newlyUnlockedIds: [],
      totalRewardXp: 0,
    };
  }

  return result;
}

