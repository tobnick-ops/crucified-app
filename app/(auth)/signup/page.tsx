// Sign Up Page gemäß Masterplan

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registrierung fehlgeschlagen');
      } else {
        // Speichere Namen für Character-Creation
        localStorage.setItem('pendingCharacterName', name);
        
        // Nach Registrierung automatisch einloggen
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          // Wenn Auto-Login fehlschlägt, zur Login-Seite
          router.push('/signin');
        } else {
          // Nach Login zur Character Creation
          router.push('/character/create');
        }
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center temple-gradient text-transparent bg-clip-text">
            Registrierung
          </CardTitle>
          <CardDescription className="text-center">
            Erstelle deinen Account und beginne deine Reise
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Name (für deinen Charakter)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
              placeholder="deine@email.de"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Mindestens 8 Zeichen
            </p>
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Lädt...' : 'Registrieren'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
          Bereits registriert?{' '}
          <a href="/signin" className="text-[var(--color-temple-gold)] hover:underline">
            Anmelden
          </a>
        </div>
      </Card>
    </div>
  );
}

