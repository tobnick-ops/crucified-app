// Achievement Unlock Notification - Toast-Style
// Erscheint wenn Achievement freigeschaltet wird

'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementNotificationProps {
  achievement: {
    name: string;
    icon: string;
    rewardXp: number;
  };
  isVisible: boolean;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000); // Auto-close nach 4 Sekunden
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] rounded-lg p-4 shadow-2xl border-2 border-yellow-300">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
              >
                {achievement.icon}
              </motion.div>
              
              <div className="flex-1 text-white">
                <div className="text-xs font-bold uppercase tracking-wide mb-1 opacity-90">
                  Achievement Freigeschaltet!
                </div>
                <div className="font-bold text-lg">{achievement.name}</div>
                <div className="text-sm opacity-90">+{achievement.rewardXp} XP</div>
              </div>

              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

