# Database Setup Guide - Quick Start

## Option 1: Docker PostgreSQL (Empfohlen - Einfach)

### Installation
```bash
# Docker installieren (falls nicht vorhanden)
# macOS: https://docs.docker.com/desktop/install/mac-install/
# Linux: https://docs.docker.com/engine/install/
# Windows: https://docs.docker.com/desktop/install/windows-install/

# PostgreSQL Container starten
docker run --name crucified-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crucified \
  -p 5432:5432 \
  -d postgres:15

# Prüfen ob Container läuft
docker ps | grep crucified-postgres

# Container stoppen (falls nötig)
docker stop crucified-postgres

# Container starten (falls gestoppt)
docker start crucified-postgres
```

### DATABASE_URL
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crucified?schema=public"
```

## Option 2: Lokale PostgreSQL Installation

### macOS (Homebrew)
```bash
# PostgreSQL installieren
brew install postgresql@15

# PostgreSQL starten
brew services start postgresql@15

# Database erstellen
createdb crucified
```

### Linux (Ubuntu/Debian)
```bash
# PostgreSQL installieren
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# PostgreSQL starten
sudo systemctl start postgresql

# Als postgres User: Database erstellen
sudo -u postgres createdb crucified

# Passwort setzen (optional)
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

### Windows
```bash
# PostgreSQL von postgresql.org herunterladen und installieren
# Dann:
createdb -U postgres crucified
```

### DATABASE_URL
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crucified?schema=public"
```

## Option 3: Cloud Database (Production)

### Railway
1. Account auf [railway.app](https://railway.app) erstellen
2. Neues Projekt erstellen
3. PostgreSQL Service hinzufügen
4. DATABASE_URL aus Railway Dashboard kopieren

### Render
1. Account auf [render.com](https://render.com) erstellen
2. PostgreSQL Database erstellen
3. DATABASE_URL aus Render Dashboard kopieren

### Supabase
1. Account auf [supabase.com](https://supabase.com) erstellen
2. Neues Projekt erstellen
3. DATABASE_URL aus Supabase Dashboard kopieren

## Nach Database Setup

### 1. Environment Variables
```bash
# .env.local erstellen/bearbeiten
DATABASE_URL="postgresql://user:password@host:port/crucified?schema=public"
NEXTAUTH_SECRET="generiere-mit-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Prisma Setup
```bash
# Prisma Client generieren
npm run db:generate

# Database Migrations
npm run db:migrate

# Seed Data (Content)
npm run seed:all
```

### 3. Test-Account erstellen
```bash
# Test-Account erstellen
npm run test:create-account
```

### 4. Testing
```bash
# Dev Server starten
npm run dev

# Dann im Browser:
# 1. Login: test@crucified.app / Test123456
# 2. Character erstellen
# 3. Alle Features testen
```

## Troubleshooting

### DATABASE_URL Error
- Prüfe ob Database läuft
- Prüfe DATABASE_URL Format
- Prüfe ob Port 5432 frei ist

### Connection Error
- Prüfe Firewall Settings
- Prüfe ob PostgreSQL läuft
- Prüfe Credentials (User/Password)

### Migration Error
- Prüfe Database Connection
- Prüfe Schema Compatibility
- Backup vor Migration

## Quick Test

```bash
# Test Database Connection
psql "postgresql://postgres:postgres@localhost:5432/crucified?schema=public" -c "SELECT 1;"
```

Wenn das funktioniert, ist die Database Connection korrekt!

