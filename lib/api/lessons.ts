// Lesson API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';
import { GAME_CONFIG } from '@/lib/game/constants';
import { syncCharacterAchievements } from './achievements';
import { applyQuestProgress } from './questProgress';

export interface Lesson {
  id: string;
  bookId: string;
  title: string;
  description: string;
  difficulty: string;
  requiredLevel: number;
  experienceReward: number;
  dailyLimit: number;
  questions: LessonQuestion[];
}

export interface LessonQuestion {
  id: string;
  questionText: string;
  questionType: string; // 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'
  correctAnswer: string;
  optionsJson: string | null;
}

/**
 * Get all available lessons for character
 */
export async function getAvailableLessons(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      stats: true,
    },
  });

  if (!character || !character.stats) {
    return [];
  }

  // Get daily currency
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dailyCurrency = await prisma.dailyCurrency.findUnique({
    where: {
      characterId_date: {
        characterId,
        date: today,
      },
    },
  });

  if (!dailyCurrency) {
    // Create daily currency for today
    dailyCurrency = await prisma.dailyCurrency.create({
      data: {
        characterId,
        date: today,
        lessonsRemaining: GAME_CONFIG.DAILY_LESSON_LIMIT,
        currencyEarned: 0,
        nightWatchCompleted: false,
      },
    });
  }

  // Get lessons that character can access
  const lessons = await prisma.lesson.findMany({
    where: {
      requiredLevel: { lte: character.level },
    },
    include: {
      book: true,
      questions: true,
    },
    orderBy: [
      { requiredLevel: 'asc' },
      { title: 'asc' },
    ],
    // DEDUPLIZIERUNG: Nur erste Lektion pro Titel nehmen
    distinct: ['title'],
  });

  // Check which lessons are completed today
  const completedLessons = await prisma.characterLesson.findMany({
    where: {
      characterId,
      completedAt: {
        gte: today,
      },
    },
    select: {
      lessonId: true,
    },
  });

  const completedLessonIds = new Set(completedLessons.map((cl: { lessonId: string }) => cl.lessonId));

  return lessons.map((lesson: { id: string; bookId: string; title: string; description: string; difficulty: string; requiredLevel: number; experienceReward: number; dailyLimit: number; book: { id: string; name: string; abbreviation: string }; questions: { id: string; questionText: string; questionType: string; correctAnswer: string; optionsJson: string | null }[] }) => ({
    id: lesson.id,
    bookId: lesson.bookId,
    title: lesson.title,
    description: lesson.description,
    difficulty: lesson.difficulty,
    requiredLevel: lesson.requiredLevel,
    experienceReward: lesson.experienceReward,
    dailyLimit: lesson.dailyLimit,
    book: {
      id: lesson.book.id,
      name: lesson.book.name,
      abbreviation: lesson.book.abbreviation,
    },
    questions: lesson.questions.map((q: { id: string; questionText: string; questionType: string; correctAnswer: string; optionsJson: string | null }) => ({
      id: q.id,
      questionText: q.questionText,
      questionType: q.questionType,
      correctAnswer: q.correctAnswer,
      optionsJson: q.optionsJson,
    })),
    isCompleted: completedLessonIds.has(lesson.id),
    canTake: dailyCurrency.lessonsRemaining > 0,
  }));
}

/**
 * Complete a lesson
 */
export async function completeLesson(
  characterId: string,
  lessonId: string,
  answers: Record<string, string>
): Promise<{
  score: number;
  experienceGained: number;
  leveledUp: boolean;
  newLevel: number;
  achievementsUnlocked: string[];
  achievementXpGained: number;
}> {
  // Load lesson with questions
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      questions: true,
    },
  });

  if (!lesson) {
    throw new Error('Lektion nicht gefunden');
  }

  // Check daily limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dailyCurrency = await prisma.dailyCurrency.findUnique({
    where: {
      characterId_date: {
        characterId,
        date: today,
      },
    },
  });

  if (!dailyCurrency) {
    dailyCurrency = await prisma.dailyCurrency.create({
      data: {
        characterId,
        date: today,
        lessonsRemaining: GAME_CONFIG.DAILY_LESSON_LIMIT,
        currencyEarned: 0,
        nightWatchCompleted: false,
      },
    });
  }

  if (dailyCurrency.lessonsRemaining <= 0) {
    throw new Error('Tägliches Limit erreicht');
  }

  // Check if already completed today
  const existingCompletion = await prisma.characterLesson.findUnique({
    where: {
      characterId_lessonId: {
        characterId,
        lessonId,
      },
    },
  });

  if (existingCompletion) {
    const completedToday = new Date(existingCompletion.completedAt);
    completedToday.setHours(0, 0, 0, 0);
    if (completedToday.getTime() === today.getTime()) {
      throw new Error('Lektion bereits heute abgeschlossen');
    }
  }

  // Calculate score
  let correctAnswers = 0;
  const totalQuestions = lesson.questions.length;

  for (const question of lesson.questions) {
    const userAnswer = answers[question.id];
    if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
      correctAnswers++;
    }
  }

  const score = (correctAnswers / totalQuestions) * 100;

  // Calculate XP reward based on score
  let experienceGained = 0;
  if (score >= 90) {
    experienceGained = lesson.experienceReward;
  } else if (score >= 70) {
    experienceGained = Math.floor(lesson.experienceReward * 0.75);
  } else if (score >= 50) {
    experienceGained = Math.floor(lesson.experienceReward * 0.5);
  } else {
    experienceGained = Math.floor(lesson.experienceReward * 0.25);
  }

  // Save lesson completion
  await prisma.characterLesson.upsert({
    where: {
      characterId_lessonId: {
        characterId,
        lessonId,
      },
    },
    update: {
      score,
      attempts: { increment: 1 },
      completedAt: new Date(),
    },
    create: {
      characterId,
      lessonId,
      score,
      attempts: 1,
      completedAt: new Date(),
    },
  });

  // Decrease daily lessons remaining
  await prisma.dailyCurrency.update({
    where: {
      characterId_date: {
        characterId,
        date: today,
      },
    },
    data: {
      lessonsRemaining: { decrement: 1 },
      currencyEarned: { increment: experienceGained },
    },
  });

  // Add XP to character
  const { addXP } = await import('./character');
  const xpResult = await addXP(characterId, experienceGained);

  await applyQuestProgress(characterId, [
    { type: 'complete_lessons', amount: 1 },
    { type: 'lessons_and_missions', amount: 1 },
    ...(score >= 100 ? [{ type: 'perfect_lesson', amount: 1 }] : []),
  ]);

  const achievementSync = await syncCharacterAchievements(characterId);
  let finalXpResult = xpResult;
  let achievementXpGained = 0;

  if (achievementSync.totalRewardXp > 0) {
    achievementXpGained = achievementSync.totalRewardXp;
    finalXpResult = await addXP(characterId, achievementXpGained);
  }

  return {
    score,
    experienceGained,
    leveledUp: xpResult.leveledUp || finalXpResult.leveledUp,
    newLevel: finalXpResult.newLevel,
    achievementsUnlocked: achievementSync.newlyUnlockedIds,
    achievementXpGained,
  };
}

