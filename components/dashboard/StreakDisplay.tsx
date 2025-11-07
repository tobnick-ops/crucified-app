// Streak Display - Visual Flamme wie Duolingo
// Prominent im Header oder Dashboard

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StreakDisplayProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showMilestone?: boolean;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  size = 'md',
  showLabel = true,
  showMilestone = false,
}) => {
  const sizes = {
    sm: { text: 'text-2xl', number: 'text-lg', container: 'w-16 h-20' },
    md: { text: 'text-4xl', number: 'text-2xl', container: 'w-20 h-24' },
    lg: { text: 'text-6xl', number: 'text-4xl', container: 'w-28 h-32' },
  };

  const { text, number, container } = sizes[size];

  // Milestone detection
  const milestones = [7, 30, 100, 365];
  const nextMilestone = milestones.find(m => m > streak) || 0;
  const isMilestone = milestones.includes(streak);

  // Color based on streak
  const getStreakColor = () => {
    if (streak >= 365) return 'from-purple-500 to-pink-500';
    if (streak >= 100) return 'from-red-500 to-orange-500';
    if (streak >= 30) return 'from-orange-500 to-yellow-500';
    if (streak >= 7) return 'from-yellow-500 to-orange-400';
    return 'from-orange-400 to-red-400';
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`${container} relative flex items-center justify-center`}
        animate={isMilestone ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Streak Flame */}
        <motion.div
          className={`text-center bg-gradient-to-b ${getStreakColor()} bg-clip-text text-transparent`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className={text}>🔥</div>
        </motion.div>

        {/* Streak Number */}
        <div className={`absolute bottom-0 ${number} font-bold text-white drop-shadow-lg`}>
          {streak}
        </div>
      </motion.div>

      {showLabel && (
        <div className="mt-2 text-center">
          <div className="text-sm font-medium">
            {streak === 0 && 'Starte deinen Streak!'}
            {streak === 1 && '1 Tag Streak'}
            {streak > 1 && `${streak} Tage Streak`}
          </div>
          
          {isMilestone && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-[var(--color-temple-gold)] font-bold mt-1"
            >
              🎉 Meilenstein erreicht!
            </motion.div>
          )}

          {showMilestone && nextMilestone > 0 && (
            <div className="text-xs text-[var(--text-secondary)] mt-1">
              Nächster Meilenstein: {nextMilestone} Tage
            </div>
          )}
        </div>
      )}
    </div>
  );
};

