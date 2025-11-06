// Equipment Sets API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';

export interface EquipmentSet {
  id: string;
  name: string;
  description: string;
  bonus2Piece: string | null;
  bonus4Piece: string | null;
  bonus6Piece: string | null;
  items: Array<{
    id: string;
    name: string;
    slot: string;
  }>;
}

/**
 * Get all equipment sets
 */
export async function getAllSets(): Promise<EquipmentSet[]> {
  const sets = await prisma.equipmentSet.findMany({
    include: {
      setItems: {
        include: {
          equipment: {
            select: {
              id: true,
              name: true,
              slot: true,
            },
          },
        },
      },
    },
  });

  return sets.map((set: { id: string; name: string; description: string; bonus2Piece: number; bonus4Piece: number; bonus6Piece: number; setItems: { equipment: { id: string; name: string; slot: string } }[] }) => ({
    id: set.id,
    name: set.name,
    description: set.description,
    bonus2Piece: set.bonus2Piece,
    bonus4Piece: set.bonus4Piece,
    bonus6Piece: set.bonus6Piece,
    items: set.setItems.map((si: { equipment: { id: string; name: string; slot: string } }) => ({
      id: si.equipment.id,
      name: si.equipment.name,
      slot: si.equipment.slot,
    })),
  }));
}

/**
 * Get character's equipped sets
 */
export async function getCharacterSets(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      equipment: {
        where: { isEquipped: true },
        include: {
          equipment: {
            include: {
              setItems: {
                include: {
                  set: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!character) {
    return null;
  }

  // Group equipped items by set
  const setMap = new Map<string, {
    set: EquipmentSet;
    equippedItems: string[];
    count: number;
  }>();

  for (const ce of character.equipment) {
    for (const setItem of ce.equipment.setItems) {
      const setId = setItem.set.id;
      
      if (!setMap.has(setId)) {
        setMap.set(setId, {
          set: {
            id: setItem.set.id,
            name: setItem.set.name,
            description: setItem.set.description,
            bonus2Piece: setItem.set.bonus2Piece,
            bonus4Piece: setItem.set.bonus4Piece,
            bonus6Piece: setItem.set.bonus6Piece,
            items: [], // Will be populated later
          },
          equippedItems: [],
          count: 0,
        });
      }

      const setInfo = setMap.get(setId)!;
      if (!setInfo.equippedItems.includes(ce.equipment.id)) {
        setInfo.equippedItems.push(ce.equipment.id);
        setInfo.count++;
      }
    }
  }

  // Get full set info for each set
  const allSets = await getAllSets();
  const characterSets = Array.from(setMap.values()).map((setInfo) => {
    const fullSet = allSets.find((s) => s.id === setInfo.set.id);
    return {
      ...setInfo.set,
      items: fullSet?.items || [],
      equippedItems: setInfo.equippedItems,
      count: setInfo.count,
      activeBonuses: getActiveBonuses(setInfo.count, setInfo.set),
    };
  });

  return characterSets;
}

/**
 * Get active bonuses based on equipped piece count
 */
function getActiveBonuses(count: number, set: EquipmentSet): string[] {
  const bonuses: string[] = [];

  if (count >= 2 && set.bonus2Piece) {
    bonuses.push(set.bonus2Piece);
  }
  if (count >= 4 && set.bonus4Piece) {
    bonuses.push(set.bonus4Piece);
  }
  if (count >= 6 && set.bonus6Piece) {
    bonuses.push(set.bonus6Piece);
  }

  return bonuses;
}

/**
 * Calculate set bonuses strength
 */
export function calculateSetBonuses(characterSets: any[]): number {
  let totalBonus = 0;

  for (const set of characterSets) {
    if (set.count >= 2 && set.bonus2Piece) {
      // Parse bonus (e.g., "+20% Faith" or "+50 Strength")
      const bonus = parseBonus(set.bonus2Piece);
      totalBonus += bonus.strength || 0;
    }
    if (set.count >= 4 && set.bonus4Piece) {
      const bonus = parseBonus(set.bonus4Piece);
      totalBonus += bonus.strength || 0;
    }
    if (set.count >= 6 && set.bonus6Piece) {
      const bonus = parseBonus(set.bonus6Piece);
      totalBonus += bonus.strength || 0;
    }
  }

  return totalBonus;
}

/**
 * Parse bonus string (e.g., "+20% Faith" or "+50 Strength")
 */
function parseBonus(bonusText: string): { strength?: number; percentage?: number } {
  // Simple parsing - can be enhanced
  const strengthMatch = bonusText.match(/\+(\d+)\s*Strength/i);
  if (strengthMatch) {
    return { strength: parseInt(strengthMatch[1], 10) };
  }

  const percentageMatch = bonusText.match(/\+(\d+)%/i);
  if (percentageMatch) {
    return { percentage: parseInt(percentageMatch[1], 10) };
  }

  return {};
}

