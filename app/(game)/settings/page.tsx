// Settings & Personalization Page
// User Preferences für Personalization Engine

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui';

interface Preferences {
  dailyGoal: number;
  difficulty: string;
  theme: string;
  fontSize: string;
  reducedMotion: boolean;
  soundEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  profilePublic: boolean;
  showOnLeaderboard: boolean;
}

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [preferences, setPreferences] = useState<Preferences>({
    dailyGoal: 3,
    difficulty: 'adaptive',
    theme: 'auto',
    fontSize: 'medium',
    reducedMotion: false,
    soundEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    profilePublic: false,
    showOnLeaderboard: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchPreferences();
    }
  }, [status, router]);

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/user/preferences');
      if (res.ok) {
        const data = await res.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: keyof Preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Einstellungen ⚙️</h1>
        <p className="text-[var(--text-secondary)]">
          Personalisiere deine Lern-Erfahrung
        </p>
      </motion.div>

      {/* Personalization */}
      <Card>
        <CardHeader>
          <CardTitle>Personalisierung 🎯</CardTitle>
          <CardDescription>Passe die App an deine Bedürfnisse an</CardDescription>
        </CardHeader>
        <div className="p-6 pt-0 space-y-4">
          {/* Daily Goal */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tägliches Ziel (Lektionen pro Tag)
            </label>
            <select
              value={preferences.dailyGoal}
              onChange={(e) => updatePreference('dailyGoal', parseInt(e.target.value))}
              className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-white dark:bg-gray-800"
            >
              <option value={1}>1 Lektion (Entspannt)</option>
              <option value={3}>3 Lektionen (Normal)</option>
              <option value={5}>5 Lektionen (Ehrgeizig)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Schwierigkeitsgrad
            </label>
            <select
              value={preferences.difficulty}
              onChange={(e) => updatePreference('difficulty', e.target.value)}
              className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="easy">Einfach</option>
              <option value="medium">Mittel</option>
              <option value="hard">Schwer</option>
              <option value="adaptive">Adaptiv (Empfohlen)</option>
            </select>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Adaptiv passt sich deiner Performance an
            </p>
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Erscheinungsbild 🎨</CardTitle>
        </CardHeader>
        <div className="p-6 pt-0 space-y-4">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              value={preferences.theme}
              onChange={(e) => updatePreference('theme', e.target.value)}
              className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="light">Hell</option>
              <option value="dark">Dunkel</option>
              <option value="auto">Automatisch</option>
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium mb-2">Schriftgröße</label>
            <select
              value={preferences.fontSize}
              onChange={(e) => updatePreference('fontSize', e.target.value)}
              className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="small">Klein</option>
              <option value="medium">Mittel</option>
              <option value="large">Groß</option>
            </select>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Reduzierte Bewegungen</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Weniger Animationen (Barrierefreiheit)
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => updatePreference('reducedMotion', e.target.checked)}
              className="w-6 h-6"
            />
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Sound-Effekte</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Aktiviere Sounds für Aktionen
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.soundEnabled}
              onChange={(e) => updatePreference('soundEnabled', e.target.checked)}
              className="w-6 h-6"
            />
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Privatsphäre 🔒</CardTitle>
        </CardHeader>
        <div className="p-6 pt-0 space-y-4">
          {/* Profile Public */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Öffentliches Profil</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Andere können dein Profil sehen
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.profilePublic}
              onChange={(e) => updatePreference('profilePublic', e.target.checked)}
              className="w-6 h-6"
            />
          </div>

          {/* Leaderboard */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Im Leaderboard anzeigen</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Erscheine in globalen Rankings
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.showOnLeaderboard}
              onChange={(e) => updatePreference('showOnLeaderboard', e.target.checked)}
              className="w-6 h-6"
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Benachrichtigungen 🔔</CardTitle>
        </CardHeader>
        <div className="p-6 pt-0 space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">E-Mail Benachrichtigungen</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Streak-Erinnerungen, Updates
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={(e) => updatePreference('emailNotifications', e.target.checked)}
              className="w-6 h-6"
            />
          </div>

          {/* Push */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Push Benachrichtigungen</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Mobile/Desktop Notifications
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.pushNotifications}
              onChange={(e) => updatePreference('pushNotifications', e.target.checked)}
              className="w-6 h-6"
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={savePreferences}
          isLoading={saving}
          className="flex-1"
        >
          {saved ? '✅ Gespeichert!' : 'Einstellungen speichern'}
        </Button>
      </div>
    </div>
  );
}

