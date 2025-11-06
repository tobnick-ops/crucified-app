// Global Error Component gemäß Masterplan

'use client';

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { handleApiError } from '@/lib/utils/error-handling';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error tracking service
    console.error('Global error:', error);
  }, [error]);

  const errorMessage = handleApiError(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-red-600">Ein Fehler ist aufgetreten</CardTitle>
        </CardHeader>
        <div className="p-6 space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            {errorMessage}
          </p>
          {error.digest && (
            <p className="text-xs text-[var(--text-secondary)]">
              Fehler-ID: {error.digest}
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="primary" onClick={reset} className="flex-1">
              Erneut versuchen
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = '/')}
              className="flex-1"
            >
              Zur Startseite
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

