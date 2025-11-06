// Collection Book Component gemäß Masterplan

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';

interface Fragment {
  id: string;
  characterName: string | null;
  description: string;
  unlockCondition: string;
  iconPath: string | null;
  fragmentType: string;
  unlockedAt?: Date;
  book?: {
    name: string;
    abbreviation: string;
  };
}

interface CollectionBookProps {
  allFragments: Fragment[];
  unlockedFragments: Fragment[];
  collectionPercentage: number;
  collectionBonus: number;
}

export const CollectionBook: React.FC<CollectionBookProps> = ({
  allFragments,
  unlockedFragments,
  collectionPercentage,
  collectionBonus,
}) => {
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const unlockedFragmentIds = new Set(unlockedFragments.map((f) => f.id));

  const filteredFragments = allFragments.filter((fragment) => {
    if (filterType !== 'ALL' && fragment.fragmentType !== filterType) {
      return false;
    }
    return true;
  });

  const fragmentTypeLabels: Record<string, string> = {
    character: 'Charaktere',
    location: 'Orte',
    concept: 'Konzepte',
  };

  const getFragmentIcon = (fragment: Fragment) => {
    if (fragment.iconPath) {
      return fragment.iconPath;
    }

    // Default icons based on type
    const icons: Record<string, string> = {
      character: '👤',
      location: '📍',
      concept: '💡',
    };

    return icons[fragment.fragmentType] || '❓';
  };

  return (
    <div className="space-y-6">
      {/* Collection Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Sammelbuch</CardTitle>
        </CardHeader>
        <div className="p-6">
          <div className="mb-4">
            <ProgressBar
              current={collectionPercentage}
              max={100}
              label="Sammlung"
              showPercentage
              color="gold"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {unlockedFragments.length} / {allFragments.length} Fragmente freigeschaltet
            </p>
          </div>

          {collectionBonus > 0 && (
            <div className="bg-gradient-to-r from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] rounded-lg p-4 text-white">
              <div className="text-sm opacity-90 mb-1">Collection Bonus</div>
              <div className="text-2xl font-bold">
                +{Math.round(collectionBonus * 100)}% Total Strength
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-4 py-2 rounded-lg transition-all ${
            filterType === 'ALL'
              ? 'bg-[var(--color-temple-gold)] text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-[var(--text-primary)] hover:bg-gray-300'
          }`}
        >
          Alle
        </button>
        {Object.keys(fragmentTypeLabels).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterType === type
                ? 'bg-[var(--color-temple-gold)] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-[var(--text-primary)] hover:bg-gray-300'
            }`}
          >
            {fragmentTypeLabels[type]}
          </button>
        ))}
      </div>

      {/* Fragment Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFragments.map((fragment) => {
          const isUnlocked = unlockedFragmentIds.has(fragment.id);
          const unlockedFragment = unlockedFragments.find((f) => f.id === fragment.id);

          return (
            <div
              key={fragment.id}
              onClick={() => setSelectedFragment(fragment)}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                isUnlocked
                  ? 'border-[var(--color-temple-gold)] bg-[var(--color-temple-gold-light)] bg-opacity-20 hover:shadow-lg'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-50 hover:opacity-70'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2 opacity-70">
                  {getFragmentIcon(fragment)}
                </div>
                <div className={`text-sm font-semibold ${
                  isUnlocked
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                }`}>
                  {fragment.characterName || fragment.fragmentType}
                </div>
                {isUnlocked && (
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    ✓ Freigeschaltet
                  </div>
                )}
                {!isUnlocked && (
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    ???
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fragment Detail Modal */}
      {selectedFragment && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedFragment(null)}
          title={
            selectedFragment.characterName ||
            fragmentTypeLabels[selectedFragment.fragmentType] ||
            'Fragment'
          }
          size="md"
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-70">
                {getFragmentIcon(selectedFragment)}
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                {selectedFragment.description}
              </p>
            </div>

            {selectedFragment.book && (
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  Buch: {selectedFragment.book.name} ({selectedFragment.book.abbreviation})
                </p>
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                Freischaltungsbedingung:
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {selectedFragment.unlockCondition}
              </p>
            </div>

            {unlockedFragmentIds.has(selectedFragment.id) && (
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                  ✓ Bereits freigeschaltet
                </p>
                {(() => {
                  const unlockedFragment = unlockedFragments.find((f) => f.id === selectedFragment.id);
                  return unlockedFragment && unlockedFragment.unlockedAt && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Freigeschaltet am: {new Date(unlockedFragment.unlockedAt).toLocaleDateString('de-DE')}
                    </p>
                  );
                })()}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

