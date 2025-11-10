// Achievements Page - Alle Achievements anzeigen
// Filterable nach Kategorien, Sortierbar

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { AchievementCard } from '@/components/achievements/AchievementCard';

type Category = 'ALL' | 'LEARNING' | 'EXPLORATION' | 'COLLECTION' | 'SOCIAL' | 'MASTER';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  requirement: number;
  rewardXp: number;
  isSecret: boolean;
  isUnlocked: boolean;
  progress: number;
}

export default function AchievementsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<Category>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchAchievements();
    }
  }, [status, router]);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      setAchievements(data.achievements || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Lädt Achievements...</div>
      </div>
    );
  }

  const filteredAchievements = filter === 'ALL'
    ? achievements
    : achievements.filter(a => a.category === filter);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = totalCount > 0
    ? Math.round((unlockedCount / totalCount) * 100)
    : 0;

  const categories: Array<{ key: Category; label: string; icon: string }> = [
    { key: 'ALL', label: 'Alle', icon: '🏆' },
    { key: 'LEARNING', label: 'Lernen', icon: '📖' },
    { key: 'EXPLORATION', label: 'Abenteuer', icon: '🗺️' },
    { key: 'COLLECTION', label: 'Sammlung', icon: '📚' },
    { key: 'SOCIAL', label: 'Sozial', icon: '👥' },
    { key: 'MASTER', label: 'Meister', icon: '👑' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Achievements 🏆</h1>
        <p className="text-[var(--text-secondary)] mb-4">
          Schalte alle Achievements frei und werde zum Meister!
        </p>

        {/* Completion Stats */}
        <div className="inline-block bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] text-white rounded-lg p-4">
          <div className="text-5xl font-bold mb-1">{completionPercentage}%</div>
          <div className="text-sm">{unlockedCount} / {totalCount} Freigeschaltet</div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === cat.key
                ? 'bg-[var(--color-temple-gold)] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-[var(--text-primary)] hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center text-[var(--text-secondary)] py-12">
          <div className="text-6xl mb-4">🏆</div>
          <p>Keine Achievements in dieser Kategorie.</p>
        </div>
      )}
    </div>
  );
}

