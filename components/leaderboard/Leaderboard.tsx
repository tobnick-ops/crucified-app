// Leaderboard Component gemäß Masterplan

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';

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

type LeaderboardCategory = 'total' | 'level' | 'collection' | 'faith' | 'completion';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  category: LeaderboardCategory;
  userRank?: {
    rank: number;
    totalPlayers: number;
  };
  onCategoryChange?: (category: LeaderboardCategory) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboard,
  category,
  userRank,
  onCategoryChange,
}) => {
  const categoryLabels: Record<LeaderboardCategory, string> = {
    total: 'Total Strength',
    level: 'Level',
    collection: 'Sammlung',
    faith: 'Faith',
    completion: 'Abgeschlossene Bücher',
  };

  const getValueForCategory = (entry: LeaderboardEntry, category: LeaderboardCategory): number => {
    switch (category) {
      case 'total':
        return entry.strength;
      case 'level':
        return entry.level;
      case 'collection':
        return entry.collectionPercentage || 0;
      case 'faith':
        return entry.faith || 0;
      case 'completion':
        return entry.completedBooks || 0;
      default:
        return 0;
    }
  };

  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'text-[#FFD700]'; // Gold
    if (rank === 2) return 'text-[#C0C0C0]'; // Silver
    if (rank === 3) return 'text-[#CD7F32]'; // Bronze
    return 'text-[var(--text-primary)]';
  };

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard - {categoryLabels[category]}</CardTitle>
        </CardHeader>
        <div className="p-6">
          <div className="flex gap-2 flex-wrap">
            {Object.keys(categoryLabels).map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onCategoryChange?.(cat as LeaderboardCategory)}
              >
                {categoryLabels[cat as LeaderboardCategory]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* User Rank */}
      {userRank && (
        <Card>
          <CardHeader>
            <CardTitle>Dein Rang</CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-temple-gold)] mb-2">
                #{userRank.rank}
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                von {userRank.totalPlayers} Spielern
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100</CardTitle>
        </CardHeader>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-2 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Rang
                  </th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Name
                  </th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Level
                  </th>
                  <th className="text-right py-2 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    {categoryLabels[category]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => {
                  const value = getValueForCategory(entry, category);
                  return (
                    <tr
                      key={entry.characterId}
                      className="border-b border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className={`font-bold ${getRankColor(entry.rank)}`}>
                          {getRankIcon(entry.rank)} {entry.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[var(--text-primary)]">
                          {entry.characterName}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[var(--text-secondary)]">
                          Level {entry.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-semibold text-[var(--color-temple-gold)]">
                          {value.toLocaleString()}
                          {category === 'collection' && '%'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

