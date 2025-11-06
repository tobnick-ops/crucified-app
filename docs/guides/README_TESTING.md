# Testing - Quick Start Guide

> **Wichtig**: Für vollständige Testing-Erkenntnisse siehe `TESTING_MASTER.md`

## 🚀 Quick Start

### 1. Database Setup (ERFORDERLICH)

```bash
# Option 1: Docker (Empfohlen)
docker run --name crucified-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crucified \
  -p 5432:5432 \
  -d postgres:15

# Option 2: Lokale PostgreSQL
createdb crucified
```

### 2. Environment Variables

```bash
# .env.local erstellen/bearbeiten
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crucified?schema=public"
NEXTAUTH_SECRET="generiere-mit-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Prisma Setup

```bash
npm run db:generate
npm run db:migrate
npm run seed:all
```

### 4. Test-Account erstellen

```bash
npm run test:create-account
```

**Test-Account Details:**
- Email: `test@crucified.app`
- Password: `Test123456`

### 5. Testing

```bash
npm run dev
# Dann im Browser:
# 1. Login: test@crucified.app / Test123456
# 2. Character erstellen
# 3. Alle Features testen
```

## 📚 Vollständige Dokumentation

- **Testing Master**: `TESTING_MASTER.md` - Alle Testing-Erkenntnisse
- **Database Setup**: `DATABASE_SETUP_GUIDE.md` - Detaillierte Anleitung
- **Testing Setup**: `TESTING_SETUP.md` - Setup-Anleitung

## ✅ Aktueller Status

- **Frontend**: ✅ 100% getestet
- **Backend**: ⚠️ Erfordert Database Setup
- **Gesamt**: ⚠️ 39% (7/18 Features)

---

Für weitere Informationen siehe `TESTING_MASTER.md`

