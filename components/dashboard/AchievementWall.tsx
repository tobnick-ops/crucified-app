// Achievement Wall - Grid-View von Achievements/Fragmenten
// Pokemon-GO-Style "Gotta catch 'em all" Feeling

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Fragment {
  id: string;
  characterName: string;
  description: string;
  fragmentType: string;
  isUnlocked: boolean;
}

interface AchievementWallProps {
  fragments: Fragment[];
  completionPercentage: number;
  collectionBonus: number;
}

export const AchievementWall: React.FC<AchievementWallProps> = ({
  fragments,
  completionPercentage,
  collectionBonus,
}) => {
  const fragmentTypes = {
    character: { icon: '👤', color: 'bg-blue-500' },
    location: { icon: '📍', color: 'bg-green-500' },
    concept: { icon: '💡', color: 'bg-purple-500' },
  };

  return (
    <div className="space-y-6">
      {/* Header with Completion */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block"
        >
          <div className="text-6xl font-bold text-[var(--color-temple-gold)] mb-2">
            {completionPercentage}%
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            {fragments.filter(f => f.isUnlocked).length} / {fragments.length} Fragmente
          </div>
        </motion.div>

        <div className="mt-4 bg-[var(--color-temple-gold)] bg-opacity-10 p-4 rounded-lg inline-block">
          <p className="text-lg font-bold text-[var(--color-temple-gold)]">
            Collection Bonus: +{collectionBonus}% Total Strength
          </p>
        </div>
      </div>

      {/* Fragments Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {fragments.map((fragment, index) => {
          const type = fragmentTypes[fragment.fragmentType as keyof typeof fragmentTypes] || fragmentTypes.character;

          return (
            <motion.div
              key={fragment.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="relative group"
            >
              {fragment.isUnlocked ? (
                // Unlocked Fragment
                <div className={`aspect-square ${type.color} rounded-lg p-4 flex flex-col items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform`}>
                  <div className="text-3xl mb-1">{type.icon}</div>
                  <div className="text-xs text-center font-medium line-clamp-2">
                    {fragment.characterName}
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <p className="font-bold mb-1">{fragment.characterName}</p>
                    <p className="text-gray-300">{fragment.description}</p>
                  </div>
                </div>
              ) : (
                // Locked Fragment
                <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center opacity-40">
                  <div className="text-3xl">🔒</div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Charaktere</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Orte</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Konzepte</span>
        </div>
      </div>
    </div>
  );
};

