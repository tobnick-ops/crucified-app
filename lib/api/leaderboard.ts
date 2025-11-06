// Leaderboard API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';

export interface LeaderboardEntry {
  rank: number;
  characterId: string;
  characterName: string;
  level: number;
  strength: number;
  faith?: number;
  collectionPercentage?: number;
  completedBooks?: number;
}

export type LeaderboardCategory = 'total' | 'level' | 'collection' | 'faith' | 'completion';

/**
 * Update leaderboard for character
 */
export async function updateLeaderboard(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
      fragments: true,
      lessons: {
        include: {
          lesson: {
            include: {
              book: true,
            },
          },
        },
      },
    },
  });

  if (!character || !character.stats) {
    return;
  }

  // Calculate collection percentage
  const allFragments = await prisma.fragment.count();
  const unlockedFragments = character.fragments.length;
  const collectionPercentage = allFragments > 0 ? (unlockedFragments / allFragments) * 100 : 0;

  // Calculate completed books
  const completedBooks = new Set(
    character.lessons
      .filter((cl: { score: number }) => cl.score >= 70) // 70%+ score
      .map((cl: { lesson: { bookId: string } }) => cl.lesson.bookId)
  ).size;

  // Update all categories
  const categories: LeaderboardCategory[] = ['total', 'level', 'collection', 'faith', 'completion'];

  for (const category of categories) {
    let value = 0;

    switch (category) {
      case 'total':
        value = character.strength;
        break;
      case 'level':
        value = character.level;
        break;
      case 'collection':
        value = Math.round(collectionPercentage);
        break;
      case 'faith':
        value = character.stats.faith;
        break;
      case 'completion':
        value = completedBooks;
        break;
    }

    // Get current rank
    const rank = await getRank(characterId, category);

    // Update or create leaderboard entry
    await prisma.leaderboard.upsert({
      where: {
        characterId,
      },
      update: {
        totalStrength: value,
        rank,
        rankCategory: category,
        lastUpdated: new Date(),
      },
      create: {
        characterId,
        totalStrength: value,
        rank,
        rankCategory: category,
        lastUpdated: new Date(),
      },
    });
  }
}

/**
 * Get rank for character in category
 */
async function getRank(characterId: string, category: LeaderboardCategory): Promise<number> {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
      fragments: true,
      lessons: {
        include: {
          lesson: {
            include: {
              book: true,
            },
          },
        },
      },
    },
  });

  if (!character || !character.stats) {
    return 0;
  }

  // Calculate value for category
  let characterValue = 0;

  switch (category) {
    case 'total':
      characterValue = character.strength;
      break;
    case 'level':
      characterValue = character.level;
      break;
    case 'collection':
      const allFragments = await prisma.fragment.count();
      const unlockedFragments = character.fragments.length;
      characterValue = allFragments > 0 ? (unlockedFragments / allFragments) * 100 : 0;
      break;
    case 'faith':
      characterValue = character.stats.faith;
      break;
    case 'completion':
      const completedBooks = new Set(
        character.lessons
          .filter((cl: { score: number; lesson: { bookId: string | null } }) => cl.score >= 70)
          .map((cl: { lesson: { bookId: string | null } }) => cl.lesson.bookId)
          .filter((bookId: string | null): bookId is string => bookId !== null)
      ).size;
      characterValue = completedBooks;
      break;
  }

  // Count characters with higher value
  const higherCount = await prisma.character.count({
    where: {
      id: {
        not: characterId,
      },
      ...(category === 'total' && {
        strength: { gt: characterValue },
      }),
      ...(category === 'level' && {
        level: { gt: characterValue },
      }),
      ...(category === 'faith' && {
        stats: {
          faith: { gt: characterValue },
        },
      }),
    },
  });

  return higherCount + 1;
}

/**
 * Get leaderboard for category
 */
export async function getLeaderboard(
  category: LeaderboardCategory = 'total',
  limit: number = 100
): Promise<LeaderboardEntry[]> {
  // Get all characters and calculate values
  const characters = await prisma.character.findMany({
    include: {
      stats: true,
      fragments: true,
      lessons: {
        include: {
          lesson: {
            include: {
              book: true,
            },
          },
        },
      },
    },
  });

  // Calculate values for each character
  const entries = await Promise.all(
    characters.map(async (character: { id: string; name: string; level: number; strength: number; stats: { faith: number } | null; fragments: unknown[]; lessons: { score: number; lesson: { bookId: string | null } }[] }) => {
      if (!character.stats) return null;

      const allFragments = await prisma.fragment.count();
      const unlockedFragments = character.fragments.length;
      const collectionPercentage = allFragments > 0 ? (unlockedFragments / allFragments) * 100 : 0;

      const completedBooks = new Set(
        character.lessons
          .filter((cl: { score: number; lesson: { bookId: string | null } }) => cl.score >= 70)
          .map((cl: { lesson: { bookId: string | null } }) => cl.lesson.bookId)
          .filter((bookId: string | null): bookId is string => bookId !== null)
      ).size;

      let value = 0;
      switch (category) {
        case 'total':
          value = character.strength;
          break;
        case 'level':
          value = character.level;
          break;
        case 'collection':
          value = Math.round(collectionPercentage);
          break;
        case 'faith':
          value = character.stats.faith;
          break;
        case 'completion':
          value = completedBooks;
          break;
      }

      return {
        characterId: character.id,
        characterName: character.name,
        level: character.level,
        strength: character.strength,
        faith: character.stats.faith,
        collectionPercentage: Math.round(collectionPercentage),
        completedBooks,
        value,
      };
    })
  );

  // Filter nulls and sort
  type EntryType = {
    characterId: string;
    characterName: string;
    level: number;
    strength: number;
    faith: number | undefined;
    collectionPercentage: number;
    completedBooks: number;
    value: number;
  };

  const validEntries = entries
    .filter((e: EntryType | null): e is EntryType => e !== null)
    .sort((a: EntryType, b: EntryType) => b.value - a.value)
    .slice(0, limit)
    .map((entry: EntryType, index: number) => ({
      rank: index + 1,
      characterId: entry.characterId,
      characterName: entry.characterName,
      level: entry.level,
      strength: entry.strength,
      faith: entry.faith,
      collectionPercentage: entry.collectionPercentage,
      completedBooks: entry.completedBooks,
    }));

  return validEntries;
}

/**
 * Get character's rank in leaderboard
 */
export async function getCharacterRank(
  characterId: string,
  category: LeaderboardCategory = 'total'
): Promise<{
  rank: number;
  totalPlayers: number;
}> {
  const rank = await getRank(characterId, category);
  const totalPlayers = await prisma.character.count();

  return {
    rank,
    totalPlayers,
  };
}

