// Missions Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MissionCard } from '@/components/missions/MissionCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

interface Mission {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  experienceReward: number;
  missionType: string;
  estimatedDuration: number;
  status: string;
  objectives: Array<{
    id: string;
    objectiveText: string;
    objectiveType: string;
    requiredValue: number;
  }>;
  book: {
    name: string;
    abbreviation: string;
  };
}

export default function MissionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [characterLevel, setCharacterLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadMissions();
    }
  }, [status, router]);

  const loadMissions = async () => {
    try {
      const [missionsResponse, statsResponse] = await Promise.all([
        fetch('/api/missions'),
        fetch('/api/character/stats'),
      ]);

      const missionsData = await missionsResponse.json();
      const statsData = await statsResponse.json();

      if (!missionsResponse.ok) {
        setError(missionsData.error || 'Fehler beim Laden der Missionen');
      } else {
        setMissions(missionsData.missions || []);
        setCharacterLevel(statsData.level || 1);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = (missionId: string) => {
    router.push(`/missions/${missionId}`);
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Missionen</CardTitle>
          </CardHeader>
          <div className="p-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Interaktive Missionen basierend auf Bibelgeschichten. Steuere deinen Charakter durch die Welt und erfülle die Aufgaben.
            </p>
          </div>
        </Card>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              characterLevel={characterLevel}
              onStart={handleStartMission}
            />
          ))}
        </div>

        {missions.length === 0 && (
          <Card>
            <div className="p-6 text-center">
              <p className="text-[var(--text-secondary)]">
                Keine Missionen verfügbar. Erreiche höhere Levels, um mehr Missionen freizuschalten.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

