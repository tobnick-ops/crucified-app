// Daily System Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DailySystem } from '@/components/daily/DailySystem';

export default function DailyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dailyCurrency, setDailyCurrency] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const [weeklyBonus, setWeeklyBonus] = useState({ eligible: false, bonus: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadDailyData();
    }
  }, [status, router]);

  const loadDailyData = async () => {
    try {
      const response = await fetch('/api/daily');
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Laden der täglichen Daten');
      } else {
        setDailyCurrency(data.dailyCurrency);
        setStreak(data.streak);
        setWeeklyBonus(data.weeklyBonus);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleNightWatchComplete = () => {
    loadDailyData();
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-temple-gold)] mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Lädt...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !dailyCurrency) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto mt-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <DailySystem
          dailyCurrency={dailyCurrency}
          streak={streak}
          weeklyBonus={weeklyBonus}
          onNightWatchComplete={handleNightWatchComplete}
        />
      </div>
    </div>
  );
}

