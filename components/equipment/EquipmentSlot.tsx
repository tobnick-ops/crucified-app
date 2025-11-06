// Equipment Slot Component gemäß Masterplan
// Zeigt Equipment-Slot (Helm, Brustpanzer, etc.)

'use client';

import React from 'react';

interface EquipmentSlotProps {
  slot: 'HELM' | 'SHOULDER' | 'CHEST' | 'LEGS' | 'FEET' | 'WEAPON' | 'ACCESSORY';
  item?: {
    name: string;
    rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'ARTIFACT';
    iconPath?: string;
  };
  onClick?: () => void;
  className?: string;
}

const slotLabels: Record<EquipmentSlotProps['slot'], string> = {
  HELM: 'Helm',
  SHOULDER: 'Schulter',
  CHEST: 'Brust',
  LEGS: 'Beine',
  FEET: 'Füße',
  WEAPON: 'Waffe',
  ACCESSORY: 'Zubehör',
};

const rarityColors: Record<string, string> = {
  COMMON: '#808080',
  UNCOMMON: '#00FF00',
  RARE: '#0080FF',
  EPIC: '#8000FF',
  LEGENDARY: '#FF8000',
  ARTIFACT: '#FFD700',
};

export const EquipmentSlot: React.FC<EquipmentSlotProps> = ({
  slot,
  item,
  onClick,
  className = '',
}) => {
  const borderColor = item ? rarityColors[item.rarity] : 'var(--border-color)';
  
  return (
    <div
      className={`relative w-20 h-20 border-2 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${className}`}
      style={{ borderColor }}
      onClick={onClick}
      title={item ? item.name : slotLabels[slot]}
    >
      {item ? (
        <>
          {item.iconPath ? (
            <img src={item.iconPath} alt={item.name} className="w-12 h-12 object-contain" />
          ) : (
            <span className="text-2xl">⚔️</span>
          )}
          <span className="text-xs text-center mt-1 truncate w-full px-1" style={{ color: borderColor }}>
            {item.name}
          </span>
        </>
      ) : (
        <>
          <span className="text-gray-400 text-2xl">+</span>
          <span className="text-xs text-[var(--text-secondary)] mt-1">{slotLabels[slot]}</span>
        </>
      )}
    </div>
  );
};

