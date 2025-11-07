// Streak Recovery Modal - Einmal pro Monat einen Tag verpassen ohne Streak-Verlust
// Inspiriert von Duolingo's "Streak Freeze"

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface StreakRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseRecovery: () => void;
  streak: number;
  freezesAvailable: number;
}

export const StreakRecoveryModal: React.FC<StreakRecoveryModalProps> = ({
  isOpen,
  onClose,
  onUseRecovery,
  streak,
  freezesAvailable,
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleUse = async () => {
    setConfirming(true);
    await onUseRecovery();
    setConfirming(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="max-w-md w-full"
          >
            <Card>
              <CardHeader>
                <div className="text-center">
                  <div className="text-6xl mb-4">🔥❄️</div>
                  <CardTitle className="text-2xl">Streak Rettung</CardTitle>
                  <CardDescription className="mt-2">
                    Dein {streak}-Tage Streak ist in Gefahr!
                  </CardDescription>
                </div>
              </CardHeader>

              <div className="p-6 pt-0 space-y-4">
                {freezesAvailable > 0 ? (
                  <>
                    <div className="bg-[var(--color-temple-blue)] bg-opacity-10 p-4 rounded-lg">
                      <p className="text-sm text-center">
                        Du hast <strong className="text-[var(--color-temple-gold)]">{freezesAvailable}</strong> Streak-Rettung{freezesAvailable !== 1 ? 'en' : ''} verfügbar.
                      </p>
                      <p className="text-xs text-center text-[var(--text-secondary)] mt-2">
                        Nutze sie, um deinen Streak trotz eines verpassten Tages zu bewahren!
                      </p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-lg">
                      <p className="text-sm text-center text-yellow-800 dark:text-yellow-200">
                        ⚠️ Hinweis: Du erhältst 1 Rettung pro Monat
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={onClose}
                        className="flex-1"
                      >
                        Abbrechen
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleUse}
                        isLoading={confirming}
                        className="flex-1"
                      >
                        Streak retten! 🔥
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-lg">
                      <p className="text-sm text-center text-red-800 dark:text-red-200">
                        ❌ Keine Streak-Rettungen mehr verfügbar
                      </p>
                      <p className="text-xs text-center text-red-600 dark:text-red-300 mt-2">
                        Dein Streak wird zurückgesetzt. Du erhältst nächsten Monat eine neue Rettung.
                      </p>
                    </div>

                    <div className="text-center text-[var(--text-secondary)] text-sm">
                      <p>Nicht aufgeben! Starte heute einen neuen Streak und wachse weiter! 💪</p>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={onClose}
                      className="w-full"
                    >
                      Verstanden
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

