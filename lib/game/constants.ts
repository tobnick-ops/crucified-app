// Game Constants gemäß Masterplan

export const GAME_CONFIG = {
  // Daily Limits
  DAILY_LESSON_LIMIT: 5,
  
  // Mission Duration (in Minuten)
  MISSION_MIN_DURATION: 5,
  MISSION_MAX_DURATION: 45,
  
  // Leveling
  XP_PER_LEVEL_BASE: 100,
  XP_MULTIPLIER: 1.5,
  
  // Collection Bonuses (Sammelbuch)
  COLLECTION_BONUS_10: 0.05,  // +5% Total Strength
  COLLECTION_BONUS_25: 0.10,  // +10% Total Strength
  COLLECTION_BONUS_50: 0.20,  // +20% Total Strength
  COLLECTION_BONUS_100: 0.50, // +50% Total Strength
} as const;

export const ITEM_RARITY = {
  COMMON: {
    name: 'Common',
    color: '#808080',
    strengthRange: { min: 5, max: 10 },
  },
  UNCOMMON: {
    name: 'Uncommon',
    color: '#00FF00',
    strengthRange: { min: 10, max: 20 },
  },
  RARE: {
    name: 'Rare',
    color: '#0080FF',
    strengthRange: { min: 20, max: 35 },
  },
  EPIC: {
    name: 'Epic',
    color: '#8000FF',
    strengthRange: { min: 35, max: 50 },
  },
  LEGENDARY: {
    name: 'Legendary',
    color: '#FF8000',
    strengthRange: { min: 50, max: 100 },
  },
  ARTIFACT: {
    name: 'Artifact',
    color: '#FFD700',
    strengthRange: { min: 100, max: 200 },
  },
} as const;

export const EQUIPMENT_SLOTS = [
  'HELM',
  'SHOULDER',
  'CHEST',
  'LEGS',
  'FEET',
  'WEAPON',
  'ACCESSORY',
] as const;

export const SKILL_TYPES = {
  PROPHETIC: 'Prophetic',
  TONGUES: 'Tongues',
  FRUIT_OF_SPIRIT: 'Fruit of Spirit',
  TEMPLE_SERVICE: 'Temple Service',
  LEADERSHIP: 'Leadership',
} as const;

export const MISSION_TYPES = {
  RESOURCE_COLLECTION: 'Resource Collection',
  STORY_INTERACTION: 'Story Interaction',
  COMBAT: 'Combat',
  PUZZLE: 'Puzzle',
} as const;

