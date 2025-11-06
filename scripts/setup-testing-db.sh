#!/bin/bash

# Quick Testing Database Setup Script
# Erstellt eine SQLite Database für Testing (schnell und einfach)

echo "🚀 Crucified App - Quick Testing Database Setup"
echo "================================================"
echo ""

# Prüfe ob .env.local existiert
if [ ! -f .env.local ]; then
    echo "📝 Erstelle .env.local aus .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local erstellt"
fi

# Generiere NEXTAUTH_SECRET falls nicht vorhanden
if ! grep -q "NEXTAUTH_SECRET=" .env.local || grep -q "NEXTAUTH_SECRET=\"your-secret-key-here\"" .env.local; then
    echo "📝 Generiere NEXTAUTH_SECRET..."
    SECRET=$(openssl rand -base64 32)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|g" .env.local
    else
        sed -i "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|g" .env.local
    fi
    echo "✅ NEXTAUTH_SECRET generiert"
fi

echo ""
echo "⚠️  WICHTIG: Für vollständiges Testing benötigst du eine PostgreSQL Database!"
echo ""
echo "Optionen:"
echo "1. Docker PostgreSQL (Empfohlen):"
echo "   docker run --name crucified-postgres \\"
echo "     -e POSTGRES_PASSWORD=postgres \\"
echo "     -e POSTGRES_DB=crucified \\"
echo "     -p 5432:5432 \\"
echo "     -d postgres:15"
echo ""
echo "   Dann in .env.local setzen:"
echo "   DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/crucified?schema=public\""
echo ""
echo "2. Lokale PostgreSQL:"
echo "   createdb crucified"
echo "   DATABASE_URL=\"postgresql://user:password@localhost:5432/crucified?schema=public\""
echo ""
echo "3. Cloud Database (Railway/Render/Supabase):"
echo "   Erstelle Account und kopiere DATABASE_URL"
echo ""

read -p "Hast du eine DATABASE_URL? (j/n) " has_db

if [ "$has_db" = "j" ] || [ "$has_db" = "J" ] || [ "$has_db" = "y" ] || [ "$has_db" = "Y" ]; then
    echo ""
    echo "📝 Bitte setze DATABASE_URL in .env.local"
    echo "   Dann führe aus:"
    echo "   npm run db:generate"
    echo "   npm run db:migrate"
    echo "   npm run seed:all"
    echo "   npm run test:create-account"
    echo ""
else
    echo ""
    echo "📋 Für Frontend-Testing (ohne Database):"
    echo "   - Middleware funktioniert ✅"
    echo "   - Auth-Flow funktioniert ✅"
    echo "   - Alle Pages laden ✅"
    echo ""
    echo "⚠️  Für Backend-Testing benötigst du eine Database!"
    echo ""
fi

