# User Testing Guide

**Dokumentiert**: Testing-Strategie für Alpha/Beta  
**Status**: Bereit für User Testing Phase

## Alpha Testing (10 User, 2 Wochen)
- Fokus: Core Funktionalität, kritische Bugs, neue Dashboard- und Quest-Flows
- Pflicht-Szenarien:
  1. Onboarding + Charakter-Erstellung
  2. Dashboard-Überblick (Streak, Level-Ring, Sammelbuch)
  3. Erste Lektion absolvieren (Achievement + Quest-Progress prüfen)
  4. Mission starten & abschließen (inkl. Loot + Fragmente)
  5. Equipment anlegen (Set-/Slot-Feedback)
- Feedback: Direkte Interviews, Bug Reports (inkl. Screenshots)
- Ziel: Stabilität vor Beta

## Beta Testing (100 User, 4 Wochen)
- Fokus: User Experience, Retention, Balance, Achievement/Quest-Motivation
- Feedback: Surveys (NPS), Analytics, Community Forum
- Ziel: Production-Ready

## Success Criteria
- No P0 Bugs
- 4.0+ User Satisfaction
- 30%+ Day-7 Retention
- 70%+ Onboarding Completion

## Feature Checkliste für Tester:innen

1. **Dashboard**
   - Streak-Anzeige aktualisiert korrekt
   - LevelProgressRing zeigt XP/Level richtig (kein NaN)
   - Sammelbuch-Prozent synchron mit Collection Page
2. **Achievements**
   - Filter funktionieren, Fortschritt updatet nach Aktionen
   - Unlock-Toast erscheint & Rewards werden gutgeschrieben
3. **Quests**
   - Daily/Weekly Quests aktualisieren nach Lessons/Missionen
   - Quest-Abschluss belohnt XP & Gold
4. **Lessons**
   - Mindestens 150 Lessons sichtbar, Level Requirements plausibel
   - Perfekte Lesson löst Achievement + Quest-Progress aus
5. **Missions**
   - Objectives tracken Fortschritt, Belohnungen (XP/Fragmente) werden gewährt
6. **Equipment & Collection**
   - Alle Slots (inkl. LEGS) verfügen über Items
   - Sammelbuch zählt Fragmente & Bonus korrekt

## Dokumentation & Tools

- Status-Tracking & Automations-Ergebnisse: `docs/QA_STATUS.md`
- Schritt-für-Schritt Tests: `docs/SYSTEMATIC_TEST_STRATEGY.md` (`test-runner-interactive.js`)
- Detaillierte Checkliste: `docs/TESTING_GAMEREADY_CHECKLIST.md`
- Testergebnisse & Bugs: `TEST_SESSION_REPORT.md`, `docs/GAMEREADY_TEST_REPORT.md`

