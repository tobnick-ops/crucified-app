// Public User Profile Page - Social Foundation
// Zeigt Character-Info, Stats, Achievements (opt-in)

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { StatsRadarChart } from '@/components/dashboard/StatsRadarChart';
import { StreakDisplay } from '@/components/dashboard/StreakDisplay';

interface UserProfile {
  user: {
    id: string;
    name: string;
  };
  character: {
    name: string;
    level: number;
    totalStrength: number;
    stats: {
      faith: number;
      wisdom: number;
      knowledge: number;
      service: number;
      leadership: number;
    };
  };
  streak: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  fragmentsCollected: number;
  isPublic: boolean;
  isFriend: boolean;
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = params.userId as string;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, userId]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/profile/${userId}`);
      if (!res.ok) throw new Error('Profil nicht gefunden');
      
      const data = await res.json();
      setProfile(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    try {
      await fetch('/api/social/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: userId }),
      });
      // Refresh profile
      fetchProfile();
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Lädt Profil...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold mb-2">Profil nicht verfügbar</h2>
            <p className="text-[var(--text-secondary)]">
              {error || 'Dieses Profil ist privat oder existiert nicht.'}
            </p>
            <Button variant="primary" size="md" onClick={() => router.back()} className="mt-4">
              Zurück
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isOwnProfile = session?.user?.id === userId;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{profile.character.name}</h1>
              <p className="text-[var(--text-secondary)]">
                Gespielt von {profile.user.name}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <div className="text-2xl font-bold text-[var(--color-temple-gold)]">
                    Level {profile.character.level}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {profile.character.totalStrength} Total Strength
                  </div>
                </div>
              </div>
            </div>

            <div>
              <StreakDisplay streak={profile.streak} size="md" />
            </div>
          </div>

          {!isOwnProfile && (
            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
              {profile.isFriend ? (
                <Button variant="secondary" size="sm" disabled>
                  ✅ Bereits Freunde
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleAddFriend}>
                  👋 Als Freund hinzufügen
                </Button>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Character Stats 📊</CardTitle>
          </CardHeader>
          <div className="p-6 pt-0">
            <StatsRadarChart
              stats={profile.character.stats}
              maxValue={200}
              size={280}
            />
          </div>
        </Card>

        {/* Achievements & Collection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements 🏆</CardTitle>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-center">
                <div className="text-5xl font-bold text-[var(--color-temple-gold)] mb-2">
                  {Math.round((profile.achievementsUnlocked / profile.totalAchievements) * 100)}%
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {profile.achievementsUnlocked} / {profile.totalAchievements} Freigeschaltet
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sammlung 📚</CardTitle>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-center">
                <div className="text-5xl font-bold text-[var(--color-temple-gold)] mb-2">
                  {Math.round((profile.fragmentsCollected / 60) * 100)}%
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {profile.fragmentsCollected} / 60 Fragmente
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

