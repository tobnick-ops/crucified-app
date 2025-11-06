// Mission API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { calculateMissionDuration } from '@/lib/game/formulas';

export interface Mission {
  id: string;
  bookId: string;
  title: string;
  description: string;
  requiredLevel: number;
  experienceReward: number;
  storyCharacterId: string | null;
  missionType: string;
  estimatedDuration: number;
  objectives: MissionObjective[];
  book: {
    id: string;
    name: string;
    abbreviation: string;
  };
}

export interface MissionObjective {
  id: string;
  objectiveText: string;
  objectiveType: string;
  requiredValue: number;
}

/**
 * Get all available missions for character
 */
export async function getAvailableMissions(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
    },
  });

  if (!character || !character.stats) {
    return [];
  }

  // Get missions that character can access
  const missions = await prisma.mission.findMany({
    where: {
      requiredLevel: { lte: character.level },
    },
    include: {
      book: true,
      objectives: true,
    },
    orderBy: [
      { requiredLevel: 'asc' },
      { title: 'asc' },
    ],
  });

  // Get character mission progress
  const characterMissions = await prisma.characterMission.findMany({
    where: { characterId },
    select: {
      missionId: true,
      status: true,
    },
  });

  const missionProgressMap = new Map(
    characterMissions.map((cm: { missionId: string; status: string }) => [cm.missionId, cm.status])
  );

  // Calculate mission duration based on character level
  return missions.map((mission: { id: string; bookId: string; title: string; description: string; requiredLevel: number; experienceReward: number; storyCharacterId: string | null; missionType: string; estimatedDuration: number | null; book: { id: string; name: string; abbreviation: string }; objectives: { id: string; objectiveText: string; objectiveType: string; requiredValue: number }[] }) => {
    const baseDuration = mission.estimatedDuration || 5; // Default 5 minutes
    const actualDuration = calculateMissionDuration(character.level, baseDuration);
    const status = missionProgressMap.get(mission.id) || 'not_started';

    return {
      id: mission.id,
      bookId: mission.bookId,
      title: mission.title,
      description: mission.description,
      requiredLevel: mission.requiredLevel,
      experienceReward: mission.experienceReward,
      storyCharacterId: mission.storyCharacterId,
      missionType: mission.missionType,
      estimatedDuration: actualDuration,
      book: {
        id: mission.book.id,
        name: mission.book.name,
        abbreviation: mission.book.abbreviation,
      },
      objectives: mission.objectives.map((obj: { id: string; objectiveText: string; objectiveType: string; requiredValue: number }) => ({
        id: obj.id,
        objectiveText: obj.objectiveText,
        objectiveType: obj.objectiveType,
        requiredValue: obj.requiredValue,
      })),
      status,
    };
  });
}

/**
 * Start a mission
 */
export async function startMission(characterId: string, missionId: string) {
  // Check if mission exists
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
    include: {
      objectives: true,
    },
  });

  if (!mission) {
    throw new Error('Mission nicht gefunden');
  }

  // Check character level
  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  if (!character) {
    throw new Error('Charakter nicht gefunden');
  }

  if (character.level < mission.requiredLevel) {
    throw new Error(`Level ${mission.requiredLevel} erforderlich`);
  }

  // Check if mission already started
  const existingMission = await prisma.characterMission.findUnique({
    where: {
      characterId_missionId: {
        characterId,
        missionId,
      },
    },
  });

  if (existingMission && existingMission.status === 'in_progress') {
    throw new Error('Mission bereits gestartet');
  }

  // Create or update mission progress
  const progressJson: Record<string, any> = {};
  mission.objectives.forEach((obj: { id: string; requiredValue: number }) => {
    progressJson[obj.id] = {
      completed: false,
      currentValue: 0,
      requiredValue: obj.requiredValue,
    };
  });

  await prisma.characterMission.upsert({
    where: {
      characterId_missionId: {
        characterId,
        missionId,
      },
    },
    update: {
      status: 'in_progress',
      progressJson: JSON.stringify(progressJson),
      startedAt: new Date(),
    },
    create: {
      characterId,
      missionId,
      status: 'in_progress',
      progressJson: JSON.stringify(progressJson),
      startedAt: new Date(),
    },
  });

  return {
    missionId,
    progress: progressJson,
  };
}

/**
 * Update mission progress
 */
export async function updateMissionProgress(
  characterId: string,
  missionId: string,
  objectiveId: string,
  value: number
) {
  const characterMission = await prisma.characterMission.findUnique({
    where: {
      characterId_missionId: {
        characterId,
        missionId,
      },
    },
  });

  if (!characterMission || characterMission.status !== 'in_progress') {
    throw new Error('Mission nicht gestartet');
  }

  // Parse progress
  const progress = JSON.parse(characterMission.progressJson || '{}');

  if (!progress[objectiveId]) {
    throw new Error('Objective nicht gefunden');
  }

  // Update progress
  progress[objectiveId].currentValue = value;
  progress[objectiveId].completed = 
    progress[objectiveId].currentValue >= progress[objectiveId].requiredValue;

  // Check if all objectives completed
  type ProgressValue = { completed: boolean; currentValue: number; requiredValue: number };
  const allCompleted = (Object.values(progress) as ProgressValue[]).every(
    (obj: ProgressValue) => obj.completed === true
  );

  if (allCompleted) {
    // Complete mission
    await prisma.characterMission.update({
      where: {
        characterId_missionId: {
          characterId,
          missionId,
        },
      },
      data: {
        status: 'completed',
        progressJson: JSON.stringify(progress),
        completedAt: new Date(),
      },
    });

      // Add XP to character
      const mission = await prisma.mission.findUnique({
        where: { id: missionId },
      });

      let experienceGained = 0;

      if (mission) {
        experienceGained = mission.experienceReward;
        const { addXP } = await import('./character');
        await addXP(characterId, mission.experienceReward);

        // Update leaderboard
        const { updateLeaderboard } = await import('./leaderboard');
        await updateLeaderboard(characterId);

        // Unlock fragment if story character exists
        if (mission.storyCharacterId) {
        const fragment = await prisma.fragment.findUnique({
          where: { id: mission.storyCharacterId },
        });

        if (fragment) {
          // Check if fragment already unlocked
          const existingFragment = await prisma.characterFragment.findUnique({
            where: {
              characterId_fragmentId: {
                characterId,
                fragmentId: fragment.id,
              },
            },
          });

          if (!existingFragment) {
            await prisma.characterFragment.create({
              data: {
                characterId,
                fragmentId: fragment.id,
              },
            });
          }
        }
      }
    }

    return {
      completed: true,
      progress,
      experienceGained,
    };
  } else {
    // Update progress
    await prisma.characterMission.update({
      where: {
        characterId_missionId: {
          characterId,
          missionId,
        },
      },
      data: {
        progressJson: JSON.stringify(progress),
      },
    });

    return {
      completed: false,
      progress,
    };
  }
}

