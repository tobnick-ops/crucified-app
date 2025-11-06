// Auth Helper Functions gemäß Masterplan

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

/**
 * Prüft ob User eingeloggt ist (Server-Side)
 * Leitet zur Login-Seite weiter wenn nicht eingeloggt
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  return session;
}

/**
 * Prüft ob User eingeloggt ist (Server-Side)
 * Gibt null zurück wenn nicht eingeloggt (keine Weiterleitung)
 */
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

