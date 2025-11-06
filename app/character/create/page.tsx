// Character Creation Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface Rabbi {
  id: string;
  name: string;
  description: string;
  iconPath?: string;
}

export default function CharacterCreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rabbiId, setRabbiId] = useState('');
  const [rabbis, setRabbis] = useState<Rabbi[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRabbis, setLoadingRabbis] = useState(true);
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      // Lade Namen aus localStorage (von Signup)
      const savedName = localStorage.getItem('pendingCharacterName');
      if (savedName) {
        setCharacterName(savedName);
      }
    }
  }, [status, router]);

  useEffect(() => {
    // Lade Rabbis von der API
    const fetchRabbis = async () => {
      try {
        const response = await fetch('/api/rabbi');
        const data = await response.json();
        
        if (response.ok && data.rabbis) {
          setRabbis(data.rabbis);
        } else {
          setError('Rabbis konnten nicht geladen werden');
        }
      } catch (err) {
        console.error('Fehler beim Laden der Rabbis:', err);
        setError('Fehler beim Laden der Rabbis');
      } finally {
        setLoadingRabbis(false);
      }
    };
    
    fetchRabbis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!rabbiId) {
      setError('Bitte wähle einen Rabbi');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/character/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          rabbiId, 
          name: characterName || 'Spieler' // Name aus localStorage oder Fallback
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Charakter-Erstellung fehlgeschlagen');
      } else {
        // Lösche gespeicherten Namen
        localStorage.removeItem('pendingCharacterName');
        // Nach Character Creation zur Character View
        router.push('/character');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loadingRabbis) {
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
      <div className="max-w-4xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center temple-gradient text-transparent bg-clip-text">
              Charakter erstellen
            </CardTitle>
            <CardDescription className="text-center">
              Wähle deinen Rabbi und beginne deine Reise im Tempel
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-4">
                Wähle deinen Rabbi (Lehrer)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rabbis.map((rabbi) => (
                  <div
                    key={rabbi.id}
                    onClick={() => setRabbiId(rabbi.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      rabbiId === rabbi.id
                        ? 'border-[var(--color-temple-gold)] bg-[var(--color-temple-gold-light)] bg-opacity-20 temple-shadow'
                        : 'border-[var(--border-color)] hover:border-[var(--color-temple-gold)] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-temple-gold)] to-[var(--color-temple-gold-dark)] flex items-center justify-center text-white font-bold text-lg">
                          {rabbi.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">{rabbi.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">{rabbi.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading || !rabbiId}>
              {loading ? 'Erstellt...' : 'Charakter erstellen'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

