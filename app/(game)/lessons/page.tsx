// Lessons Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LessonCard } from '@/components/lessons/LessonCard';
import { LessonQuiz } from '@/components/lessons/LessonQuiz';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GAME_CONFIG } from '@/lib/game/constants';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  requiredLevel: number;
  experienceReward: number;
  book: {
    name: string;
    abbreviation: string;
  };
  questions: Array<{
    id: string;
    questionText: string;
    questionType: string;
    correctAnswer: string;
    optionsJson: string | null;
  }>;
  isCompleted: boolean;
  canTake: boolean;
}

export default function LessonsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [characterLevel, setCharacterLevel] = useState(1);
  const [lessonsRemaining, setLessonsRemaining] = useState(GAME_CONFIG.DAILY_LESSON_LIMIT);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadLessons();
    }
  }, [status, router]);

  const loadLessons = async () => {
    try {
      const [lessonsResponse, statsResponse] = await Promise.all([
        fetch('/api/lessons'),
        fetch('/api/character/stats'),
      ]);

      const lessonsData = await lessonsResponse.json();
      const statsData = await statsResponse.json();

      if (!lessonsResponse.ok) {
        setError(lessonsData.error || 'Fehler beim Laden der Lektionen');
      } else {
        setLessons(lessonsData.lessons || []);
        setCharacterLevel(statsData.level || 1);
        
        // Calculate lessons remaining from daily currency
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // TODO: Load from daily currency API
        setLessonsRemaining(GAME_CONFIG.DAILY_LESSON_LIMIT);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleStartLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  const handleCompleteLesson = async (answers: Record<string, string>) => {
    if (!selectedLesson) return;

    try {
      const response = await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: selectedLesson.id,
          answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Abschließen der Lektion');
      } else {
        setError('');
        setSelectedLesson(null);
        // Show success message
        alert(`Lektion abgeschlossen! Score: ${data.score.toFixed(1)}%\nXP erhalten: ${data.experienceGained}`);
        if (data.leveledUp) {
          alert(`Level Up! Du bist jetzt Level ${data.newLevel}!`);
        }
        // Reload lessons
        await loadLessons();
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lektionen</CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="mb-4">
              <ProgressBar
                current={GAME_CONFIG.DAILY_LESSON_LIMIT - lessonsRemaining}
                max={GAME_CONFIG.DAILY_LESSON_LIMIT}
                label="Tägliche Lektionen"
                showPercentage
                color="gold"
              />
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Verbleibend: {lessonsRemaining} / {GAME_CONFIG.DAILY_LESSON_LIMIT}
              </p>
            </div>
          </div>
        </Card>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              characterLevel={characterLevel}
              onStart={handleStartLesson}
            />
          ))}
        </div>

        {lessons.length === 0 && (
          <Card>
            <div className="p-6 text-center">
              <p className="text-[var(--text-secondary)]">
                Keine Lektionen verfügbar. Erreiche höhere Levels, um mehr Lektionen freizuschalten.
              </p>
            </div>
          </Card>
        )}
      </div>

      {selectedLesson && (
        <LessonQuiz
          lesson={selectedLesson}
          onComplete={handleCompleteLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}

