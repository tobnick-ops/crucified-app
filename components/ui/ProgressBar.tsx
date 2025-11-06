// ProgressBar Component gemäß Masterplan Design System

import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  color?: 'gold' | 'blue';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  showPercentage = false,
  className = '',
  color = 'gold',
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorStyles = {
    gold: 'bg-[var(--color-temple-gold)]',
    blue: 'bg-[var(--color-temple-blue)]',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
          {showPercentage && (
            <span className="text-sm text-[var(--text-secondary)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colorStyles[color]} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {!label && showPercentage && (
        <div className="text-xs text-[var(--text-secondary)] mt-1 text-right">
          {current} / {max}
        </div>
      )}
    </div>
  );
};

