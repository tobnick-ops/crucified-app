// Character API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { calculateTotalStrength, getXPForLevel } from '@/lib/game/formulas';

export interface CharacterWithStats {
  id: string;
  name: string;
  level: number;
  experience: number;
  strength: number;
  stats: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
    totalStrength: number;
  };
}

/**
 * Add XP to character and handle level-up logic
 */
export async function addXP(characterId: string, xpAmount: number): Promise<{
  leveledUp: boolean;
  newLevel: number;
  newXP: number;
  statsGained?: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
  };
}> {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { stats: true },
  });

  if (!character || !character.stats) {
    throw new Error('Character nicht gefunden');
  }

  const oldLevel = character.level;
  const newXP = character.experience + xpAmount;
  let newLevel = oldLevel;
  let leveledUp = false;
  let statsGained = undefined;

  // Prüfe Level-Ups
  while (true) {
    const xpForNextLevel = getXPForLevel(newLevel + 1);
    if (newXP >= xpForNextLevel) {
      newLevel++;
      leveledUp = true;
    } else {
      break;
    }
  }

  // Stats-Gain bei Level-Up (gemäß Masterplan)
  if (leveledUp) {
    const levelsGained = newLevel - oldLevel;
    // Pro Level-Up: +1 zu allen Stats
    statsGained = {
      faith: levelsGained,
      wisdom: levelsGained,
      knowledge: levelsGained,
      service: levelsGained,
      leadership: levelsGained,
    };

    // Update Stats
    await prisma.characterStats.update({
      where: { characterId },
      data: {
        faith: { increment: statsGained.faith },
        wisdom: { increment: statsGained.wisdom },
        knowledge: { increment: statsGained.knowledge },
        service: { increment: statsGained.service },
        leadership: { increment: statsGained.leadership },
      },
    });
  }

  // Update Character
  await prisma.character.update({
    where: { id: characterId },
    data: {
      level: newLevel,
      experience: newXP,
    },
  });

  // Recalculate Total Strength
  const updatedStats = await prisma.characterStats.findUnique({
    where: { characterId },
  });

  if (updatedStats) {
    // TODO: Equipment Strength und Set Bonuses hinzufügen
    const totalStrength = calculateTotalStrength(
      {
        faith: updatedStats.faith,
        wisdom: updatedStats.wisdom,
        knowledge: updatedStats.knowledge,
        service: updatedStats.service,
        leadership: updatedStats.leadership,
      },
      0, // Equipment Strength (später)
      0, // Set Bonuses (später)
      0  // Fragment Collection % (später)
    );

    await prisma.character.update({
      where: { id: characterId },
      data: { strength: totalStrength },
    });

    await prisma.characterStats.update({
      where: { characterId },
      data: { totalStrength },
    });
  }

  return {
    leveledUp,
    newLevel,
    newXP,
    statsGained,
  };
}

/**
 * Get character with all stats
 */
export async function getCharacterWithStats(characterId: string): Promise<CharacterWithStats | null> {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
    },
  });

  if (!character || !character.stats) {
    return null;
  }

  return {
    id: character.id,
    name: character.name,
    level: character.level,
    experience: character.experience,
    strength: character.strength,
    stats: {
      faith: character.stats.faith,
      wisdom: character.stats.wisdom,
      knowledge: character.stats.knowledge,
      service: character.stats.service,
      leadership: character.stats.leadership,
      totalStrength: character.stats.totalStrength,
    },
  };
}

/**
 * Update character stats manually (für Skills/Equipment)
 */
export async function updateCharacterStats(
  characterId: string,
  stats: {
    faith?: number;
    wisdom?: number;
    knowledge?: number;
    service?: number;
    leadership?: number;
  }
): Promise<void> {
  // Update Stats
  await prisma.characterStats.update({
    where: { characterId },
    data: stats,
  });

  // Recalculate Total Strength
  const updatedStats = await prisma.characterStats.findUnique({
    where: { characterId },
  });

  if (updatedStats) {
    const totalStrength = calculateTotalStrength(
      {
        faith: updatedStats.faith,
        wisdom: updatedStats.wisdom,
        knowledge: updatedStats.knowledge,
        service: updatedStats.service,
        leadership: updatedStats.leadership,
      },
      0, // Equipment Strength (später)
      0, // Set Bonuses (später)
      0  // Fragment Collection % (später)
    );

    await prisma.character.update({
      where: { id: characterId },
      data: { strength: totalStrength },
    });

    await prisma.characterStats.update({
      where: { characterId },
      data: { totalStrength },
    });

    // Update leaderboard
    const { updateLeaderboard } = await import('./leaderboard');
    await updateLeaderboard(characterId);
  }
}

