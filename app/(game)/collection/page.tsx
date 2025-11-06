// Collection Book Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CollectionBook } from '@/components/collection/CollectionBook';

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

export default function CollectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [allFragments, setAllFragments] = useState<Fragment[]>([]);
  const [unlockedFragments, setUnlockedFragments] = useState<Fragment[]>([]);
  const [collectionPercentage, setCollectionPercentage] = useState(0);
  const [collectionBonus, setCollectionBonus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadFragments();
    }
  }, [status, router]);

  const loadFragments = async () => {
    try {
      const [allFragmentsResponse, characterFragmentsResponse] = await Promise.all([
        fetch('/api/fragments'),
        fetch('/api/character/fragments'),
      ]);

      const allFragmentsData = await allFragmentsResponse.json();
      const characterFragmentsData = await characterFragmentsResponse.json();

      if (!allFragmentsResponse.ok) {
        setError(allFragmentsData.error || 'Fehler beim Laden der Fragmente');
      } else if (!characterFragmentsResponse.ok) {
        setError(characterFragmentsData.error || 'Fehler beim Laden der Charakter-Fragmente');
      } else {
        setAllFragments(allFragmentsData.fragments || []);
        setUnlockedFragments(characterFragmentsData.fragments || []);
        setCollectionPercentage(characterFragmentsData.collectionPercentage || 0);
        setCollectionBonus(characterFragmentsData.collectionBonus || 0);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-temple-gold)] mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Lädt...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <CollectionBook
          allFragments={allFragments}
          unlockedFragments={unlockedFragments}
          collectionPercentage={collectionPercentage}
          collectionBonus={collectionBonus}
        />
      </div>
    </div>
  );
}

