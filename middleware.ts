import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Geschützte Routen (erfordern Login)
const protectedRoutes = [
  '/character',
  '/lessons',
  '/missions',
  '/collection',
  '/daily',
  '/leaderboard',
  '/beta',
];

// Öffentliche Routen (können auch eingeloggt besucht werden)
const publicRoutes = [
  '/',
  '/signin',
  '/signup',
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Prüfe ob Route geschützt ist
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // API Routes überspringen (außer Auth)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    // API Routes haben ihre eigenen Auth-Checks
    return NextResponse.next();
  }

  // Wenn geschützte Route und nicht eingeloggt
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Wenn auf Login/Registrierung-Seite und bereits eingeloggt, zu Character weiterleiten
  if ((pathname === '/signin' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/character', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

