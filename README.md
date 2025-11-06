# Crucified App – Entwicklungsleitfaden

## 1. Voraussetzungen

- Node.js 18+ (oder kompatibel mit Next.js 16)
- npm (Standard) – alternative Paketmanager sind möglich, werden jedoch nicht getestet
- PostgreSQL 15 (lokal oder via Docker)

## 2. Umgebungsvariablen

1. Kopiere die Vorlage und befülle sie mit deinen Werten:

   ```bash
   cp .env.example .env.local
   ```

2. Passe mindestens `DATABASE_URL`, `NEXTAUTH_SECRET` und `NEXTAUTH_URL` an.

## 3. Datenbank & Seed-Daten

Die schnellste Variante ist das vorbereitete Setup-Skript:

```bash
npm run setup:database
```

Das Skript erledigt folgende Schritte automatisch:

- optionalen PostgreSQL-Docker-Container (Name: `crucified-postgres`) starten oder anlegen
- `npm install`
- `prisma generate`
- `prisma migrate deploy`
- Seed-Daten (`prisma/seed/index.ts`)
- Test-Account erstellen (`test@crucified.app` / `Test123456`)

Du kannst jeden Schritt auch manuell ausführen:

```bash
npm install
npm run db:generate
npm run db:migrate
# Für Schema-Änderungen während der Entwicklung:
# npm run db:migrate:dev
npm run db:seed
npm run test:create-account
```

## 4. Entwicklung starten

```bash
npm run dev
```

Die App läuft anschließend unter [http://localhost:3000](http://localhost:3000). Das Kommando verwendet bewusst `next dev --webpack`, um klassische Webpack-Erweiterungen (z. B. PWA) zu unterstützen.

## 5. Nützliche Skripte

- `npm run db:studio` — Prisma Studio zum manuellen Blick in die Datenbank
- `npm run db:push` — Schema ohne Migration synchronisieren (nur für Prototypen)
- `npm run db:migrate` — Migrationen auf eine bestehende Datenbank anwenden
- `npm run db:migrate:dev` — Migrationen entwickeln und anwenden (lokal)
- `npm run db:seed` — Referenz- und Content-Daten neu einspielen
- `npm run test:create-account` — Test-Login aktualisieren oder erzeugen

## 6. API-Schnittstellen

- `GET /api/health` — Systemstatus & Datenbank-Erreichbarkeit
- `GET /api/lessons` — Liste der verfügbaren Lektionen
- `GET /api/missions` — Missionsübersicht mit Belohnungen

## 7. Testing-Roadmap

Den jeweils aktuellen Teststatus findest du im Dokument `crucified-app/TESTING_MASTER.md`. Dort sind Frontend- und Backend-Fortschritte, Blocker sowie nächste Schritte detailliert beschrieben.

## 8. Weitere Ressourcen

- Next.js App Router Dokumentation: https://nextjs.org/docs
- Prisma ORM Dokumentation: https://www.prisma.io/docs
- NextAuth.js Credentials Provider: https://next-auth.js.org/providers/credentials
