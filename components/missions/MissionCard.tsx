// Mission Card Component gemäß Masterplan

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui';

interface Mission {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  experienceReward: number;
  missionType: string;
  estimatedDuration: number;
  status: string;
  book: {
    name: string;
    abbreviation: string;
  };
}

interface MissionCardProps {
  mission: Mission;
  characterLevel: number;
  onStart: (missionId: string) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  characterLevel,
  onStart,
}) => {
  const missionTypeLabels: Record<string, string> = {
    RESOURCE_COLLECTION: 'Ressourcen sammeln',
    STORY_INTERACTION: 'Geschichte interagieren',
    COMBAT: 'Kampf',
    PUZZLE: 'Rätsel',
  };

  const missionTypeColors: Record<string, string> = {
    RESOURCE_COLLECTION: 'text-green-600',
    STORY_INTERACTION: 'text-blue-600',
    COMBAT: 'text-red-600',
    PUZZLE: 'text-purple-600',
  };

  const canStart = characterLevel >= mission.requiredLevel && mission.status !== 'completed';
  const isInProgress = mission.status === 'in_progress';

  return (
    <Card hover={canStart && !isInProgress}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{mission.title}</CardTitle>
            <CardDescription className="mt-1">
              {mission.book.name} ({mission.book.abbreviation})
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-sm font-semibold ${missionTypeColors[mission.missionType] || 'text-gray-600'}`}>
              {missionTypeLabels[mission.missionType] || mission.missionType}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">
              Level {mission.requiredLevel}
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="p-6 pt-0 space-y-4">
        <p className="text-sm text-[var(--text-secondary)]">{mission.description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">XP Belohnung:</span>
          <span className="font-semibold text-[var(--color-temple-gold)]">
            {mission.experienceReward} XP
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Geschätzte Dauer:</span>
          <span className="font-semibold text-[var(--text-primary)]">
            {mission.estimatedDuration} Min
          </span>
        </div>

        {!canStart && (
          <div className="text-sm text-red-600">
            {mission.status === 'completed' && '✓ Bereits abgeschlossen'}
            {characterLevel < mission.requiredLevel && `Level ${mission.requiredLevel} erforderlich`}
          </div>
        )}

        {isInProgress && (
          <div className="text-sm text-blue-600 font-semibold">
            ⏳ In Bearbeitung
          </div>
        )}

        {canStart && !isInProgress && (
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onStart(mission.id)}
          >
            Mission starten
          </Button>
        )}

        {isInProgress && (
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onStart(mission.id)}
          >
            Mission fortsetzen
          </Button>
        )}
      </div>
    </Card>
  );
};

