// Game Formulas gemäß Masterplan

import { GAME_CONFIG } from './constants';

/**
 * Berechnet Total Strength gemäß Masterplan
 * Total Strength = (Stats Summe) + Equipment Strength + Set Bonuses + Fragment Collection Bonus
 */
export function calculateTotalStrength(
  stats: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
  },
  equipmentStrength: number,
  setBonuses: number,
  fragmentCollectionPercentage: number
): number {
  const statsSum = stats.faith + stats.wisdom + stats.knowledge + stats.service + stats.leadership;
  
  // Fragment Collection Bonus
  let collectionBonus = 0;
  if (fragmentCollectionPercentage >= 100) {
    collectionBonus = statsSum * GAME_CONFIG.COLLECTION_BONUS_100;
  } else if (fragmentCollectionPercentage >= 50) {
    collectionBonus = statsSum * GAME_CONFIG.COLLECTION_BONUS_50;
  } else if (fragmentCollectionPercentage >= 25) {
    collectionBonus = statsSum * GAME_CONFIG.COLLECTION_BONUS_25;
  } else if (fragmentCollectionPercentage >= 10) {
    collectionBonus = statsSum * GAME_CONFIG.COLLECTION_BONUS_10;
  }
  
  return Math.floor(statsSum + equipmentStrength + setBonuses + collectionBonus);
}

/**
 * Berechnet XP-Threshold für Level
 */
export function getXPForLevel(level: number): number {
  if (level === 1) return 0;
  return Math.floor(GAME_CONFIG.XP_PER_LEVEL_BASE * Math.pow(GAME_CONFIG.XP_MULTIPLIER, level - 2));
}

/**
 * Berechnet benötigte XP für nächstes Level
 */
export function getXPForNextLevel(currentLevel: number): number {
  return getXPForLevel(currentLevel + 1) - getXPForLevel(currentLevel);
}

/**
 * Berechnet Mission-Dauer basierend auf Level und Fortschritt
 * Start bei 5 Min, steigt mit Level, max 45 Min
 */
export function calculateMissionDuration(level: number, missionBaseDuration: number): number {
  const levelMultiplier = Math.min(1 + (level - 1) * 0.1, 9); // Max 9x = 45 Min bei 5 Min Base
  const duration = Math.floor(missionBaseDuration * levelMultiplier);
  return Math.min(duration, GAME_CONFIG.MISSION_MAX_DURATION);
}

