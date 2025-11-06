// Stats Display Component gemäß Masterplan

'use client';

import React from 'react';

interface StatsDisplayProps {
  stats: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
    totalStrength: number;
  };
  className?: string;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  className = '',
}) => {
  const statItems = [
    { label: 'Faith', value: stats.faith, icon: '🙏' },
    { label: 'Wisdom', value: stats.wisdom, icon: '📖' },
    { label: 'Knowledge', value: stats.knowledge, icon: '💡' },
    { label: 'Service', value: stats.service, icon: '🤝' },
    { label: 'Leadership', value: stats.leadership, icon: '👑' },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Individual Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-[var(--color-temple-gold)]">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Total Strength */}
      <div className="mt-6 p-6 bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] rounded-lg text-white">
        <div className="text-sm opacity-90 mb-1">Total Strength</div>
        <div className="text-4xl font-bold">{stats.totalStrength}</div>
        <div className="text-xs opacity-75 mt-1">
          Stats + Equipment + Set Bonuses + Collection Bonus
        </div>
      </div>
    </div>
  );
};

