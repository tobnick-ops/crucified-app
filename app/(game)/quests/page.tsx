// Quest Board - Daily & Weekly Quests
// Duolingo/Habitica-Style Quest System

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Quest {
  id: string;
  type: 'DAILY' | 'WEEKLY';
  title: string;
  description: string;
  rewardXp: number;
  rewardGold: number;
  progress: number;
  requirement: number;
  isCompleted: boolean;
}

export default function QuestsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchQuests();
    }
  }, [status, router]);

  const fetchQuests = async () => {
    try {
      const res = await fetch('/api/quests');
      const data = await res.json();
      
      setDailyQuests(data.dailyQuests || []);
      setWeeklyQuests(data.weeklyQuests || []);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Lädt Quests...</div>
      </div>
    );
  }

  const QuestCard = ({ quest }: { quest: Quest }) => {
    const progress = Math.min((quest.progress / quest.requirement) * 100, 100);
    const isDone = quest.isCompleted || quest.progress >= quest.requirement;

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <Card className={isDone ? 'border-2 border-green-500' : ''}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  {isDone && <span className="text-2xl">✅</span>}
                  {quest.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {quest.description}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--color-temple-gold)]">
                  +{quest.rewardXp} XP
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  +{quest.rewardGold} Gold
                </div>
              </div>
            </div>
          </CardHeader>

          <div className="px-6 pb-6">
            {!isDone && (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--text-secondary)]">Fortschritt</span>
                  <span className="font-medium">{quest.progress} / {quest.requirement}</span>
                </div>
                <ProgressBar progress={progress} />
              </>
            )}

            {isDone && (
              <div className="text-center py-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  🎉 Quest abgeschlossen!
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    );
  };

  const dailyCompleted = dailyQuests.filter(q => q.isCompleted).length;
  const weeklyCompleted = weeklyQuests.filter(q => q.isCompleted).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Quest Board 📋</h1>
        <p className="text-[var(--text-secondary)]">
          Erfülle tägliche und wöchentliche Quests für extra Belohnungen!
        </p>
      </motion.div>

      {/* Daily Quests Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>📅</span> Tägliche Quests
          </h2>
          <div className="text-sm text-[var(--text-secondary)]">
            {dailyCompleted} / {dailyQuests.length} abgeschlossen
          </div>
        </div>

        {dailyQuests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8 text-[var(--text-secondary)]">
              <div className="text-5xl mb-2">📋</div>
              <p>Keine täglichen Quests verfügbar.</p>
              <p className="text-sm mt-2">Neue Quests werden um Mitternacht freigeschaltet!</p>
            </div>
          </Card>
        )}

        <div className="mt-4 bg-[var(--color-temple-blue)] bg-opacity-10 p-3 rounded-lg">
          <p className="text-sm text-center text-[var(--text-secondary)]">
            ⏰ Tägliche Quests werden um Mitternacht zurückgesetzt
          </p>
        </div>
      </div>

      {/* Weekly Quests Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>🗓️</span> Wöchentliche Quests
          </h2>
          <div className="text-sm text-[var(--text-secondary)]">
            {weeklyCompleted} / {weeklyQuests.length} abgeschlossen
          </div>
        </div>

        {weeklyQuests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklyQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8 text-[var(--text-secondary)]">
              <div className="text-5xl mb-2">🗓️</div>
              <p>Keine wöchentlichen Quests verfügbar.</p>
              <p className="text-sm mt-2">Neue Quests werden jeden Montag freigeschaltet!</p>
            </div>
          </Card>
        )}

        <div className="mt-4 bg-[var(--color-temple-gold)] bg-opacity-10 p-3 rounded-lg">
          <p className="text-sm text-center text-[var(--text-secondary)]">
            📆 Wöchentliche Quests werden jeden Montag zurückgesetzt
          </p>
        </div>
      </div>

      {/* Completion Bonus */}
      {dailyCompleted === dailyQuests.length && weeklyCompleted === weeklyQuests.length && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] p-6 rounded-lg text-white text-center"
        >
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Alle Quests abgeschlossen!</h3>
          <p className="text-lg">Du bist ein wahrer Champion! 👑</p>
        </motion.div>
      )}
    </div>
  );
}

