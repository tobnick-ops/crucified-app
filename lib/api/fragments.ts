// Fragment System API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { GAME_CONFIG } from '@/lib/game/constants';

export interface Fragment {
  id: string;
  bookId: string | null;
  characterName: string | null;
  description: string;
  unlockCondition: string;
  iconPath: string | null;
  fragmentType: string; // 'character' | 'location' | 'concept'
  book?: {
    id: string;
    name: string;
    abbreviation: string;
  };
}

/**
 * Get all fragments
 */
export async function getAllFragments(): Promise<Fragment[]> {
  const fragments = await prisma.fragment.findMany({
    include: {
      book: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
    },
    orderBy: [
      { fragmentType: 'asc' },
      { characterName: 'asc' },
    ],
  });

  return fragments.map((fragment: { id: string; bookId: string | null; characterName: string | null; description: string; unlockCondition: string; iconPath: string | null; fragmentType: string; book: { id: string; name: string; abbreviation: string } | null }) => ({
    id: fragment.id,
    bookId: fragment.bookId,
    characterName: fragment.characterName,
    description: fragment.description,
    unlockCondition: fragment.unlockCondition,
    iconPath: fragment.iconPath,
    fragmentType: fragment.fragmentType,
    book: fragment.book ? {
      id: fragment.book.id,
      name: fragment.book.name,
      abbreviation: fragment.book.abbreviation,
    } : undefined,
  }));
}

/**
 * Get character's unlocked fragments
 */
export async function getCharacterFragments(characterId: string) {
  const characterFragments = await prisma.characterFragment.findMany({
    where: { characterId },
    include: {
      fragment: {
        include: {
          book: {
            select: {
              id: true,
              name: true,
              abbreviation: true,
            },
          },
        },
      },
    },
    orderBy: {
      unlockedAt: 'desc',
    },
  });

  return characterFragments.map((cf: { fragment: { id: string; bookId: string | null; characterName: string | null; description: string; unlockCondition: string; iconPath: string | null; fragmentType: string; book: { id: string; name: string; abbreviation: string } | null }; unlockedAt: Date }) => ({
    id: cf.fragment.id,
    bookId: cf.fragment.bookId,
    characterName: cf.fragment.characterName,
    description: cf.fragment.description,
    unlockCondition: cf.fragment.unlockCondition,
    iconPath: cf.fragment.iconPath,
    fragmentType: cf.fragment.fragmentType,
    unlockedAt: cf.unlockedAt,
    book: cf.fragment.book ? {
      id: cf.fragment.book.id,
      name: cf.fragment.book.name,
      abbreviation: cf.fragment.book.abbreviation,
    } : undefined,
  }));
}

/**
 * Calculate collection percentage
 */
export async function getCollectionPercentage(characterId: string): Promise<number> {
  const allFragments = await prisma.fragment.count();
  const unlockedFragments = await prisma.characterFragment.count({
    where: { characterId },
  });

  if (allFragments === 0) return 0;

  return (unlockedFragments / allFragments) * 100;
}

/**
 * Get collection bonus
 */
export function getCollectionBonus(collectionPercentage: number): number {
  if (collectionPercentage >= 100) {
    return GAME_CONFIG.COLLECTION_BONUS_100;
  } else if (collectionPercentage >= 50) {
    return GAME_CONFIG.COLLECTION_BONUS_50;
  } else if (collectionPercentage >= 25) {
    return GAME_CONFIG.COLLECTION_BONUS_25;
  } else if (collectionPercentage >= 10) {
    return GAME_CONFIG.COLLECTION_BONUS_10;
  }
  return 0;
}

/**
 * Get collection bonus strength
 */
export function calculateCollectionBonusStrength(
  statsSum: number,
  collectionPercentage: number
): number {
  const bonusMultiplier = getCollectionBonus(collectionPercentage);
  return Math.floor(statsSum * bonusMultiplier);
}

