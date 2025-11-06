// Homepage gemäß Masterplan

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FeedbackModal } from '@/components/feedback/FeedbackModal';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'bug' | 'feature'>('feedback');

  useEffect(() => {
    // Check for feedback query parameter
    const feedback = searchParams.get('feedback');
    if (feedback === 'feedback' || feedback === 'bug' || feedback === 'feature') {
      setFeedbackType(feedback);
      setFeedbackModalOpen(true);
    }

    // Redirect authenticated users
    if (status === 'authenticated' && session) {
      // Check if user has character (client-side redirect handled by server)
      router.push('/character');
    }
  }, [status, session, router, searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] flex items-center justify-center">
        <div className="text-white text-xl">Lädt...</div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return null; // Will redirect
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] flex items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4 temple-gradient text-transparent bg-clip-text">
            Crucified
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Wachse in deinem Glauben durch gamifiziertes Lernen
          </p>
          <div className="flex gap-4 justify-center mb-6">
            <Link href="/signin">
              <Button variant="primary" size="lg">
                Anmelden
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Registrieren
              </Button>
            </Link>
          </div>
          <div className="mt-8">
            <Link href="/beta">
              <Button variant="secondary" size="sm">
                Beta-Testing Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => {
          setFeedbackModalOpen(false);
          router.push('/');
        }}
        type={feedbackType}
      />
    </>
  );
}
