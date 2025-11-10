/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function parseRequirement(requirement) {
  if (!requirement) return null;
  if (typeof requirement === 'string') {
    try {
      return JSON.parse(requirement);
    } catch (error) {
      console.warn('Failed to parse requirement JSON', error);
      return null;
    }
  }
  return requirement;
}

function getTarget(requirement) {
  if (!requirement) return 1;
  if (typeof requirement.value === 'number') return requirement.value;
  if (requirement.type === 'lessons_and_missions') {
    return (requirement.lessons ?? 0) + (requirement.missions ?? 0);
  }
  if (requirement.type === 'social_activity') {
    return (requirement.friends ?? 0) + (requirement.challenges ?? 0);
  }
  return 1;
}

async function applyQuestProgress(characterId, updates) {
  if (!updates.length) return;

  const types = Array.from(new Set(updates.map((update) => update.type)));
  const quests = await prisma.quest.findMany({ where: { isActive: true } });

  const filteredQuests = quests.filter((quest) => {
    const req = parseRequirement(quest.requirement);
    return req && types.includes(req.type);
  });

  const questIds = filteredQuests.map((quest) => quest.id);
  const progressRecords = await prisma.characterQuest.findMany({
    where: { characterId, questId: { in: questIds } },
  });

  const progressMap = new Map(progressRecords.map((record) => [record.questId, record]));
  const updatesToRun = [];
  let totalRewardXp = 0;

  for (const update of updates) {
    for (const quest of filteredQuests) {
      const requirement = parseRequirement(quest.requirement);
      if (!requirement || requirement.type !== update.type) {
        continue;
      }

      const target = getTarget(requirement);
      const amount = update.amount ?? 1;
      const existing = progressMap.get(quest.id);
      const previousProgress = existing?.progress ?? 0;
      const previousCompleted = existing?.isCompleted ?? false;

      if (previousCompleted) {
        continue;
      }

      const newProgress = Math.min(previousProgress + amount, target);
      const isCompleted = newProgress >= target;

      updatesToRun.push({ questId: quest.id, newProgress, isCompleted });

      progressMap.set(quest.id, {
        questId: quest.id,
        progress: newProgress,
        isCompleted,
      });

      if (isCompleted && quest.rewardXp > 0) {
        totalRewardXp += quest.rewardXp;
      }
    }
  }

  await prisma.$transaction(async (tx) => {
    for (const { questId, newProgress, isCompleted } of updatesToRun) {
      await tx.characterQuest.upsert({
        where: {
          characterId_questId: {
            characterId,
            questId,
          },
        },
        update: {
          progress: newProgress,
          isCompleted,
          ...(isCompleted ? { completedAt: new Date() } : {}),
        },
        create: {
          characterId,
          questId,
          progress: newProgress,
          isCompleted,
          ...(isCompleted ? { completedAt: new Date() } : {}),
        },
      });
    }
  });

  return { totalRewardXp };
}

async function main() {
  const characterId = process.argv[2];
  const type = process.argv[3];
  const amount = Number(process.argv[4] ?? 1);

  if (!characterId || !type) {
    console.error('Usage: node scripts/apply-quest-progress.js <characterId> <type> [amount]');
    process.exit(1);
  }

  try {
    const result = await applyQuestProgress(characterId, [{ type, amount }]);
    console.log('Quest progress updated:', result);
  } catch (error) {
    console.error('Failed to apply quest progress:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  applyQuestProgress,
};

