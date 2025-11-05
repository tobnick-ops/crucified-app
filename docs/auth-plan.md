## Ziel

Implementierung eines einfachen Authentifizierungs-Stacks für die Next.js-App, bestehend aus Registrierungs- und Login-Flow, Datenbankanbindung sowie Grundlogik für Sessions.

## Architekturüberblick

- **App Router**: Nutzung von Server Components und Server Actions für Formularverarbeitung (`/register`, `/login`).
- **Persistenz**: Prisma mit SQLite (schnelle lokale Entwicklung, später auf Postgres erweiterbar).
- **Security**: Passwort-Hashing via `bcryptjs`, Session-Token als signiertes JWT in HTTP-only-Cookie.
- **Middleware/Redirects**: Ungesicherte Benutzer werden auf `/login` umgeleitet; authentifizierte Nutzer landen auf einer geschützten Hauptseite (`/dashboard`).
- **Validation**: Zod-Schemata für Formularvalidierung (Client + Server).
- **Testing**: Smoke-Tests (Playwright) für Register/Login-Flow, Unit-Tests für Hilfsfunktionen.

## Implementierungsschritte

1. **Packages**: `prisma`, `@prisma/client`, `bcryptjs`, `jsonwebtoken`, `zod` (+ Typen). Prisma initialisieren, `schema.prisma` mit `User`-Modell erstellen.
2. **Utility-Layer**: `lib/prisma.ts` für Singleton, `lib/auth.ts` für Hashing/Token, `lib/session.ts` zur Session-Verwaltung.
3. **Server Actions**: Formulare in `/register` und `/login`, die Server Actions verwenden, um mit DB zu sprechen und Cookies zu setzen.
4. **Middleware**: Zugriffsschutz für alle Seiten außer Auth-Routen und statischen Assets; Redirect auf `/login`, wenn kein Cookie.
5. **UI**: Schlichte Formulare mit zustandsbasierten Fehlermeldungen; Erfolgsredirect auf `/dashboard`.
6. **Tests**: Playwright-Szenarien für Registrierung/Anmeldung, Vitest/Jest für Utility-Funktionen.
7. **Konfiguration**: `.env.example` mit `AUTH_SECRET`, Prisma-Migration (`prisma/dev.db` in `.gitignore`).

## Offene Punkte / Erweiterungen

- Erweiterung auf Social Login via `next-auth`.
- Passwort-Reset und E-Mail-Verifikation.
- Rollen-/Rechteverwaltung.
- Deployment-ready Datenbank (PlanetScale, Neon o. Ä.).
