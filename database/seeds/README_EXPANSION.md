# Content Expansion Seeds - Usage Guide

## Overview

Massive Content Expansion gemäß GAMEREADY Plan:
- **136 neue Lessons** (aktuell 36 erstellt)
- **12 neue Missions**
- **39 neue Equipment Items**
- **49 neue Fragmente**

## Lesson Expansion Files

### Part 1: Evangelien & 1. Korinther
**File**: `lessons-expansion.ts`  
**Content**: 11 Lektionen
- Matthäus: 2 neue (Geburt, Taufe)
- Markus: 4 neue (Anfang, Heilungen, Weg, Passion)
- Lukas: 3 neue (Samariter, Verlorener Sohn, Emmaus)
- Johannes: 2 neue (Wort wurde Fleisch, Hohepriesterliches Gebet)

**Run**: 
```bash
npx ts-node database/seeds/lessons-expansion.ts
```

### Part 2: Paulus-Briefe
**File**: `lessons-expansion-part2.ts`  
**Content**: 25 Lektionen
- 2. Korinther: 3 (Trost, Versöhnung, Schwachheit)
- Galater: 2 (Glaube, Geist)
- Epheser: 4 (Erwählung, Gnade, Rüstung, Einheit)
- Philipper: 3 (Freude, Demut, Ziel)
- Kolosser: 3 (Christus, Gestorben, Neues Leben)

**Run**: 
```bash
npx ts-node database/seeds/lessons-expansion-part2.ts
```

### Part 3-10: Noch zu erstellen

**Part 3**: 1./2. Thessalonicher, Pastoral-Briefe (10 Lektionen)
**Part 4**: Hebräer, Jakobus, Petrus, Johannes, Judas (15 Lektionen)
**Part 5**: Apostelgeschichte, Offenbarung (10 Lektionen)
**Part 6**: 1.-5. Mose (Tora) (15 Lektionen)
**Part 7**: Josua, Richter, Samuel, Könige (15 Lektionen)
**Part 8**: Esra, Nehemia, Esther (5 Lektionen)
**Part 9**: Hiob, Psalmen, Sprüche, Prediger, Hoheslied (15 Lektionen)
**Part 10**: Jesaja, Jeremia, Hesekiel, Daniel, Kleine Propheten (30 Lektionen)

## Mission Expansion

**File**: `missions-expansion.ts` (to be created)  
**Content**: 12 neue Missions
- Story-Arc Exodus: 3 Missionen
- Story-Arc Jesus Leben: 3 Missionen
- Story-Arc Apostelgeschichte: 2 Missionen
- Boss-Battles: 3 Missionen
- Endzeit: 1 Mission

## Equipment Expansion

**File**: `equipment-expansion.ts` (to be created)  
**Content**: 39 neue Items
- **KRITISCH**: LEGS Slot (8 Items) - komplett leer!
- Set-Komplettierungen: 5 Sets
- Rarity Distribution: Common (17), Uncommon (11), Rare (9), Epic (3)

## Fragment Expansion

**File**: `fragments-expansion.ts` (to be created)  
**Content**: 49 neue Fragmente
- Charaktere: 15 (Abraham, Salomo, Johannes, etc.)
- Orte: 12 (Jerusalem, Bethlehem, Golgatha, etc.)
- Konzepte: 12 (Erlösung, Rechtfertigung, etc.)
- Ereignisse: 10 (Schöpfung, Exodus, Pfingsten, etc.)

## Run All Seeds

```bash
# In order
npm run seed:all
npx ts-node database/seeds/lessons-expansion.ts
npx ts-node database/seeds/lessons-expansion-part2.ts
# ... weitere parts nach Erstellung
npx ts-node database/seeds/missions-expansion.ts
npx ts-node database/seeds/equipment-expansion.ts
npx ts-node database/seeds/fragments-expansion.ts
```

## Progress Tracking

**Created**: 36/136 Lessons (26%)  
**Status**: Lesson Expansion in progress

**Next**: Equipment LEGS Slot (KRITISCH)

