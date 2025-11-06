// Providers Component gemäß Masterplan - mit Error Boundary

'use client';

import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  );
}
