// Equipment API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { ITEM_RARITY, EQUIPMENT_SLOTS } from '@/lib/game/constants';
import { applyQuestProgress } from '@/lib/api/questProgress';

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  itemType: string;
  rarity: string;
  baseStrength: number;
  slot: string;
  iconPath: string | null;
  requiredLevel: number;
}

/**
 * Get all equipment items
 */
export async function getAllEquipment(): Promise<EquipmentItem[]> {
  const items = await prisma.equipmentItem.findMany({
    orderBy: [
      { rarity: 'asc' },
      { requiredLevel: 'asc' },
      { baseStrength: 'desc' },
    ],
  });

  return items.map((item: { id: string; name: string; description: string; itemType: string; rarity: string; baseStrength: number; slot: string; iconPath: string | null; requiredLevel: number }) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    rarity: item.rarity,
    baseStrength: item.baseStrength,
    slot: item.slot,
    iconPath: item.iconPath,
    requiredLevel: item.requiredLevel,
  }));
}

/**
 * Get character's equipment
 */
export async function getCharacterEquipment(characterId: string) {
  const equipment = await prisma.characterEquipment.findMany({
    where: { characterId },
    include: {
      equipment: true,
    },
  });

  return equipment;
}

/**
 * Equip an item
 */
export async function equipItem(characterId: string, equipmentId: string, slot: string) {
  // Prüfe ob Item existiert
  const item = await prisma.equipmentItem.findUnique({
    where: { id: equipmentId },
  });

  if (!item) {
    throw new Error('Item nicht gefunden');
  }

  // Prüfe ob Character Level hoch genug ist
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { stats: true },
  });

  if (!character || !character.stats) {
    throw new Error('Charakter nicht gefunden');
  }

  if (character.level < item.requiredLevel) {
    throw new Error(`Level ${item.requiredLevel} erforderlich`);
  }

  // Unequip Item in diesem Slot falls vorhanden
  await prisma.characterEquipment.updateMany({
    where: {
      characterId,
      slot,
      isEquipped: true,
    },
    data: {
      isEquipped: false,
    },
  });

  // Prüfe ob Character bereits dieses Item hat
  const existingItem = await prisma.characterEquipment.findFirst({
    where: {
      characterId,
      equipmentId,
    },
  });

  let createdNewItem = false;

  if (existingItem) {
    // Item bereits vorhanden, equip it
    await prisma.characterEquipment.update({
      where: { id: existingItem.id },
      data: {
        isEquipped: true,
        slot,
      },
    });
  } else {
    // Neues Item erstellen und equip
    await prisma.characterEquipment.create({
      data: {
        characterId,
        equipmentId,
        slot,
        isEquipped: true,
      },
    });

    createdNewItem = true;
  }

  // Recalculate Total Strength
  await recalculateCharacterStrength(characterId);

  const questUpdates = [{ type: 'equip_item' as const, amount: 1 }];

  if (createdNewItem) {
    questUpdates.push({ type: 'obtain_equipment' as const, amount: 1 });
  }

  await applyQuestProgress(characterId, questUpdates);
}

/**
 * Unequip an item
 */
export async function unequipItem(characterId: string, slot: string) {
  await prisma.characterEquipment.updateMany({
    where: {
      characterId,
      slot,
      isEquipped: true,
    },
    data: {
      isEquipped: false,
    },
  });

  // Recalculate Total Strength
  await recalculateCharacterStrength(characterId);
}

/**
 * Recalculate character's total strength
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
  const equipmentStrength = character.equipment.reduce((sum: number, ce: { equipment: { baseStrength: number } }) => {
    return sum + ce.equipment.baseStrength;
  }, 0);

  // Calculate Set Bonuses
  const { getCharacterSets, calculateSetBonuses } = await import('./sets');
  const characterSets = await getCharacterSets(characterId);
  const setBonuses = characterSets ? calculateSetBonuses(characterSets) : 0;

  // Calculate Fragment Collection Bonus
  const { getCollectionPercentage } = await import('./fragments');
  const fragmentCollectionPercentage = await getCollectionPercentage(characterId);

  const { calculateTotalStrength } = await import('@/lib/game/formulas');
  const totalStrength = calculateTotalStrength(
    {
      faith: character.stats.faith,
      wisdom: character.stats.wisdom,
      knowledge: character.stats.knowledge,
      service: character.stats.service,
      leadership: character.stats.leadership,
    },
    equipmentStrength,
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

  // Update leaderboard
  const { updateLeaderboard } = await import('./leaderboard');
  await updateLeaderboard(characterId);
}

