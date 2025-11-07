// Daily Goal Ring - Circular Progress für tägliche Ziele
// Motiviert User, tägliche Aufgaben zu erledigen

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DailyGoalRingProps {
  lessonsCompleted: number;
  lessonsGoal: number;
  size?: number;
}

export const DailyGoalRing: React.FC<DailyGoalRingProps> = ({
  lessonsCompleted,
  lessonsGoal,
  size = 120,
}) => {
  const progress = Math.min((lessonsCompleted / lessonsGoal) * 100, 100);
  const isComplete = lessonsCompleted >= lessonsGoal;

  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isComplete ? '#10B981' : 'var(--color-temple-gold)'}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {isComplete ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-4xl">✅</div>
                <div className="text-xs text-green-600 font-bold mt-1">Ziel erreicht!</div>
              </motion.div>
            ) : (
              <>
                <div className="text-3xl font-bold text-[var(--color-temple-gold)]">
                  {lessonsCompleted}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  von {lessonsGoal}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mt-2 text-center">
        <div className="text-sm font-medium">
          {isComplete ? 'Tägliches Ziel erreicht! 🎉' : 'Tägliches Ziel'}
        </div>
        {!isComplete && (
          <div className="text-xs text-[var(--text-secondary)]">
            Noch {lessonsGoal - lessonsCompleted} Lektion{lessonsGoal - lessonsCompleted !== 1 ? 'en' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

