# Testing Quick Start

## 1. Vorbereitung

1. `.env.example` nach `.env.local` kopieren und Werte anpassen.
2. PostgreSQL bereitstellen (Docker empfohlen) oder bestehende Instanz nutzen.

## 2. Automatisches Setup

```bash
npm run setup:database
```

Das Skript erledigt `npm install`, `prisma generate`, `prisma migrate deploy`, `npm run db:seed` und `npm run test:create-account`. Zusätzlich wird – sofern Docker verfügbar ist – automatisch ein Container `crucified-postgres` gestartet oder erstellt.

## 3. Manuelles Setup (optional)

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run test:create-account
```

## 4. Tests & Entwicklung

- Dev Server: `npm run dev`
- Prisma Studio: `npm run db:studio`

Alle detaillierten Erkenntnisse, Checklisten und Roadmaps findest du in `TESTING_MASTER.md`.
