// Daily System Component gemäß Masterplan

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GAME_CONFIG } from '@/lib/game/constants';

interface DailySystemProps {
  dailyCurrency: {
    lessonsRemaining: number;
    currencyEarned: number;
    nightWatchCompleted: boolean;
  };
  streak: number;
  weeklyBonus: {
    eligible: boolean;
    bonus: number;
  };
  onNightWatchComplete?: () => void;
}

export const DailySystem: React.FC<DailySystemProps> = ({
  dailyCurrency,
  streak,
  weeklyBonus,
  onNightWatchComplete,
}) => {
  const handleNightWatch = async () => {
    try {
      const response = await fetch('/api/daily/nightwatch', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Fehler beim Abschließen der Nachtwache');
      } else {
        alert(`Nachtwache abgeschlossen! +${data.currencyEarned} Währung${data.streakBonus > 0 ? ` (+${data.streakBonus} Streak Bonus)` : ''}`);
        if (onNightWatchComplete) {
          onNightWatchComplete();
        }
      }
    } catch (err) {
      alert('Ein Fehler ist aufgetreten');
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Tägliche Lektionen</CardTitle>
        </CardHeader>
        <div className="p-6">
          <ProgressBar
            current={GAME_CONFIG.DAILY_LESSON_LIMIT - dailyCurrency.lessonsRemaining}
            max={GAME_CONFIG.DAILY_LESSON_LIMIT}
            label="Verbleibende Lektionen"
            showPercentage
            color="gold"
          />
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            {dailyCurrency.lessonsRemaining} / {GAME_CONFIG.DAILY_LESSON_LIMIT} Lektionen verfügbar
          </p>
        </div>
      </Card>

      {/* Streak */}
      <Card>
        <CardHeader>
          <CardTitle>Login-Streak</CardTitle>
        </CardHeader>
        <div className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-temple-gold)] mb-2">
              {streak} Tage
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {streak >= 7 ? '🔥 7-Tage-Bonus freigeschaltet!' : `Noch ${7 - streak} Tage bis zum 7-Tage-Bonus`}
            </p>
          </div>
        </div>
      </Card>

      {/* Weekly Bonus */}
      {weeklyBonus.eligible && (
        <Card>
          <CardHeader>
            <CardTitle>Wöchentlicher Bonus</CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] rounded-lg p-4 text-white text-center">
              <div className="text-2xl font-bold mb-2">🎁</div>
              <div className="text-lg font-semibold mb-1">7-Tage-Streak erreicht!</div>
              <div className="text-sm opacity-90">
                +{weeklyBonus.bonus} Währung erhalten
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Night Watch */}
      <Card>
        <CardHeader>
          <CardTitle>Nachtwache</CardTitle>
        </CardHeader>
        <div className="p-6">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Absolviere die Nachtwache, um zusätzliche Währung zu erhalten. Streak-Bonus erhöht die Belohnung!
          </p>
          {dailyCurrency.nightWatchCompleted ? (
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <p className="text-green-700 dark:text-green-300 font-semibold">
                ✓ Nachtwache bereits abgeschlossen
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Währung erhalten: {dailyCurrency.currencyEarned}
              </p>
            </div>
          ) : (
            <Button
              variant="primary"
              className="w-full"
              onClick={handleNightWatch}
            >
              Nachtwache abschließen
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

