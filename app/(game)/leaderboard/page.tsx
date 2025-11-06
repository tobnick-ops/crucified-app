// Leaderboard Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';

type LeaderboardCategory = 'total' | 'level' | 'collection' | 'faith' | 'completion';

interface LeaderboardEntry {
  rank: number;
  characterId: string;
  characterName: string;
  level: number;
  strength: number;
  faith?: number;
  collectionPercentage?: number;
  completedBooks?: number;
}

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [category, setCategory] = useState<LeaderboardCategory>('total');
  const [userRank, setUserRank] = useState<{ rank: number; totalPlayers: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadLeaderboard();
    }
  }, [status, router, category]);

  const loadLeaderboard = async () => {
    try {
      const [leaderboardResponse, rankResponse] = await Promise.all([
        fetch(`/api/leaderboard?category=${category}&limit=100`),
        fetch(`/api/leaderboard/rank?category=${category}`),
      ]);

      const leaderboardData = await leaderboardResponse.json();
      const rankData = await rankResponse.json();

      if (!leaderboardResponse.ok) {
        setError(leaderboardData.error || 'Fehler beim Laden des Leaderboards');
      } else {
        setLeaderboard(leaderboardData.leaderboard || []);
        if (rankData.rank) {
          setUserRank({
            rank: rankData.rank,
            totalPlayers: rankData.totalPlayers,
          });
        }
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory: LeaderboardCategory) => {
    setCategory(newCategory);
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

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Leaderboard
          leaderboard={leaderboard}
          category={category}
          userRank={userRank || undefined}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}

