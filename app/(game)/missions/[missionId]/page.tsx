// Mission Gameplay Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { PhaserGame } from '@/components/game/PhaserGame';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';

interface MissionData {
  id: string;
  title: string;
  missionType: string;
  objectives: Array<{
    id: string;
    objectiveText: string;
    objectiveType: string;
    requiredValue: number;
  }>;
}

export default function MissionGameplayPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const missionId = params.missionId as string;

  const [missionData, setMissionData] = useState<MissionData | null>(null);
  const [characterEquipment, setCharacterEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [missionStarted, setMissionStarted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionData, setCompletionData] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated' && missionId) {
      loadMissionData();
    }
  }, [status, router, missionId]);

  const loadMissionData = async () => {
    try {
      const [missionsResponse, equipmentResponse] = await Promise.all([
        fetch('/api/missions'),
        fetch('/api/character/equipment'),
      ]);

      const missionsData = await missionsResponse.json();
      const equipmentData = await equipmentResponse.json();

      if (!missionsResponse.ok) {
        setError(missionsData.error || 'Fehler beim Laden der Mission');
      } else {
        const mission = missionsData.missions.find((m: any) => m.id === missionId);
        if (mission) {
          setMissionData({
            id: mission.id,
            title: mission.title,
            missionType: mission.missionType,
            objectives: mission.objectives,
          });
          
          // Prüfe ob Mission bereits gestartet wurde
          if (mission.isStarted) {
            setMissionStarted(true);
          }
        } else {
          setError('Mission nicht gefunden');
        }
        setCharacterEquipment(equipmentData.equipment || []);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = async () => {
    try {
      const response = await fetch('/api/missions/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ missionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Starten der Mission');
      } else {
        setError('');
        setMissionStarted(true);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
  };

  const handleObjectiveComplete = async (objectiveId: string, value: number) => {
    try {
      const response = await fetch('/api/missions/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          missionId,
          objectiveId,
          value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Aktualisieren des Fortschritts');
      } else {
        if (data.completed) {
          setCompletionData(data);
          setShowCompletionModal(true);
        }
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
  };

  const handleMissionComplete = () => {
    // Mission is already completed via API
    // Show completion modal
    setShowCompletionModal(true);
  };

  const handleCloseCompletion = () => {
    setShowCompletionModal(false);
    router.push('/missions');
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

  if (status === 'unauthenticated' || !missionData) {
    return null;
  }

  if (!missionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-3xl">{missionData.title}</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <h3 className="font-semibold text-lg mb-2">Objectives:</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                {missionData.objectives.map((obj) => (
                  <li key={obj.id}>{obj.objectiveText}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Steuerung:</p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                <li>WASD oder Pfeiltasten: Bewegung</li>
                <li>E: Interaktion mit NPCs/Objekten</li>
                <li>ESC: Pause</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleStartMission}
              >
                Mission starten
              </Button>
              
              {error && error.includes('bereits gestartet') && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setError('');
                    setMissionStarted(true); // Erzwinge Game-Laden
                  }}
                >
                  Trotzdem spielen
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-4 left-4 z-10">
        <Button
          variant="secondary"
          onClick={() => router.push('/missions')}
        >
          Zurück zu Missionen
        </Button>
      </div>

      {error && (
        <div className="fixed top-4 right-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="w-full h-screen">
        <PhaserGame
          missionId={missionId}
          missionData={missionData}
          characterEquipment={characterEquipment}
          onObjectiveComplete={handleObjectiveComplete}
          onMissionComplete={handleMissionComplete}
        />
      </div>

      {showCompletionModal && (
        <Modal
          isOpen={showCompletionModal}
          onClose={handleCloseCompletion}
          title="Mission abgeschlossen!"
          size="md"
        >
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-semibold text-[var(--text-primary)]">
              {missionData.title}
            </p>
            <p className="text-[var(--text-secondary)]">
              Du hast die Mission erfolgreich abgeschlossen!
            </p>
            {completionData && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
                <p className="text-sm text-[var(--text-secondary)] mb-2">Belohnungen:</p>
                <p className="font-semibold text-[var(--color-temple-gold)]">
                  XP erhalten: {completionData.experienceGained || 'N/A'}
                </p>
              </div>
            )}
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={handleCloseCompletion}
            >
              Weiter
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

