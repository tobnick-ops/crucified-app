// Navigation Component gemäß Masterplan

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/character', label: 'Charakter', icon: '👤' },
    { href: '/character/equipment', label: 'Ausrüstung', icon: '⚔️' }, // FIX: Equipment-Link hinzugefügt
    { href: '/lessons', label: 'Lektionen', icon: '📖' },
    { href: '/missions', label: 'Missionen', icon: '🎮' },
    { href: '/collection', label: 'Sammlung', icon: '📚' },
    { href: '/achievements', label: 'Erfolge', icon: '🏆' },
    { href: '/quests', label: 'Quests', icon: '📋' },
    { href: '/leaderboard', label: 'Rangliste', icon: '🏅' },
  ];

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] border-b-2 border-[var(--color-temple-gold)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white temple-gradient text-transparent bg-clip-text">
              Crucified
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-[var(--color-temple-gold)] text-white font-semibold'
                    : 'text-white hover:bg-[var(--color-temple-gold-light)] hover:bg-opacity-30'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/beta"
              className="px-4 py-2 text-white hover:bg-[var(--color-temple-gold-light)] hover:bg-opacity-30 rounded-lg transition-all"
            >
              Beta
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-white hover:bg-[var(--color-temple-gold-light)] hover:bg-opacity-30 rounded-lg transition-all"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive(item.href)
                    ? 'bg-[var(--color-temple-gold)] text-white font-semibold'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

