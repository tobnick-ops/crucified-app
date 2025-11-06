#!/bin/bash

# Database Setup Script für Crucified App
# Setzt die PostgreSQL Database auf (Docker oder lokal)

echo "🚀 Crucified App - Database Setup"
echo "================================"
echo ""

# Prüfe ob .env.local existiert
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local nicht gefunden!"
    echo "📝 Erstelle .env.local aus .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ .env.local erstellt"
    else
        echo "❌ .env.example nicht gefunden!"
        exit 1
    fi
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

echo "✅ .env.local gefunden und DATABASE_URL gesetzt"
echo ""

# Prüfe welche Option verfügbar ist
echo "📋 Prüfe verfügbare Optionen..."
echo ""

# Option A: Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker gefunden - Option A verfügbar"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker nicht gefunden - Option A nicht verfügbar"
    DOCKER_AVAILABLE=false
fi

# Option B: Lokale PostgreSQL
if command -v psql &> /dev/null; then
    echo "✅ psql gefunden - Option B verfügbar"
    PSQL_AVAILABLE=true
else
    echo "⚠️  psql nicht gefunden - Option B nicht verfügbar"
    PSQL_AVAILABLE=false
fi

# Option C: Homebrew
if command -v brew &> /dev/null; then
    echo "✅ Homebrew gefunden - Option C verfügbar"
    BREW_AVAILABLE=true
else
    echo "⚠️  Homebrew nicht gefunden - Option C nicht verfügbar"
    BREW_AVAILABLE=false
fi

echo ""

# Prüfe ob PostgreSQL bereits läuft
if pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "✅ PostgreSQL läuft bereits auf localhost:5432!"
    echo ""
    echo "🎯 Kann direkt mit Migrations fortfahren!"
    echo ""
    read -p "Möchtest du direkt mit Migrations fortfahren? (j/n) " proceed
    if [ "$proceed" = "j" ] || [ "$proceed" = "J" ] || [ "$proceed" = "y" ] || [ "$proceed" = "Y" ]; then
        echo ""
        echo "📋 Führe Migrations aus..."
        npm run db:migrate
        echo ""
        echo "📋 Führe Seed Data ein..."
        npm run seed:all
        echo ""
        echo "📋 Erstelle Test-Account..."
        npm run test:create-account
        echo ""
        echo "✅ Database Setup abgeschlossen!"
        exit 0
    fi
fi

# Wenn Docker verfügbar, versuche Container zu starten
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "🐳 Option A: Docker PostgreSQL"
    echo ""
    
    # Prüfe ob Container bereits existiert
    if docker ps -a | grep -q crucified-postgres; then
        echo "📋 crucified-postgres Container gefunden"
        echo ""
        read -p "Möchtest du den Container starten? (j/n) " start_container
        if [ "$start_container" = "j" ] || [ "$start_container" = "J" ] || [ "$start_container" = "y" ] || [ "$start_container" = "Y" ]; then
            echo ""
            echo "🚀 Starte Container..."
            docker start crucified-postgres
            echo ""
            echo "⏳ Warte 3 Sekunden auf Container-Start..."
            sleep 3
            echo ""
            if pg_isready -h localhost -p 5432 &> /dev/null; then
                echo "✅ Container läuft!"
            else
                echo "⚠️  Container läuft noch nicht - bitte warte noch..."
                sleep 5
            fi
        fi
    else
        echo "📋 crucified-postgres Container nicht gefunden"
        echo ""
        read -p "Möchtest du einen neuen Container erstellen? (j/n) " create_container
        if [ "$create_container" = "j" ] || [ "$create_container" = "J" ] || [ "$create_container" = "y" ] || [ "$create_container" = "Y" ]; then
            echo ""
            echo "🚀 Erstelle Container..."
            docker run --name crucified-postgres \
              -e POSTGRES_PASSWORD=postgres \
              -e POSTGRES_DB=crucified \
              -p 5432:5432 \
              -d postgres:15
            echo ""
            echo "⏳ Warte 5 Sekunden auf Container-Start..."
            sleep 5
            echo ""
            if pg_isready -h localhost -p 5432 &> /dev/null; then
                echo "✅ Container läuft!"
            else
                echo "⚠️  Container läuft noch nicht - bitte warte noch..."
                sleep 5
            fi
        fi
    fi
fi

# Wenn PostgreSQL läuft, führe Migrations aus
if pg_isready -h localhost -p 5432 &> /dev/null; then
    echo ""
    echo "✅ PostgreSQL läuft!"
    echo ""
    echo "📋 Führe Migrations aus..."
    npm run db:migrate
    echo ""
    echo "📋 Führe Seed Data ein..."
    npm run seed:all
    echo ""
    echo "📋 Erstelle Test-Account..."
    npm run test:create-account
    echo ""
    echo "✅ Database Setup abgeschlossen!"
    echo ""
    echo "📋 Test-Account Details:"
    echo "   Email: test@crucified.app"
    echo "   Password: Test123456"
    echo ""
    echo "🎯 Nächste Schritte:"
    echo "   1. Starte Dev-Server: npm run dev"
    echo "   2. Gehe zu http://localhost:3000/signin"
    echo "   3. Logge dich mit test@crucified.app / Test123456 ein"
    echo "   4. Erstelle einen Character"
    echo "   5. Teste alle Features!"
else
    echo ""
    echo "⚠️  PostgreSQL läuft noch nicht!"
    echo ""
    echo "📋 Optionen:"
    echo ""
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "Option A: Docker PostgreSQL (Empfohlen)"
        echo "  1. Docker Desktop installieren: https://docs.docker.com/desktop/install/mac-install/"
        echo "  2. Container starten:"
        echo "     docker run --name crucified-postgres \\"
        echo "       -e POSTGRES_PASSWORD=postgres \\"
        echo "       -e POSTGRES_DB=crucified \\"
        echo "       -p 5432:5432 \\"
        echo "       -d postgres:15"
        echo ""
    fi
    
    if [ "$BREW_AVAILABLE" = true ]; then
        echo "Option B: Lokale PostgreSQL (Homebrew)"
        echo "  1. PostgreSQL installieren: brew install postgresql@15"
        echo "  2. PostgreSQL starten: brew services start postgresql@15"
        echo "  3. Database erstellen: createdb crucified"
        echo ""
    fi
    
    echo "Nach Database Start:"
    echo "  1. Führe dieses Script erneut aus: ./scripts/setup-database.sh"
    echo "  2. Oder manuell: npm run db:migrate && npm run seed:all && npm run test:create-account"
    echo ""
fi



