// Skills Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SkillTree } from '@/components/character/SkillTree';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

interface SkillNode {
  id: string;
  name: string;
  description: string;
  levelRequirement: number;
  parentSkillId: string | null;
  skillType: string;
  effect: string;
  children?: SkillNode[];
}

export default function SkillsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [skillTree, setSkillTree] = useState<SkillNode[]>([]);
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);
  const [characterLevel, setCharacterLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadSkills();
    }
  }, [status, router]);

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/character/skills');
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Laden der Skills');
      } else {
        setSkillTree(data.skillTree || []);
        setUnlockedSkills(data.unlockedSkills || []);
        // TODO: Character Level laden
        setCharacterLevel(1); // Placeholder
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillUnlock = async (skillId: string) => {
    try {
      const response = await fetch('/api/character/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skillId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Freischalten');
      } else {
        // Skill erfolgreich freigeschaltet
        setUnlockedSkills([...unlockedSkills, skillId]);
        setError('');
        // Reload page to see updated stats
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
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
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {skillTree.length > 0 ? (
          <SkillTree
            skillTree={skillTree}
            characterLevel={characterLevel}
            unlockedSkills={unlockedSkills}
            onSkillUnlock={handleSkillUnlock}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Fähigkeitsbaum</CardTitle>
            </CardHeader>
            <div className="p-6 text-center">
              <p className="text-[var(--text-secondary)]">
                Kein Skill Tree verfügbar. Bitte wähle zuerst einen Rabbi.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
