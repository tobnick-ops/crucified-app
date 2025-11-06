// Daily System API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { GAME_CONFIG } from '@/lib/game/constants';

export interface DailyCurrency {
  date: Date;
  lessonsRemaining: number;
  currencyEarned: number;
  nightWatchCompleted: boolean;
}

/**
 * Get or create daily currency for today
 */
export async function getDailyCurrency(characterId: string): Promise<DailyCurrency> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dailyCurrency = await prisma.dailyCurrency.findUnique({
    where: {
      characterId_date: {
        characterId,
        date: today,
      },
    },
  });

  if (!dailyCurrency) {
    // Create daily currency for today
    dailyCurrency = await prisma.dailyCurrency.create({
      data: {
        characterId,
        date: today,
        lessonsRemaining: GAME_CONFIG.DAILY_LESSON_LIMIT,
        currencyEarned: 0,
        nightWatchCompleted: false,
      },
    });
  }

  return {
    date: dailyCurrency.date,
    lessonsRemaining: dailyCurrency.lessonsRemaining,
    currencyEarned: dailyCurrency.currencyEarned,
    nightWatchCompleted: dailyCurrency.nightWatchCompleted,
  };
}

/**
 * Complete night watch
 */
export async function completeNightWatch(characterId: string): Promise<{
  currencyEarned: number;
  streakBonus: number;
}> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dailyCurrency = await getDailyCurrency(characterId);

  if (dailyCurrency.nightWatchCompleted) {
    throw new Error('Nachtwache bereits abgeschlossen');
  }

  // Calculate streak
  const streak = await getStreak(characterId);
  const baseCurrency = 50;
  const streakBonus = Math.min(streak * 10, 100); // Max 100 bonus
  const totalCurrency = baseCurrency + streakBonus;

  // Update daily currency
  await prisma.dailyCurrency.update({
    where: {
      characterId_date: {
        characterId,
        date: today,
      },
    },
    data: {
      nightWatchCompleted: true,
      currencyEarned: { increment: totalCurrency },
    },
  });

  // Add currency to character
  // TODO: Implement currency system if needed

  return {
    currencyEarned: totalCurrency,
    streakBonus,
  };
}

/**
 * Get login streak
 */
export async function getStreak(characterId: string): Promise<number> {
  // Get last 7 days of daily currency
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }

  const dailyCurrencies = await prisma.dailyCurrency.findMany({
    where: {
      characterId,
      date: {
        in: dates,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  // Calculate streak
  let streak = 0;
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const currency = dailyCurrencies.find((dc: { date: Date; lessonsRemaining: number; nightWatchCompleted: boolean }) => {
      const dcDate = new Date(dc.date);
      dcDate.setHours(0, 0, 0, 0);
      return dcDate.getTime() === date.getTime();
    });

    if (currency && (currency.lessonsRemaining < GAME_CONFIG.DAILY_LESSON_LIMIT || currency.nightWatchCompleted)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get weekly bonus
 */
export async function getWeeklyBonus(characterId: string): Promise<{
  eligible: boolean;
  bonus: number;
}> {
  const streak = await getStreak(characterId);
  const eligible = streak >= 7;

  return {
    eligible,
    bonus: eligible ? 200 : 0, // 200 currency bonus for 7-day streak
  };
}

