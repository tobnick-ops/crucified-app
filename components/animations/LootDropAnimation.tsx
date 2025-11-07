// Loot Drop Animation - Diablo-Style Equipment Reveal
// Rarity-basierte Effekte für maximalen "WOW"-Effekt

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';

interface LootItem {
  name: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'ARTIFACT';
  slot: string;
  baseStrength: number;
}

interface LootDropAnimationProps {
  item: LootItem;
  onClose: () => void;
  isOpen: boolean;
}

export const LootDropAnimation: React.FC<LootDropAnimationProps> = ({
  item,
  onClose,
  isOpen,
}) => {
  const [revealed, setRevealed] = useState(false);

  const rarityConfig = {
    COMMON: {
      color: 'from-gray-400 to-gray-600',
      textColor: 'text-gray-600',
      borderColor: 'border-gray-400',
      particles: 3,
      glow: 'shadow-gray-400/50',
    },
    UNCOMMON: {
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-600',
      borderColor: 'border-green-400',
      particles: 5,
      glow: 'shadow-green-400/50',
    },
    RARE: {
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-400',
      particles: 8,
      glow: 'shadow-blue-400/50',
    },
    EPIC: {
      color: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-400',
      particles: 12,
      glow: 'shadow-purple-400/50',
    },
    LEGENDARY: {
      color: 'from-orange-400 to-orange-600',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-400',
      particles: 20,
      glow: 'shadow-orange-400/50',
    },
    ARTIFACT: {
      color: 'from-yellow-300 via-orange-400 to-red-500',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-400',
      particles: 30,
      glow: 'shadow-yellow-400/80',
    },
  };

  const config = rarityConfig[item.rarity];

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={revealed ? onClose : undefined}
        >
          <motion.div
            initial={{ scale: 0, rotateY: 0 }}
            animate={{ scale: 1, rotateY: revealed ? 180 : 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {!revealed ? (
              // Chest/Box before reveal
              <div className="text-center cursor-pointer" onClick={handleReveal}>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateZ: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-9xl"
                >
                  📦
                </motion.div>
                <p className="text-white text-lg mt-4">Klicke zum Öffnen!</p>
              </div>
            ) : (
              // Item Reveal
              <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`bg-gradient-to-br ${config.color} p-8 rounded-lg ${config.glow} shadow-2xl border-4 ${config.borderColor} min-w-[300px]`}
              >
                {/* Particles */}
                {Array.from({ length: config.particles }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.random() * 200 - 100,
                      y: Math.random() * 200 - 100,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      ease: 'easeOut',
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}

                {/* Item Content */}
                <div className="text-center text-white relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="text-6xl mb-4"
                  >
                    {item.slot === 'WEAPON' && '⚔️'}
                    {item.slot === 'HELM' && '🛡️'}
                    {item.slot === 'CHEST' && '👕'}
                    {item.slot === 'LEGS' && '👖'}
                    {item.slot === 'FEET' && '👞'}
                    {item.slot === 'ACCESSORY' && '💍'}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="text-2xl font-bold mb-2">{item.name}</div>
                    <div className="text-lg mb-4">{item.rarity}</div>
                    <div className="text-xl">⚡ +{item.baseStrength} Strength</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={onClose}
                      className="mt-6"
                    >
                      Ausgezeichnet! ✨
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

