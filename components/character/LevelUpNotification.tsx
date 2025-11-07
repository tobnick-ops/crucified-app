// Level Up Notification Component - ENHANCED mit Confetti
// Fullscreen Celebration für maximalen Impact

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/ui';
import { Button } from '@/components/ui';

interface LevelUpNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  statsGained?: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
  };
}

export const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({
  isOpen,
  onClose,
  newLevel,
  statsGained,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        >
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 360,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    ease: 'easeIn',
                    delay: Math.random() * 0.5,
                  }}
                  className="absolute w-3 h-3 rounded"
                  style={{
                    backgroundColor: ['#D4AF37', '#F4E4BC', '#3B82F6', '#10B981', '#EF4444'][i % 5],
                  }}
                />
              ))}
            </div>
          )}

          {/* Level Up Card */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] p-8 rounded-2xl shadow-2xl text-white max-w-md w-full relative overflow-hidden"
          >
            {/* Glowing Background Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-radial from-yellow-300 to-transparent opacity-30"
            />

            {/* Content */}
            <div className="text-center relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.6 }}
                className="text-8xl mb-4"
              >
                ⭐
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-2"
              >
                Level Up!
              </motion.h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="text-6xl font-bold mb-6"
              >
                {newLevel}
              </motion.div>

              {statsGained && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white bg-opacity-20 rounded-lg p-4 mb-6"
                >
                  <p className="text-sm font-semibold mb-3">Stats erhalten:</p>
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    {Object.entries(statsGained).map(([stat, value], index) => (
                      <motion.div
                        key={stat}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                        className="text-center"
                      >
                        <div className="font-bold text-lg">+{value}</div>
                        <div className="text-xs capitalize">{stat}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onClose}
                  className="bg-white text-[var(--color-temple-gold)] hover:bg-gray-100"
                >
                  Fantastisch! 🚀
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

