# Glauben-RPG App - Crucified

Eine gamifizierte RPG-App zur Förderung des Glaubenswachstums mit Charakterentwicklung, Missionen basierend auf Bibelgeschichten, Fähigkeitsbaum, Ausrüstungssystem und täglichen Lektionen.

## 🎯 Projekt-Status

**Aktuell: Phase 7 - Content-Erstellung & Deployment-Vorbereitung** ✅

### ✅ Abgeschlossen
- [x] Phase 1: Projekt-Setup & Grundlagen
- [x] Phase 2: Core Character System
- [x] Phase 3: Equipment System
- [x] Phase 4: Lesson & Mission System (inkl. Fragment System)
- [x] Phase 5: Daily System & Leaderboard
- [x] Phase 6: Polish & Optimization
- [x] Phase 7: Content-Erstellung

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ mit TypeScript, React
- **2D-Engine**: Phaser.js 3.x (isometrisch/top-down)
- **Backend**: Node.js + Express + PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS (Tempel-Ästhetik)
- **Animationen**: Framer Motion

## 📋 Design-Entscheidungen (gemäß Masterplan)

### Bibelversion
- **BasisBibel** (moderne Sprache, gut verständlich)

### Grafik-Style
- **2D isometrisch** (Phaser.js)
- **Tempel-Ästhetik**: Gold, Weiß, Blau

### Mission-Komplexität
- **Start**: 5 Minuten
- **Steigt mit Level/Fortschritt**
- **Maximum**: 45 Minuten

## 📁 Projekt-Struktur

```
crucified-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth Pages
│   ├── (game)/            # Game Pages
│   │   ├── character/     # Character View
│   │   ├── lessons/       # Lessons
│   │   ├── missions/      # Missions
│   │   └── collection/    # Collection Book
│   └── api/               # API Routes
├── components/
│   ├── ui/                # Base UI Components
│   ├── character/         # Character Components
│   ├── equipment/         # Equipment Components
│   └── game/              # Phaser.js Components
├── lib/
│   ├── api/               # API Clients
│   ├── game/              # Game Logic & Formulas
│   ├── hooks/             # Custom React Hooks
│   └── utils/             # Utilities
├── database/
│   └── seeds/             # Database Seed Scripts
├── prisma/
│   └── schema.prisma      # Database Schema
└── public/
    └── assets/            # Sprites, Maps, Icons
```

## 🚀 Setup

### Voraussetzungen
- Node.js 18+
- PostgreSQL
- npm oder yarn

### Installation

1. **Dependencies installieren**:
```bash
npm install
```

2. **Umgebungsvariablen konfigurieren**:
```bash
cp .env.example .env.local
# .env.local Datei mit deinen Werten füllen
```

3. **Database Setup**:
```bash
# Prisma Client generieren
npm run db:generate

# Database Migrations
npm run db:migrate

# Seed Data (Content)
npm run seed:all
```

4. **Development Server starten**:
```bash
npm run dev
```

## 📚 Database Seeding

### Alle Content auf einmal seeden:
```bash
npm run seed:all
```

### Einzelne Seed Scripts:
```bash
npm run seed:books        # Bible Books
npm run seed:rabbis       # Rabbis
npm run seed:skills       # Skill Trees
npm run seed:lessons      # Lessons
npm run seed:missions     # Missions
npm run seed:fragments    # Fragments
npm run seed:equipment    # Equipment Items
npm run seed:sets         # Equipment Sets
```

## 🎮 Game-Mechaniken

### Charakter-Entwicklung
- Level-System mit XP
- Stats: Faith, Wisdom, Knowledge, Service, Leadership
- Total Strength = Stats + Equipment + Set Bonuses + Collection Bonus

### Equipment System
- Diablo-inspiriert: Common → Rare → Epic → Legendary → Artifact
- Socket-System für Steine
- Set-Boni (2-Piece, 4-Piece, 6-Piece)

### Missionen
- Phaser.js-basiertes 2D-Gameplay
- Bibelgeschichten als Basis
- Komplexität steigt mit Level (5-45 Min)

### Lektionen
- Tägliches Limit: 5 Lektionen/Tag
- Verschiedene Fragetypen: Multiple Choice, True/False, Fill-in-the-blank
- XP-Belohnung basierend auf Score

### Fragmente (Sammelbuch)
- Charaktere, Orte, Konzepte
- Collection Bonus: +5% bis +50% Total Strength
- Freischaltung durch Missionen und Lektionen

### Daily System
- Tägliche Limits (5 Lektionen/Tag)
- Login-Streak (7-Tage-Bonus)
- Nachtwache (zusätzliche Währung)

### Leaderboard
- Multiple Kategorien: Total Strength, Level, Collection, Faith, Completion
- Top 100 Rankings
- Auto-Update bei Progress

## 📖 Dokumentation

### Hauptdokumentation
- [**Projekt-Status**](./PROJECT_STATUS.md) - Vollständige Übersicht über alle Phasen und Features
- [**Testing Master**](./TESTING_MASTER.md) - Alle Testing-Erkenntnisse, Lessons Learned und Best Practices

### Guides
- [**Database Setup Guide**](./docs/guides/DATABASE_SETUP_GUIDE.md) - Detaillierte Database Setup Anleitung
- [**Deployment Guide**](./docs/guides/DEPLOYMENT.md) - Deployment-Anleitung
- [**Testing Quick Start**](./docs/guides/README_TESTING.md) - Schnellstart für Testing

### Entwicklungsdokumentation
- [**Implementation Summary**](./docs/history/IMPLEMENTATION_SUMMARY.md) - Auth & Testing Setup
- [**Code Quality Dokumentation**](./docs/history/) - Code Quality Prozess und Fortschritt
- [**Auth Implementation**](./docs/history/AUTH_IMPLEMENTATION_COMPLETE.md) - Auth-Implementierungsdetails

## 🧪 Testing

Für vollständige Testing-Erkenntnisse und Anleitungen siehe:

- **Testing Master**: [`TESTING_MASTER.md`](./TESTING_MASTER.md) - Alle Testing-Erkenntnisse, Lessons Learned und Best Practices (Zentrales Dokument)
- **Quick Start**: [`docs/guides/README_TESTING.md`](./docs/guides/README_TESTING.md) - Schnellstart für Testing
- **Database Setup**: [`docs/guides/DATABASE_SETUP_GUIDE.md`](./docs/guides/DATABASE_SETUP_GUIDE.md) - Detaillierte Database Setup Anleitung

### Aktueller Testing-Status

- **Frontend**: ✅ 100% getestet (7/7 Features)
- **Backend**: ⚠️ Erfordert Database Setup (0/11 Features)
- **Gesamt**: ⚠️ 39% (7/18 Features)

### Quick Start

```bash
# 1. Database Setup (siehe docs/guides/DATABASE_SETUP_GUIDE.md)
# 2. Environment Variables setzen
# 3. Prisma Setup
npm run db:generate
npm run db:migrate
npm run seed:all
# 4. Test-Account erstellen
npm run test:create-account
# 5. Testing
npm run dev
```

### Development Testing
- Teste die App lokal: `npm run dev`
- Teste Missionen: `/missions`
- Teste Lektionen: `/lessons`
- Teste Equipment: `/character/equipment`

### Beta Testing
- Registriere dich und erstelle einen Charakter
- Teste alle Features durch
- Feedback sammeln

Für weitere Details siehe [`TESTING_MASTER.md`](./TESTING_MASTER.md).

## 🚀 Deployment

Siehe [docs/guides/DEPLOYMENT.md](./docs/guides/DEPLOYMENT.md) für detaillierte Anleitung.

### Quick Deploy:
1. Database Setup (Railway/Render)
2. Environment Variables setzen
3. Vercel Deployment (Frontend)
4. Seed Data ausführen

## 📝 Lizenz

Private - Alle Rechte vorbehalten

## 🙏 Credits

- BasisBibel für Bibeltexte
- Phaser.js für Game Engine
- Next.js für Framework
- Prisma für ORM
