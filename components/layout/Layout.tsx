// Layout Component gemäß Masterplan

'use client';

import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)]">
      <Navigation />
      <main className="pb-8">{children}</main>
    </div>
  );
};

