/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function syncAchievements(characterId) {
  return prisma.$transaction(async (tx) => {
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
          },
        },
        fragments: true,
      },
    });

    if (!character) {
      throw new Error('Character not found');
    }

    const achievements = await tx.achievement.findMany({
      orderBy: [{ category: 'asc' }, { requirement: 'asc' }],
    });

    const unlocked = await tx.characterAchievement.findMany({
      where: { characterId },
    });

    const unlockedIds = new Set(unlocked.map((entry) => entry.achievementId));
    const newlyUnlockedIds = [];
    let totalRewardXp = 0;

    const lessonsCompleted = character.lessons.filter((lesson) => !!lesson.completedAt).length;
    const perfectLessons = character.lessons.filter((lesson) => lesson.score >= 100).length;
    const missionsCompleted = character.missions.filter((mission) => !!mission.completedAt).length;
    const fragmentsUnlocked = character.fragments.length;

    const achievementsWithProgress = [];

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
      } else if (achievement.key.startsWith('fragments_')) {
        progress = fragmentsUnlocked;
      } else if (achievement.key.startsWith('level_')) {
        progress = character.level;
      }

      if (!unlockedIds.has(achievement.id) && progress >= achievement.requirement) {
        newlyUnlockedIds.push(achievement.id);
        unlockedIds.add(achievement.id);
        totalRewardXp += achievement.rewardXp;

        await tx.characterAchievement.create({
          data: {
            characterId,
            achievementId: achievement.id,
          },
        });
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
    };
  });
}

async function main() {
  const characterId = process.argv[2];

  if (!characterId) {
    console.error('Bitte Character-ID übergeben.');
    process.exit(1);
  }

  try {
    const result = await syncAchievements(characterId);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

