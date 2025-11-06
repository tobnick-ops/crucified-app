// Socket System API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';

export interface SocketStone {
  id: string;
  name: string;
  stoneType: string; // 'FAITH' | 'WISDOM' | 'KNOWLEDGE' | 'SERVICE' | 'LEADERSHIP' | 'STRENGTH'
  level: number;
  statBonus: number;
}

/**
 * Socket a stone into equipment
 */
export async function socketStone(
  characterEquipmentId: string,
  stoneType: string,
  stoneLevel: number = 1
): Promise<void> {
  const characterEquipment = await prisma.characterEquipment.findUnique({
    where: { id: characterEquipmentId },
    include: {
      equipment: {
        include: {
          sockets: true,
        },
      },
    },
  });

  if (!characterEquipment) {
    throw new Error('Character Equipment nicht gefunden');
  }

  // Prüfe ob Equipment Sockets hat
  const sockets = characterEquipment.equipment.sockets;
  if (!sockets || sockets.length === 0) {
    throw new Error('Equipment hat keine Sockets');
  }

  // Prüfe ob bereits Steine vorhanden sind
  const currentStones = characterEquipment.socketedStones;
  if (currentStones.length >= sockets[0].maxSockets) {
    throw new Error('Maximale Anzahl an Sockets erreicht');
  }

  // Füge Stone hinzu
  const newStone = `${stoneType}:${stoneLevel}`;
  const updatedStones = [...currentStones, newStone];

  await prisma.characterEquipment.update({
    where: { id: characterEquipmentId },
    data: {
      socketedStones: updatedStones,
    },
  });

  // Recalculate Total Strength
  await recalculateCharacterStrength(characterEquipment.characterId);
}

/**
 * Remove a stone from equipment
 */
export async function removeStone(
  characterEquipmentId: string,
  stoneIndex: number
): Promise<void> {
  const characterEquipment = await prisma.characterEquipment.findUnique({
    where: { id: characterEquipmentId },
  });

  if (!characterEquipment) {
    throw new Error('Character Equipment nicht gefunden');
  }

  const stones = characterEquipment.socketedStones;
  if (stoneIndex < 0 || stoneIndex >= stones.length) {
    throw new Error('Ungültiger Stone-Index');
  }

  // Entferne Stone
  const updatedStones = stones.filter((_: string, index: number) => index !== stoneIndex);

  await prisma.characterEquipment.update({
    where: { id: characterEquipmentId },
    data: {
      socketedStones: updatedStones,
    },
  });

  // Recalculate Total Strength
  await recalculateCharacterStrength(characterEquipment.characterId);
}

/**
 * Upgrade a stone (Level up)
 */
export async function upgradeStone(
  characterEquipmentId: string,
  stoneIndex: number
): Promise<void> {
  const characterEquipment = await prisma.characterEquipment.findUnique({
    where: { id: characterEquipmentId },
  });

  if (!characterEquipment) {
    throw new Error('Character Equipment nicht gefunden');
  }

  const stones = characterEquipment.socketedStones;
  if (stoneIndex < 0 || stoneIndex >= stones.length) {
    throw new Error('Ungültiger Stone-Index');
  }

  // Parse Stone
  const [stoneType, stoneLevelStr] = stones[stoneIndex].split(':');
  const currentLevel = parseInt(stoneLevelStr, 10);
  const maxLevel = 5;

  if (currentLevel >= maxLevel) {
    throw new Error('Stone bereits auf maximalem Level');
  }

  // Upgrade Stone
  const newLevel = currentLevel + 1;
  const updatedStones = [...stones];
  updatedStones[stoneIndex] = `${stoneType}:${newLevel}`;

  await prisma.characterEquipment.update({
    where: { id: characterEquipmentId },
    data: {
      socketedStones: updatedStones,
    },
  });

  // Recalculate Total Strength
  await recalculateCharacterStrength(characterEquipment.characterId);
}

/**
 * Recalculate character strength with socket bonuses
 */
async function recalculateCharacterStrength(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
      equipment: {
        where: { isEquipped: true },
        include: {
          equipment: true,
        },
      },
    },
  });

  if (!character || !character.stats) {
    return;
  }

  // Calculate Equipment Strength
  let equipmentStrength = 0;
  let socketBonuses = {
    faith: 0,
    wisdom: 0,
    knowledge: 0,
    service: 0,
    leadership: 0,
    strength: 0,
  };

  for (const ce of character.equipment) {
    equipmentStrength += ce.equipment.baseStrength;

    // Calculate Socket Bonuses
    for (const stone of ce.socketedStones) {
      const [stoneType, stoneLevelStr] = stone.split(':');
      const stoneLevel = parseInt(stoneLevelStr, 10);
      const bonusPerLevel = 5; // +5 per level

      switch (stoneType) {
        case 'FAITH':
          socketBonuses.faith += bonusPerLevel * stoneLevel;
          break;
        case 'WISDOM':
          socketBonuses.wisdom += bonusPerLevel * stoneLevel;
          break;
        case 'KNOWLEDGE':
          socketBonuses.knowledge += bonusPerLevel * stoneLevel;
          break;
        case 'SERVICE':
          socketBonuses.service += bonusPerLevel * stoneLevel;
          break;
        case 'LEADERSHIP':
          socketBonuses.leadership += bonusPerLevel * stoneLevel;
          break;
        case 'STRENGTH':
          socketBonuses.strength += 10 * stoneLevel; // +10 Strength per level
          break;
      }
    }
  }

  // Apply Socket Bonuses to Stats
  const statsWithBonuses = {
    faith: character.stats.faith + socketBonuses.faith,
    wisdom: character.stats.wisdom + socketBonuses.wisdom,
    knowledge: character.stats.knowledge + socketBonuses.knowledge,
    service: character.stats.service + socketBonuses.service,
    leadership: character.stats.leadership + socketBonuses.leadership,
  };

  // Calculate Set Bonuses
  const { getCharacterSets, calculateSetBonuses } = await import('./sets');
  const characterSets = await getCharacterSets(characterId);
  const setBonuses = characterSets ? calculateSetBonuses(characterSets) : 0;

  // Calculate Fragment Collection Bonus
  const { getCollectionPercentage } = await import('./fragments');
  const fragmentCollectionPercentage = await getCollectionPercentage(characterId);

  const { calculateTotalStrength } = await import('@/lib/game/formulas');
  const totalStrength = calculateTotalStrength(
    statsWithBonuses,
    equipmentStrength + socketBonuses.strength,
    setBonuses,
    fragmentCollectionPercentage
  );

  // Update Character und Stats
  await prisma.character.update({
    where: { id: characterId },
    data: { strength: totalStrength },
  });

  await prisma.characterStats.update({
    where: { characterId },
    data: { totalStrength },
  });
}

