import { prisma } from '@/lib/prisma';
import { addXP } from '@/lib/api/character';

export type QuestRequirement = {
  type: string;
  value?: number;
  lessons?: number;
  missions?: number;
  friends?: number;
  challenges?: number;
};

type QuestUpdateType =
  | 'complete_lessons'
  | 'perfect_lesson'
  | 'complete_missions'
  | 'lessons_and_missions'
  | 'unlock_fragment'
  | 'unlock_fragments'
  | 'equip_item'
  | 'obtain_equipment'
  | 'unlock_skill'
  | 'unlock_skills'
  | 'earn_xp';

interface QuestUpdate {
  type: QuestUpdateType;
  amount?: number;
}

export function parseQuestRequirement(requirement: unknown): QuestRequirement | null {
  if (!requirement) {
    return null;
  }

  if (typeof requirement === 'string') {
    try {
      return JSON.parse(requirement) as QuestRequirement;
    } catch (error) {
      console.warn('Quest requirement JSON parse error:', error);
      return null;
    }
  }

  return requirement as QuestRequirement;
}

export function getQuestRequirementTarget(req: QuestRequirement | null): number {
  if (!req) {
    return 1;
  }

  if (typeof req.value === 'number') {
    return req.value;
  }

  if (req.type === 'lessons_and_missions') {
    return (req.lessons ?? 0) + (req.missions ?? 0);
  }

  if (req.type === 'social_activity') {
    return (req.friends ?? 0) + (req.challenges ?? 0);
  }

  return 1;
}

export async function ensureCharacterQuestEntries(
  characterId: string,
  questIds: string[],
) {
  if (questIds.length === 0) {
    return;
  }

  const existing = await prisma.characterQuest.findMany({
    where: {
      characterId,
      questId: { in: questIds },
    },
    select: { questId: true },
  });

  const existingIds = new Set(existing.map((entry) => entry.questId));
  const missingIds = questIds.filter((id) => !existingIds.has(id));

  if (missingIds.length === 0) {
    return;
  }

  await prisma.$transaction(
    missingIds.map((questId) =>
      prisma.characterQuest.create({
        data: {
          characterId,
          questId,
          progress: 0,
          isCompleted: false,
        },
      }),
    ),
  );
}

export async function applyQuestProgress(
  characterId: string,
  updates: QuestUpdate[],
) {
  if (updates.length === 0) {
    return;
  }

  const types = Array.from(new Set(updates.map((update) => update.type)));

  const quests = await prisma.quest.findMany({
    where: {
      isActive: true,
    },
  });

  const questsByType = new Map<string, typeof quests>();

  for (const quest of quests) {
    const requirement = parseQuestRequirement(quest.requirement);
    const type = requirement?.type;

    if (!type || !types.includes(type as QuestUpdateType)) {
      continue;
    }

    const list = questsByType.get(type) ?? [];
    list.push(quest);
    questsByType.set(type, list);
  }

  if (questsByType.size === 0) {
    return;
  }

  const questIds = Array.from(questsByType.values())
    .flat()
    .map((quest) => quest.id);

  const progressRecords = await prisma.characterQuest.findMany({
    where: {
      characterId,
      questId: { in: questIds },
    },
  });

  const progressMap = new Map(progressRecords.map((record) => [record.questId, record]));
  const xpRewardsToGrant: number[] = [];

  await prisma.$transaction(async (tx) => {
    for (const update of updates) {
      const relevantQuests = questsByType.get(update.type);

      if (!relevantQuests || relevantQuests.length === 0) {
        continue;
      }

      const amount = update.amount ?? 1;

      for (const quest of relevantQuests) {
        const requirement = parseQuestRequirement(quest.requirement);
        const target = getQuestRequirementTarget(requirement);

        if (target <= 0) {
          continue;
        }

        const existing = progressMap.get(quest.id);
        const previousProgress = existing?.progress ?? 0;
        const previousCompleted = existing?.isCompleted ?? false;

        if (previousCompleted) {
          continue;
        }

        const newProgress = Math.min(previousProgress + amount, target);
        const isCompleted = newProgress >= target;

        const data: {
          progress: number;
          isCompleted: boolean;
          completedAt?: Date | null;
        } = {
          progress: newProgress,
          isCompleted,
        };

        if (isCompleted) {
          data.completedAt = new Date();
        }

        const updatedRecord = await tx.characterQuest.upsert({
          where: {
            characterId_questId: {
              characterId,
              questId: quest.id,
            },
          },
          update: data,
          create: {
            characterId,
            questId: quest.id,
            progress: Math.min(amount, target),
            isCompleted: amount >= target,
            ...(amount >= target ? { completedAt: new Date() } : {}),
          },
        });

        progressMap.set(quest.id, updatedRecord);

        if (!previousCompleted && updatedRecord.isCompleted && quest.rewardXp > 0) {
          xpRewardsToGrant.push(quest.rewardXp);
        }
      }
    }
  });

  if (xpRewardsToGrant.length > 0) {
    const totalXp = xpRewardsToGrant.reduce((sum, value) => sum + value, 0);
    if (totalXp > 0) {
      await addXP(characterId, totalXp);
    }
  }
}


