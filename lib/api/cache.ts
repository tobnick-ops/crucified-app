// API Cache Configuration gemäß Masterplan

import { memoryCache } from '@/lib/utils/cache';

/**
 * Cache leaderboard data (6 hours)
 */
export const LEADERBOARD_CACHE_TTL = 6 * 60 * 60 * 1000;

/**
 * Cache equipment data (1 hour)
 */
export const EQUIPMENT_CACHE_TTL = 60 * 60 * 1000;

/**
 * Cache fragments data (30 minutes)
 */
export const FRAGMENTS_CACHE_TTL = 30 * 60 * 1000;

/**
 * Cache missions data (15 minutes)
 */
export const MISSIONS_CACHE_TTL = 15 * 60 * 1000;

/**
 * Get cached data or fetch new
 */
export async function getCachedOrFetch<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  ttl: number
): Promise<T> {
  const cached = memoryCache.get<T>(cacheKey);

  if (cached) {
    return cached;
  }

  const data = await fetchFn();
  memoryCache.set(cacheKey, data, ttl);

  return data;
}

