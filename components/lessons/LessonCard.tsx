// Lesson Card Component gemäß Masterplan

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { ProgressBar } from '@/components/ui/ProgressBar';

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
  isCompleted: boolean;
  canTake: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  characterLevel: number;
  onStart: (lessonId: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  characterLevel,
  onStart,
}) => {
  const difficultyColors: Record<string, string> = {
    easy: 'text-green-600',
    medium: 'text-yellow-600',
    hard: 'text-red-600',
  };

  const canTake = characterLevel >= lesson.requiredLevel && lesson.canTake && !lesson.isCompleted;

  return (
    <Card hover={!lesson.isCompleted && canTake}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{lesson.title}</CardTitle>
            <CardDescription className="mt-1">
              {lesson.book.name} ({lesson.book.abbreviation})
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${difficultyColors[lesson.difficulty] || 'text-gray-600'}`}>
              {lesson.difficulty.toUpperCase()}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">
              Level {lesson.requiredLevel}
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="p-6 pt-0 space-y-4">
        <p className="text-sm text-[var(--text-secondary)]">{lesson.description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">XP Belohnung:</span>
          <span className="font-semibold text-[var(--color-temple-gold)]">
            {lesson.experienceReward} XP
          </span>
        </div>

        {!canTake && (
          <div className="text-sm text-red-600">
            {lesson.isCompleted && '✓ Bereits abgeschlossen'}
            {characterLevel < lesson.requiredLevel && `Level ${lesson.requiredLevel} erforderlich`}
            {!lesson.canTake && !lesson.isCompleted && 'Tägliches Limit erreicht'}
          </div>
        )}

        {canTake && (
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onStart(lesson.id)}
          >
            Lektion starten
          </Button>
        )}
      </div>
    </Card>
  );
};

