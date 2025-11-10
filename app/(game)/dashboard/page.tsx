// Dashboard - Zentraler Command Center
// Kritisch für User Experience gemäß GAMEREADY Plan

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface DashboardData {
  character: {
    name: string;
    level: number;
    currentXp: number;
    xpForNextLevel: number;
    totalStrength: number;
    stats: {
      faith: number;
      wisdom: number;
      knowledge: number;
      service: number;
      leadership: number;
    };
  };
  daily: {
    loginStreak: number;
    lessonsCompletedToday: number;
    missionsCompletedToday: number;
  };
  collection: {
    fragmentsUnlocked: number;
    totalFragments: number;
    collectionBonus: number;
  };
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch character stats
      const statsRes = await fetch('/api/character/stats');
      const stats = await statsRes.json();

      // Fetch daily info
      const dailyRes = await fetch('/api/daily');
      const daily = await dailyRes.json();

      // Fetch fragments
      const fragmentsRes = await fetch('/api/character/fragments');
      const fragments = await fragmentsRes.json();

      setDashboardData({
        character: stats,
        daily: daily,
        collection: {
          fragmentsUnlocked: fragments.unlockedCount || 0,
          totalFragments: fragments.totalFragments || fragments.totalCount || 0,
          collectionBonus: fragments.collectionBonus || 0,
        },
        recentActivity: [], // TODO: Implement activity feed
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Lädt Dashboard...</div>
      </div>
    );
  }

  const { character, daily, collection } = dashboardData;
  const xpProgress = (character.currentXp / character.xpForNextLevel) * 100;
  const collectionProgress = collection.totalFragments > 0
    ? Math.round((collection.fragmentsUnlocked / collection.totalFragments) * 100)
    : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] rounded-lg p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Willkommen zurück, {character.name}!</h1>
            <p className="text-lg opacity-90">Level {character.level} • Total Strength: {character.totalStrength}</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-2">🔥</div>
            <div className="text-3xl font-bold">{daily.loginStreak}</div>
            <div className="text-sm opacity-90">Tage Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Level Fortschritt</CardTitle>
          <CardDescription>
            {character.currentXp} / {character.xpForNextLevel} XP zum nächsten Level
          </CardDescription>
        </CardHeader>
        <div className="p-6">
          <ProgressBar progress={xpProgress} />
          <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">
            Noch {character.xpForNextLevel - character.currentXp} XP bis Level {character.level + 1}!
          </p>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Daily Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Heute 📅</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-secondary)]">Lektionen:</span>
              <span className="font-bold text-lg">{daily.lessonsCompletedToday} / 5</span>
            </div>
            <ProgressBar progress={(daily.lessonsCompletedToday / 5) * 100} />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-[var(--text-secondary)]">Missionen:</span>
              <span className="font-bold text-lg">{daily.missionsCompletedToday}</span>
            </div>

            {daily.lessonsCompletedToday < 5 && (
              <Link href="/lessons">
                <Button variant="primary" size="sm" className="w-full mt-4">
                  Weiter lernen →
                </Button>
              </Link>
            )}
          </div>
        </Card>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Stats 📊</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Faith:</span>
              <span className="font-bold">{character.stats.faith}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Wisdom:</span>
              <span className="font-bold">{character.stats.wisdom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Knowledge:</span>
              <span className="font-bold">{character.stats.knowledge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Service:</span>
              <span className="font-bold">{character.stats.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Leadership:</span>
              <span className="font-bold">{character.stats.leadership}</span>
            </div>

            <Link href="/character">
              <Button variant="secondary" size="sm" className="w-full mt-4">
                Details ansehen
              </Button>
            </Link>
          </div>
        </Card>

        {/* Collection Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sammelbuch 📚</CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-[var(--color-temple-gold)]">
                {collectionProgress}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {collection.fragmentsUnlocked} / {collection.totalFragments} Fragmente
              </div>
            </div>

            <div className="bg-[var(--color-temple-gold)] bg-opacity-10 p-3 rounded-lg mb-4">
              <p className="text-sm text-center">
                Collection Bonus: <strong className="text-[var(--color-temple-gold)]">+{collection.collectionBonus}%</strong> Strength
              </p>
            </div>

            <Link href="/collection">
              <Button variant="primary" size="sm" className="w-full">
                Sammelbuch öffnen
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card hover>
          <CardHeader>
            <CardTitle>Weiter Lernen 📖</CardTitle>
            <CardDescription>Schließe deine täglichen Lektionen ab</CardDescription>
          </CardHeader>
          <div className="p-6">
            <Link href="/lessons">
              <Button variant="primary" size="lg" className="w-full">
                Zu den Lektionen →
              </Button>
            </Link>
          </div>
        </Card>

        <Card hover>
          <CardHeader>
            <CardTitle>Abenteuer erleben 🎮</CardTitle>
            <CardDescription>Spiele epische Missionen</CardDescription>
          </CardHeader>
          <div className="p-6">
            <Link href="/missions">
              <Button variant="primary" size="lg" className="w-full">
                Zu den Missionen →
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Leaderboard Snippet */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Leaderboard 🏆</CardTitle>
            <Link href="/leaderboard">
              <Button variant="secondary" size="sm">
                Alle ansehen →
              </Button>
            </Link>
          </div>
        </CardHeader>
        <div className="p-6">
          <p className="text-center text-[var(--text-secondary)]">
            Messe dich mit anderen Gläubigen! Steige im Ranking auf durch Lektionen, Missionen und Sammlung.
          </p>
        </div>
      </Card>
    </div>
  );
}

