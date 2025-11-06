# Deployment Guide gemäß Masterplan

## Voraussetzungen

- Node.js 18+
- PostgreSQL Datenbank
- Vercel Account (für Frontend)
- Railway/Render Account (für Backend/Database)

## Deployment Steps

### 1. Datenbank Setup

#### Option A: Railway (Empfohlen)
1. Erstelle Account auf [Railway.app](https://railway.app)
2. Erstelle neues Projekt
3. Füge PostgreSQL Service hinzu
4. Kopiere `DATABASE_URL` aus Railway Dashboard

#### Option B: Render
1. Erstelle Account auf [Render.com](https://render.com)
2. Erstelle neues PostgreSQL Database
3. Kopiere `DATABASE_URL` aus Render Dashboard

#### Option C: Supabase
1. Erstelle Account auf [Supabase.com](https://supabase.com)
2. Erstelle neues Projekt
3. Kopiere `DATABASE_URL` aus Supabase Dashboard

### 2. Environment Variables

Erstelle `.env.local` mit folgenden Variablen:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional: Bible API
BIBLE_API_URL="https://api.bible.com/v1/bibles"
```

**NEXTAUTH_SECRET generieren:**
```bash
openssl rand -base64 32
```

### 3. Database Migrations

```bash
# Prisma Client generieren
npm run db:generate

# Migrations ausführen
npm run db:migrate:deploy

# Seed Data (Content)
npm run seed:all
```

### 4. Vercel Deployment (Frontend)

#### Option A: Vercel CLI
1. Installiere Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Setze Environment Variables in Vercel Dashboard

#### Option B: Vercel Dashboard
1. Gehe zu [Vercel Dashboard](https://vercel.com)
2. Import GitHub Repository
3. Configure Project:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`
4. Setze Environment Variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
5. Deploy

### 5. Post-Deployment

Nach dem Deployment:

1. **Database Migrations ausführen** (falls noch nicht geschehen):
   ```bash
   npm run db:migrate:deploy
   ```

2. **Seed Data ausführen**:
   ```bash
   npm run seed:all
   ```

   Oder über Vercel CLI:
   ```bash
   vercel env pull
   npm run seed:all
   ```

### 6. Domain Setup (Optional)

1. Füge Domain in Vercel Dashboard hinzu
2. Setze DNS Records:
   - Type: `CNAME`
   - Name: `@` oder `www`
   - Value: `cname.vercel-dns.com`
3. SSL wird automatisch konfiguriert

## Monitoring & Analytics

### Vercel Analytics
- Automatisch aktiviert in Vercel Dashboard
- Performance Monitoring
- Web Vitals Tracking

### Error Tracking (Optional)
- **Sentry**: Integriere Sentry für Error Tracking
- Setze `SENTRY_DSN` in Environment Variables

## Updates

### Content Updates
```bash
# Neue Content hinzufügen
npm run seed:lessons      # Neue Lektionen
npm run seed:missions     # Neue Missionen
npm run seed:equipment     # Neue Equipment Items
```

### Code Updates
1. Push zu GitHub
2. Vercel deployt automatisch
3. Prisma Migrations bei Bedarf:
   ```bash
   npm run db:migrate:deploy
   ```

## Troubleshooting

### Database Connection Issues
- Prüfe `DATABASE_URL` Format
- Prüfe SSL Settings (für Production)
- Prüfe Firewall Settings

### Build Errors
- Prüfe Node.js Version (18+)
- Prüfe Dependencies
- Prüfe Environment Variables

### Migration Errors
- Prüfe Database Connection
- Prüfe Schema Compatibility
- Backup vor Migration

## Production Checklist

- [ ] Database Setup abgeschlossen
- [ ] Environment Variables gesetzt
- [ ] Migrations ausgeführt
- [ ] Seed Data ausgeführt
- [ ] Domain konfiguriert
- [ ] SSL aktiviert
- [ ] Error Tracking eingerichtet
- [ ] Analytics aktiviert
- [ ] Monitoring eingerichtet

## Support

Bei Problemen:
1. Prüfe Vercel Logs
2. Prüfe Database Logs
3. Prüfe Environment Variables
4. Prüfe Migration Status
