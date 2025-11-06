#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🚀 Starte Datenbank-Setup für die Crucified App"

if [[ -f ".env.local" ]]; then
  echo "🔐 Lade Variablen aus .env.local"
  # shellcheck disable=SC1091
  set -a
  source .env.local
  set +a
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "❌ DATABASE_URL ist nicht gesetzt."
  echo "   Lege eine .env.local an (siehe .env.example) und starte das Skript erneut."
  exit 1
fi

function ensure_docker_database() {
  if ! command -v docker >/dev/null 2>&1; then
    return 0
  fi

  if docker ps --format '{{.Names}}' | grep -q '^crucified-postgres$'; then
    echo "🐳 PostgreSQL-Container 'crucified-postgres' läuft bereits."
    return 0
  fi

  if docker ps -a --format '{{.Names}}' | grep -q '^crucified-postgres$'; then
    echo "🐳 Starte vorhandenen Container 'crucified-postgres'..."
    docker start crucified-postgres >/dev/null
    return 0
  fi

  read -rp "🐳 Kein PostgreSQL-Container gefunden. Soll ein Standard-Container gestartet werden? [y/N] " start_container
  if [[ "$start_container" =~ ^[Yy]$ ]]; then
    docker run --name crucified-postgres \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=crucified \
      -p 5432:5432 \
      -d postgres:15
    echo "🐳 PostgreSQL-Container 'crucified-postgres' gestartet."
  else
    echo "⚠️  Überspringe automatisches Docker-Setup. Stelle sicher, dass eine Datenbank erreichbar ist."
  fi
}

ensure_docker_database

echo "📦 Installiere Abhängigkeiten (npm install)"
npm install

echo "🛠️  Prisma Client generieren"
npm run db:generate

echo "📜 Migrationen anwenden"
npm run db:migrate

echo "🌱 Seed-Daten einfügen"
npm run db:seed

echo "👤 Test-Account anlegen"
npm run test:create-account

echo "✅ Datenbank-Setup abgeschlossen"
