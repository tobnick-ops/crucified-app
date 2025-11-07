# Production Infrastructure Guide

**Datum**: 7. November 2025  
**Status**: Deployment-Plan dokumentiert

---

## 🚀 Production Stack

### 1. Frontend Hosting: **Vercel**
**Warum Vercel:**
- Native Next.js Support
- Auto-Deployment von GitHub
- CDN Global
- Zero-Config
- Analytics Built-in

**Setup:**
```bash
# 1. Vercel CLI installieren
npm i -g vercel

# 2. Login
vercel login

# 3. Link Project
vercel link

# 4. Deploy
vercel --prod
```

**Environment Variables:**
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://crucified-app.vercel.app
POSTHOG_KEY=...
```

### 2. Database: **Railway** oder **Supabase**

#### Option A: Railway (Empfohlen)
- PostgreSQL Managed
- Simple Pricing: $5/month starter
- Auto-Backups
- Easy Scaling

**Setup:**
```bash
# 1. Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Create Project
railway init

# 4. Provision Postgres
railway add postgresql

# 5. Get Connection String
railway variables
```

#### Option B: Supabase
- PostgreSQL + Realtime
- Auth Built-in (falls NextAuth ersetzen)
- Free Tier verfügbar
- Mehr Features, aber komplexer

### 3. Analytics: **Posthog**
**Setup:**
```bash
npm install posthog-js
```

**Configuration:**
```typescript
// lib/analytics/client.ts
import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: 'https://app.posthog.com',
});
```

### 4. Error Tracking: **Sentry**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 📊 Monitoring & Alerts

### Uptime Monitoring
- Vercel Analytics (Built-in)
- UptimeRobot (Free, External)

### Performance Monitoring
- Vercel Speed Insights
- Lighthouse CI (Automated)

### Error Monitoring
- Sentry
- Email Alerts für P0 Errors

---

## 🔐 Security

### SSL/TLS
- Vercel: Auto SSL ✅
- Force HTTPS

### Environment Variables
- Niemals in Git committen
- Vercel Environment Variables
- .env.local für Development

### API Security
- Rate Limiting
- CORS Configuration
- Input Validation

---

## 💾 Backup Strategy

### Database Backups
- Railway: Auto Daily Backups
- Manual Exports: Weekly
- Backup Retention: 30 Tage

### Code Backups
- Git Repository (GitHub)
- Multiple Branches
- Tag Releases

---

## 📈 Scaling Plan

### Initial (0-1K Users)
- Vercel Hobby/Pro
- Railway Starter
- Current Architecture OK

### Growth (1K-10K Users)
- Vercel Pro
- Railway Developer
- Database Read Replicas

### Scale (10K+ Users)
- Vercel Enterprise
- Railway Team
- Caching Layer (Redis)
- CDN für Assets

---

**Status**: Infrastructure-Plan dokumentiert ✅  
**Ready for**: Production Deployment  
**Est. Monthly Cost**: $20-50 (bis 1K Users)

