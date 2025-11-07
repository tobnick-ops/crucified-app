// Level Progress Ring - Duolingo-Style Circular Progress
// Visuell ansprechende XP-Darstellung

'use client';

import React from 'react';

interface LevelProgressRingProps {
  currentXp: number;
  xpForNextLevel: number;
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const LevelProgressRing: React.FC<LevelProgressRingProps> = ({
  currentXp,
  xpForNextLevel,
  level,
  size = 'md',
  showLabel = true,
}) => {
  const progress = (currentXp / xpForNextLevel) * 100;
  
  const sizes = {
    sm: { width: 80, stroke: 6, font: 'text-lg' },
    md: { width: 120, stroke: 8, font: 'text-2xl' },
    lg: { width: 160, stroke: 10, font: 'text-4xl' },
  };

  const { width, stroke, font } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={width} height={width}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress Circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-temple-gold)" />
              <stop offset="100%" stopColor="var(--color-temple-gold-dark)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Level Number in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`${font} font-bold text-[var(--color-temple-gold)]`}>
              {level}
            </div>
            <div className="text-xs text-[var(--text-secondary)]">Level</div>
          </div>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 text-center">
          <div className="text-sm font-medium">{currentXp} / {xpForNextLevel} XP</div>
          <div className="text-xs text-[var(--text-secondary)]">
            {Math.round(progress)}% zum nächsten Level
          </div>
        </div>
      )}
    </div>
  );
};

