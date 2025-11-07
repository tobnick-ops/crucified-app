// Achievement Card Component
// Zeigt einzelne Achievements mit Unlock-Status

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  requirement: number;
  rewardXp: number;
  isSecret: boolean;
  isUnlocked?: boolean;
  progress?: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { isUnlocked, isSecret, icon, name, description, rewardXp, progress = 0, requirement } = achievement;

  const categoryColors = {
    LEARNING: 'bg-blue-500',
    EXPLORATION: 'bg-green-500',
    COLLECTION: 'bg-purple-500',
    SOCIAL: 'bg-pink-500',
    MASTER: 'bg-yellow-500',
  };

  const bgColor = categoryColors[achievement.category as keyof typeof categoryColors] || 'bg-gray-500';

  if (isSecret && !isUnlocked) {
    return (
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 opacity-50">
        <div className="text-center">
          <div className="text-4xl mb-2">🔒</div>
          <div className="font-bold text-sm">Geheimes Achievement</div>
          <div className="text-xs text-[var(--text-secondary)]">???</div>
        </div>
      </div>
    );
  }

  const progressPercentage = isUnlocked ? 100 : (progress / requirement) * 100;

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, y: -4 } : { scale: 1.02 }}
      className={`rounded-lg p-4 ${isUnlocked ? `${bgColor} text-white` : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'} transition-shadow hover:shadow-lg cursor-pointer relative overflow-hidden`}
    >
      {/* Unlocked Glow Effect */}
      {isUnlocked && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-white opacity-20"
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <div className="font-bold text-lg mb-1">{name}</div>
            <div className={`text-sm mb-2 ${isUnlocked ? 'opacity-90' : 'text-[var(--text-secondary)]'}`}>
              {description}
            </div>

            {!isUnlocked && (
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Fortschritt</span>
                  <span>{progress} / {requirement}</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${bgColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            <div className={`text-xs flex items-center gap-2 ${isUnlocked ? 'opacity-90' : 'text-[var(--color-temple-gold)]'}`}>
              <span>⚡ +{rewardXp} XP</span>
              {isUnlocked && <span className="ml-auto">✅ Freigeschaltet</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

