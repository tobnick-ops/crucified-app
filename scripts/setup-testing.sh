#!/bin/bash

# Testing Setup Script
# Dieses Script richtet die vollständige Testing-Umgebung ein

echo "🚀 Crucified App - Testing Setup"
echo "================================"
echo ""

# Prüfe ob .env.local existiert
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local nicht gefunden!"
    echo "📝 Erstelle .env.local aus .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local erstellt"
    echo ""
    echo "⚠️  WICHTIG: Bearbeite .env.local und setze DATABASE_URL!"
    echo "   Beispiel: DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/crucified?schema=public\""
    echo ""
    read -p "Drücke Enter, wenn DATABASE_URL gesetzt ist..."
    echo ""
fi

# Prüfe ob DATABASE_URL gesetzt ist
if ! grep -q "DATABASE_URL=" .env.local || grep -q "DATABASE_URL=\"\"" .env.local; then
    echo "❌ DATABASE_URL ist nicht gesetzt in .env.local!"
    echo "   Bitte setze DATABASE_URL in .env.local"
    exit 1
fi

# Prüfe ob NEXTAUTH_SECRET gesetzt ist
if ! grep -q "NEXTAUTH_SECRET=" .env.local || grep -q "NEXTAUTH_SECRET=\"your-secret-key-here\"" .env.local; then
    echo "⚠️  NEXTAUTH_SECRET nicht gesetzt!"
    echo "📝 Generiere NEXTAUTH_SECRET..."
    SECRET=$(openssl rand -base64 32)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|g" .env.local
    else
        # Linux
        sed -i "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=\"$SECRET\"|g" .env.local
    fi
    echo "✅ NEXTAUTH_SECRET generiert"
fi

echo "📦 Installiere Dependencies..."
npm install

echo ""
echo "🔧 Generiere Prisma Client..."
npm run db:generate

echo ""
echo "🗄️  Führe Database Migrations aus..."
npm run db:migrate

echo ""
echo "🌱 Seede Database mit Content..."
npm run seed:all

echo ""
echo "👤 Erstelle Test-Account..."
npm run test:create-account

echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "📋 Test-Account Details:"
echo "   Email: test@crucified.app"
echo "   Password: Test123456"
echo ""
echo "🎯 Nächste Schritte:"
echo "   1. Starte den Dev-Server: npm run dev"
echo "   2. Gehe zu http://localhost:3000/signin"
echo "   3. Logge dich mit test@crucified.app / Test123456 ein"
echo "   4. Erstelle einen Character"
echo "   5. Teste alle Features!"
echo ""

