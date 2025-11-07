// Lazy Loading Utilities
// Dynamic Imports für Heavy Components

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Phaser Game - Heavy Component
export const PhaserGameLazy = dynamic(
  () => import('@/components/game/PhaserGame'),
  {
    ssr: false, // Phaser nur client-side
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <LoadingSpinner />
        <span className="ml-3">Lade Spiel-Engine...</span>
      </div>
    ),
  }
);

// Skill Tree - Complex Visualization
export const SkillTreeLazy = dynamic(
  () => import('@/components/character/SkillTree'),
  {
    loading: () => (
      <div className="w-full h-[500px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

// Collection Book - Many Items
export const CollectionBookLazy = dynamic(
  () => import('@/components/collection/CollectionBook'),
  {
    loading: () => (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

// Leaderboard - Large Data
export const LeaderboardLazy = dynamic(
  () => import('@/components/leaderboard/Leaderboard'),
  {
    loading: () => (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <LoadingSpinner />
        <span className="ml-3">Lade Rankings...</span>
      </div>
    ),
  }
);

// Lesson Quiz - Interactive
export const LessonQuizLazy = dynamic(
  () => import('@/components/lessons/LessonQuiz'),
  {
    loading: () => (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <LoadingSpinner />
        <span className="ml-3">Lade Quiz...</span>
      </div>
    ),
  }
);

// Stats Radar Chart - Complex SVG
export const StatsRadarChartLazy = dynamic(
  () => import('@/components/dashboard/StatsRadarChart'),
  {
    loading: () => (
      <div className="w-[300px] h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

