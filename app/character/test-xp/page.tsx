// Test XP Page - nur für Development gemäß Masterplan

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { LevelUpNotification } from '@/components/character/LevelUpNotification';

export default function TestXPPage() {
  const [xpAmount, setXpAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleAddXP = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/character/xp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ xpAmount }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult({ error: data.error });
      } else {
        setResult(data);
        if (data.leveledUp) {
          setShowLevelUp(true);
        }
        // Reload page to see updated stats
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setResult({ error: 'Ein Fehler ist aufgetreten' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">XP Test (Development)</CardTitle>
          </CardHeader>

          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="xpAmount" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                XP Menge
              </label>
              <input
                id="xpAmount"
                type="number"
                value={xpAmount}
                onChange={(e) => setXpAmount(parseInt(e.target.value) || 0)}
                min="1"
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
              />
            </div>

            <Button
              onClick={handleAddXP}
              variant="primary"
              className="w-full"
              disabled={loading || xpAmount <= 0}
            >
              {loading ? 'Lädt...' : `${xpAmount} XP hinzufügen`}
            </Button>

            {result && (
              <div className={`p-4 rounded-lg ${
                result.error
                  ? 'bg-red-100 border border-red-400 text-red-700'
                  : 'bg-green-100 border border-green-400 text-green-700'
              }`}>
                {result.error ? (
                  <p>{result.error}</p>
                ) : (
                  <div>
                    <p className="font-semibold">XP hinzugefügt!</p>
                    {result.leveledUp && (
                      <p className="mt-1">Level Up! Neues Level: {result.newLevel}</p>
                    )}
                    <p className="mt-1">Aktuelle XP: {result.newXP}</p>
                    {result.statsGained && (
                      <div className="mt-2 text-sm">
                        Stats erhalten:
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          <div>Faith: +{result.statsGained.faith}</div>
                          <div>Wisdom: +{result.statsGained.wisdom}</div>
                          <div>Knowledge: +{result.statsGained.knowledge}</div>
                          <div>Service: +{result.statsGained.service}</div>
                          <div>Leadership: +{result.statsGained.leadership}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-sm text-[var(--text-secondary)]">
              <p>Diese Seite ist nur für Development/Testing.</p>
              <p>Später wird XP durch Lektionen und Missionen vergeben.</p>
            </div>
          </div>
        </Card>
      </div>

      {result?.leveledUp && (
        <LevelUpNotification
          isOpen={showLevelUp}
          onClose={() => setShowLevelUp(false)}
          newLevel={result.newLevel}
          statsGained={result.statsGained}
        />
      )}
    </div>
  );
}

