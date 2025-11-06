// Character Avatar Component gemäß Masterplan
// Zeigt Character mit angelegter Equipment

'use client';

import React from 'react';

interface CharacterAvatarProps {
  characterName: string;
  level: number;
  equipment?: {
    helm?: string;
    chest?: string;
    legs?: string;
    feet?: string;
    weapon?: string;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterName,
  level,
  equipment,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-16 h-16 text-sm',
    md: 'w-24 h-24 text-base',
    lg: 'w-32 h-32 text-lg',
  };

  // Placeholder für Character Sprite
  // Später: Phaser.js Sprite Compositing mit Equipment Layers
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeStyles[size]} rounded-full bg-gradient-to-br from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] flex items-center justify-center text-white font-bold temple-shadow relative`}>
        {/* Placeholder - später Character Sprite mit Equipment */}
        <span className="text-2xl">👤</span>
        <div className="absolute bottom-0 right-0 bg-[var(--color-temple-blue)] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
          {level}
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{characterName}</p>
      {equipment && (
        <div className="mt-1 text-xs text-[var(--text-secondary)]">
          {equipment.chest && <span>✨</span>}
        </div>
      )}
    </div>
  );
};

