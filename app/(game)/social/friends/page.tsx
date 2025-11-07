// Friends Page - Social Feature
// Freunde-Liste, Friend Requests, Add Friends

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';

interface Friend {
  id: string;
  name: string;
  characterName: string;
  level: number;
  totalStrength: number;
  streak: number;
  status: 'ACCEPTED' | 'PENDING';
}

export default function FriendsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchFriends();
    }
  }, [status, router]);

  const fetchFriends = async () => {
    try {
      const res = await fetch('/api/social/friends');
      const data = await res.json();
      
      setFriends(data.friends || []);
      setPendingRequests(data.pending || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (friendId: string) => {
    try {
      await fetch(`/api/social/friends/${friendId}/accept`, {
        method: 'POST',
      });
      fetchFriends();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const declineRequest = async (friendId: string) => {
    try {
      await fetch(`/api/social/friends/${friendId}/decline`, {
        method: 'POST',
      });
      fetchFriends();
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Lädt Freunde...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Freunde 👥</h1>
        <p className="text-[var(--text-secondary)]">
          Verbinde dich mit anderen Gläubigen und wachst gemeinsam!
        </p>
      </motion.div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Anfragen ({pendingRequests.length})</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingRequests.map(request => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.characterName}</CardTitle>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Level {request.level} • {request.totalStrength} STR
                      </div>
                    </div>
                    <div className="text-3xl">👤</div>
                  </div>
                </CardHeader>
                <div className="px-6 pb-6 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => acceptRequest(request.id)}
                    className="flex-1"
                  >
                    ✅ Akzeptieren
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => declineRequest(request.id)}
                    className="flex-1"
                  >
                    ❌ Ablehnen
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Meine Freunde ({friends.length})
        </h2>

        {friends.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/profile/${friend.id}`}>
                  <Card hover>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">👤</div>
                        <div>
                          <div className="font-bold">{friend.characterName}</div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            Level {friend.level}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[var(--color-temple-gold)]">
                          {friend.totalStrength} STR
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          🔥 {friend.streak} Tage
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Noch keine Freunde</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Füge Freunde hinzu, um ihre Fortschritte zu sehen und euch gegenseitig zu motivieren!
              </p>
              <Button variant="primary" size="md">
                Freunde finden 🔍
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Social Features Teaser */}
      <Card>
        <CardHeader>
          <CardTitle>Bald verfügbar 🚀</CardTitle>
          <CardDescription>Kommende Social Features</CardDescription>
        </CardHeader>
        <div className="p-6 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚔️</div>
              <h3 className="font-bold mb-1">Challenges</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Fordere Freunde zu Lern-Duellen heraus!
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">⛪</div>
              <h3 className="font-bold mb-1">Gilden</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Gründe oder trete Studien-Gruppen bei!
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

