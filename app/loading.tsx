// Global Loading Component gemäß Masterplan

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[var(--text-secondary)]">Lädt...</p>
      </div>
    </div>
  );
}

