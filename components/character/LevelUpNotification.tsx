// Level Up Notification Component gemäß Masterplan

'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui';

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-[var(--color-temple-gold)] mb-2">
          Level Up!
        </h2>
        <p className="text-xl text-[var(--text-primary)] mb-6">
          Du bist jetzt Level <span className="font-bold">{newLevel}</span>!
        </p>

        {statsGained && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
              Stats erhalten:
            </p>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-center">
                <div className="font-bold text-[var(--color-temple-gold)]">
                  +{statsGained.faith}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Faith</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--color-temple-gold)]">
                  +{statsGained.wisdom}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Wisdom</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--color-temple-gold)]">
                  +{statsGained.knowledge}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Knowledge</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--color-temple-gold)]">
                  +{statsGained.service}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Service</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--color-temple-gold)]">
                  +{statsGained.leadership}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Leadership</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="px-6 py-2 bg-[var(--color-temple-gold)] text-white rounded-lg hover:bg-[var(--color-temple-gold-dark)] transition-colors font-semibold"
        >
          Weiter
        </button>
      </div>
    </Modal>
  );
};

