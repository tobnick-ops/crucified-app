// Streak Milestone Celebration Modal
// Wird angezeigt wenn User 7, 30, 100, 365 Tage Streak erreicht

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';

interface StreakMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  type: 'login' | 'lesson' | 'mission';
}

export const StreakMilestoneModal: React.FC<StreakMilestoneModalProps> = ({
  isOpen,
  onClose,
  streak,
  type,
}) => {
  const milestoneConfig = {
    7: { title: '1 Woche!', emoji: '🔥', color: 'from-yellow-400 to-orange-500', reward: '50 Bonus XP' },
    30: { title: '1 Monat!', emoji: '🔥🔥', color: 'from-orange-500 to-red-500', reward: '250 Bonus XP' },
    100: { title: '100 Tage!', emoji: '🔥🔥🔥', color: 'from-red-500 to-purple-500', reward: '1.000 Bonus XP' },
    365: { title: '1 JAHR!', emoji: '👑🔥👑', color: 'from-purple-500 via-pink-500 to-yellow-500', reward: 'LEGENDARY BADGE' },
  };

  const config = milestoneConfig[streak as keyof typeof milestoneConfig];
  if (!config) return null;

  const typeLabels = {
    login: 'Login',
    lesson: 'Lektionen',
    mission: 'Missionen',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        >
          {/* Fireworks Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: 2,
                }}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 4],
                }}
              />
            ))}
          </div>

          {/* Milestone Card */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className={`bg-gradient-to-br ${config.color} p-10 rounded-2xl shadow-2xl text-white max-w-lg w-full text-center relative overflow-hidden`}
          >
            {/* Glowing Background */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-white opacity-20"
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 1 }}
                className="text-9xl mb-4"
              >
                {config.emoji}
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-bold mb-4"
              >
                {config.title}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl mb-6"
              >
                {streak} Tage {typeLabels[type]} Streak!
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="bg-white bg-opacity-20 rounded-lg p-4 mb-6"
              >
                <p className="text-lg font-bold">Belohnung:</p>
                <p className="text-3xl font-bold">{config.reward}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm mb-6 opacity-90">
                  Du bist unglaublich! Bleib dran und wachse weiter im Glauben! 🙏
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onClose}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Fantastisch! 🎉
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

