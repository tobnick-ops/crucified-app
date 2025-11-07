# GAMEREADY Testing Checklist - Comprehensive Validation

**Datum**: 7. November 2025  
**Status**: Bereit für systematisches Browser-Testing  
**Ziel**: Alle 280+ neuen Features validieren

---

## 🎯 Testing-Übersicht

### Was zu testen ist:
- ✅ 137 neue Lessons (9 neue Seeds)
- ✅ 12 neue Missions
- ✅ 43 neue Equipment Items
- ✅ 49 neue Fragments
- ✅ 65 neue Achievements
- ✅ 18 neue Quests
- ✅ 8 neue Pages
- ✅ 20+ neue Components
- ✅ 6 neue API Routes

**TOTAL: 353+ neue Features zu testen!**

---

## 📋 PRE-TESTING SETUP

### 1. Database Vorbereitung
```bash
# Alle neuen Seeds ausführen
npm run db:generate
npm run db:migrate
npm run seed:all

# Neue Seeds ausführen
npx ts-node database/seeds/lessons-expansion.ts
npx ts-node database/seeds/lessons-expansion-part2.ts
npx ts-node database/seeds/lessons-expansion-part3.ts
npx ts-node database/seeds/lessons-expansion-part4.ts
npx ts-node database/seeds/lessons-expansion-part5.ts
npx ts-node database/seeds/lessons-expansion-part6.ts
npx ts-node database/seeds/lessons-expansion-part7.ts
npx ts-node database/seeds/lessons-expansion-part8.ts
npx ts-node database/seeds/lessons-expansion-part9.ts
npx ts-node database/seeds/missions-expansion.ts
npx ts-node database/seeds/equipment-expansion.ts
npx ts-node database/seeds/fragments-expansion.ts
npx ts-node database/seeds/achievements-seed.ts
npx ts-node database/seeds/quests-seed.ts
```

### 2. Development Server starten
```bash
npm run dev
```

### 3. Test-Account
- Email: `test@crucified.app`
- Password: `Test123456`

---

## 🧪 SYSTEMATISCHE TEST-CHECKLISTE

### PHASE 1: Neue Pages & Navigation (8 Tests)

#### 1.1 Onboarding Page
- [ ] Route: `/onboarding`
- [ ] Welcome Screen angezeigt
- [ ] "Los geht's" Button funktioniert
- [ ] Value Proposition Screen
- [ ] Tutorial Steps (3 Steps)
- [ ] Character Create Redirect
- [ ] Skip Button funktioniert
- [ ] Progress Indicator unten
- [ ] Animationen smooth

#### 1.2 Dashboard Page
- [ ] Route: `/dashboard`
- [ ] Hero Section mit Streak angezeigt
- [ ] Level Progress Bar funktioniert
- [ ] Daily Goal Ring zeigt korrekte Daten
- [ ] Stats Overview korrekt
- [ ] Collection Progress richtig
- [ ] Quick Action Buttons funktionieren
- [ ] Leaderboard Snippet angezeigt
- [ ] Mobile responsive

#### 1.3 Achievements Page
- [ ] Route: `/achievements`
- [ ] Alle 65 Achievements laden
- [ ] Filter-Buttons funktionieren (ALL, LEARNING, EXPLORATION, etc.)
- [ ] Locked Achievements zeigen Fortschritt
- [ ] Unlocked Achievements markiert
- [ ] Secret Achievements versteckt
- [ ] Completion % korrekt
- [ ] Hover-Effekte smooth
- [ ] Responsive Grid

#### 1.4 Quests Page
- [ ] Route: `/quests`
- [ ] Daily Quests angezeigt (3)
- [ ] Weekly Quests angezeigt (3)
- [ ] Progress Bars funktionieren
- [ ] Completed Quests markiert
- [ ] Reset-Info angezeigt
- [ ] Rewards sichtbar
- [ ] Completion-Effekt bei 100%

#### 1.5 Settings Page
- [ ] Route: `/settings`
- [ ] Daily Goal änderbar
- [ ] Difficulty-Select funktioniert
- [ ] Theme Toggle
- [ ] Font Size Options
- [ ] Reduced Motion Toggle
- [ ] Sound Toggle
- [ ] Privacy Toggles
- [ ] Save Button funktioniert
- [ ] Saved-State angezeigt

#### 1.6 Friends Page
- [ ] Route: `/social/friends`
- [ ] Friends List angezeigt
- [ ] Pending Requests Section
- [ ] Accept/Decline Buttons
- [ ] Empty State wenn keine Freunde
- [ ] Profile Links funktionieren

#### 1.7 Profile Page
- [ ] Route: `/profile/[userId]`
- [ ] Character Info angezeigt
- [ ] Stats Radar Chart
- [ ] Streak Display
- [ ] Achievements Count
- [ ] Fragments Count
- [ ] Add Friend Button (andere Profile)
- [ ] Private Profile Handling

#### 1.8 Navigation Update
- [ ] Dashboard Link hinzugefügt?
- [ ] Quests Link hinzugefügt?
- [ ] Achievements Link hinzugefügt?
- [ ] Settings Link hinzugefügt?
- [ ] Mobile Navigation funktioniert

---

### PHASE 2: Neue Components (15 Tests)

#### 2.1 LevelProgressRing
- [ ] Component rendert
- [ ] Circular Progress korrekt
- [ ] Level Number in Center
- [ ] XP Label darunter
- [ ] Gradient funktioniert
- [ ] Size Props (sm, md, lg)
- [ ] Animation smooth

#### 2.2 StreakDisplay
- [ ] Flammen-Emoji angezeigt
- [ ] Streak Number korrekt
- [ ] Color ändert sich mit Streak (7/30/100/365)
- [ ] Animation (Pulse)
- [ ] Milestone-Indikator
- [ ] Size Props funktionieren

#### 2.3 StatsRadarChart
- [ ] SVG rendert
- [ ] 5 Stats als Pentagon
- [ ] Labels korrekt
- [ ] Werte korrekt dargestellt
- [ ] Grid-Circles im Hintergrund
- [ ] Colors schön
- [ ] Responsive

#### 2.4 AchievementWall
- [ ] Grid von Fragmenten
- [ ] Unlocked Fragments farbig
- [ ] Locked Fragments grau + 🔒
- [ ] Completion % oben
- [ ] Collection Bonus angezeigt
- [ ] Tooltip on Hover
- [ ] Legend unten
- [ ] Types unterscheidbar (Character/Location/Concept)

#### 2.5 DailyGoalRing
- [ ] Circular Progress für Daily Goal
- [ ] Lessons Count in Center
- [ ] Progress animiert
- [ ] Completion Checkmark bei 100%
- [ ] Color Change bei Completion (grün)
- [ ] Scale Animation bei Complete

#### 2.6 LootDropAnimation
- [ ] Modal öffnet
- [ ] Chest Animation
- [ ] Click zum Öffnen
- [ ] Flip Animation
- [ ] Rarity-basierte Colors
- [ ] Particles fliegen
- [ ] Item Info angezeigt
- [ ] Close Button

#### 2.7 Enhanced LevelUpNotification
- [ ] Fullscreen Modal
- [ ] Confetti Effekt (50 Partikel)
- [ ] Glowing Background
- [ ] Star Animation
- [ ] Level Number groß
- [ ] Stats Gained animiert
- [ ] Close Button
- [ ] Sound (später)

#### 2.8 StreakMilestoneModal
- [ ] Triggered bei Milestones (7/30/100/365)
- [ ] Fireworks Effekt
- [ ] Rarity-Color je nach Streak
- [ ] Reward Info
- [ ] Motivations-Text
- [ ] Close animiert

#### 2.9 StreakRecoveryModal
- [ ] Öffnet bei verlorenem Streak
- [ ] Freezes Available angezeigt
- [ ] Use Button funktioniert
- [ ] Warning bei No Freezes
- [ ] Monthly Refresh Info
- [ ] Confirm/Cancel

#### 2.10 AchievementCard
- [ ] Icon groß
- [ ] Name + Description
- [ ] Category Color
- [ ] Progress Bar (unlocked)
- [ ] XP Reward
- [ ] Secret Achievements versteckt
- [ ] Hover Effect
- [ ] Unlocked State markiert

#### 2.11 AchievementNotification
- [ ] Toast erscheint rechts oben
- [ ] Slide-in Animation
- [ ] Icon + Name + XP
- [ ] Auto-Close nach 4s
- [ ] Manual Close Button
- [ ] Multiple gleichzeitig stapeln?

#### 2.12 Enhanced Button
- [ ] Hover Scale (1.05)
- [ ] Click Scale (0.95)
- [ ] Loading State (Spinner)
- [ ] Icon Support
- [ ] Variants (primary, secondary, danger, ghost)
- [ ] Disabled State
- [ ] Smooth Transitions

#### 2.13 Enhanced Card
- [ ] Hover Effect (wenn hover=true)
- [ ] Scale + Y-Offset
- [ ] Shadow Change
- [ ] Border Color Change (Gold)
- [ ] Smooth Transitions

#### 2.14 SkipLinks
- [ ] Unsichtbar standardmäßig
- [ ] Sichtbar bei Focus (Tab)
- [ ] "Zum Hauptinhalt" Link
- [ ] "Zur Navigation" Link
- [ ] Funktioniert mit Keyboard

#### 2.15 Accessibility Styles
- [ ] Focus Outlines sichtbar (Gold)
- [ ] Reduced Motion funktioniert
- [ ] High Contrast Support
- [ ] Touch Targets 44x44px minimum

---

### PHASE 3: Neue Content Validation (200+ Tests)

#### 3.1 Lessons Expansion (137 neue Lessons)

**Evangelien (11 neue):**
- [ ] Mt: Geburt, Taufe (2 neue)
- [ ] Mk: Anfang, Heilungen, Weg, Passion (4 neue)
- [ ] Lk: Samariter, Verlorener Sohn, Emmaus (3 neue)
- [ ] Joh: Wort wurde Fleisch, Hohepriesterliches Gebet (2 neue)

**Paulus-Briefe (25 neue):**
- [ ] 2.Kor: 3 Lektionen
- [ ] Gal: 2 zusätzliche
- [ ] Eph: 4 Lektionen
- [ ] Phil: 3 Lektionen
- [ ] Kol: 3 Lektionen
- [ ] 1./2.Thess: 3 Lektionen
- [ ] 1./2.Tim, Tit, Phlm: 7 Lektionen

**Katholische Briefe (15 neue):**
- [ ] Hebr: 5 Lektionen
- [ ] Jak: 3 Lektionen
- [ ] 1./2.Pet: 4 Lektionen
- [ ] 1.Joh: 3 Lektionen

**Apostelgeschichte & Offenbarung (10 neue):**
- [ ] Apg: 6 Lektionen
- [ ] Offb: 4 Lektionen

**AT - Tora (16 neue):**
- [ ] 1.Mo: 5 Lektionen
- [ ] 3.Mo: 3 Lektionen
- [ ] 4.Mo: 3 Lektionen
- [ ] 5.Mo: 3 Lektionen
- [ ] Judas: 1 Lektion

**AT - Geschichtsbücher (18 neue):**
- [ ] Jos: 3 Lektionen
- [ ] Ri: 4 Lektionen (inkl. Rut)
- [ ] 1.Sam: 4 Lektionen
- [ ] 2.Sam: 3 Lektionen
- [ ] Könige: 5 Lektionen
- [ ] Esra, Neh: 2 Lektionen
- [ ] Est: 2 Lektionen

**AT - Weisheit (15 neue):**
- [ ] Hiob: 4 Lektionen
- [ ] Ps: 6 Lektionen
- [ ] Spr: 4 Lektionen
- [ ] Pred: 2 Lektionen
- [ ] Hl: 1 Lektion

**AT - Propheten (17 neue):**
- [ ] Jes: 5 Lektionen
- [ ] Jer: 4 Lektionen
- [ ] Hes: 4 Lektionen
- [ ] Dan: 4 Lektionen

**Stichproben-Tests (mindestens 10 Lektionen):**
1. [ ] Öffne `/lessons`
2. [ ] Verifiziere mindestens 150 Lessons sichtbar
3. [ ] Teste 1 Easy Lesson (vollständig)
4. [ ] Teste 1 Medium Lesson
5. [ ] Teste 1 Hard Lesson
6. [ ] Check XP Reward funktioniert
7. [ ] Check Daily Limit (5 Lessons)
8. [ ] Check Level-Requirements
9. [ ] Check verschiedene Fragetypen
10. [ ] Check Completion Screen

#### 3.2 Missions Expansion (12 neue)

**Neue Missionen zu testen:**
- [ ] Die Zehn Plagen (Boss-Battle)
- [ ] Durchzug Rotes Meer (Escape)
- [ ] Stiftshütte bauen (Puzzle)
- [ ] Hochzeit zu Kana (Story)
- [ ] Speisung 5000 (Resource)
- [ ] Sturm auf See (Survival)
- [ ] Pfingsten (Story)
- [ ] Paulus in Philippi (Story)
- [ ] Simson vs. Philister (Boss)
- [ ] Daniel Löwengrube (Survival)
- [ ] Elia vs. Baalspropheten (Boss)
- [ ] Vision von Patmos (Exploration)

**Test pro Mission:**
- [ ] Mission in Liste sichtbar
- [ ] Level-Requirement Check
- [ ] Start Mission
- [ ] Phaser Game lädt
- [ ] Objectives angezeigt
- [ ] Gameplay funktioniert
- [ ] Objectives completable
- [ ] Mission Completion
- [ ] XP + Fragment Reward

#### 3.3 Equipment Expansion (43 neue)

**KRITISCH: LEGS Slot (8 neue Items):**
- [ ] Einfache Leinenhose
- [ ] Tunika-Hose
- [ ] Wanderer-Hose
- [ ] Priesterrock
- [ ] Kampfhose des Kriegers
- [ ] Königshose Davids
- [ ] Beinharnisch der Gerechtigkeit
- [ ] Hosen des Ewigen Bundes

**Stichproben:**
- [ ] Öffne `/character/equipment`
- [ ] Verifiziere LEGS Slot hat Items
- [ ] Teste 5 verschiedene Rarities
- [ ] Equip/Unequip funktioniert
- [ ] Stats Update nach Equip
- [ ] Set-Bonus funktioniert (Rüstung Gottes)
- [ ] Tooltip mit Item-Info

#### 3.4 Fragments Expansion (49 neue)

**Kategorien:**
- [ ] 15 neue Charaktere (Abraham, Salomo, etc.)
- [ ] 12 neue Orte (Jerusalem, Bethlehem, etc.)
- [ ] 12 neue Konzepte (Erlösung, etc.)
- [ ] 10 neue Ereignisse (Schöpfung, Exodus, etc.)

**Test:**
- [ ] Öffne `/collection`
- [ ] Verifiziere 60 Total Fragments
- [ ] Collection % korrekt
- [ ] Collection Bonus korrekt (+15%, +30%, etc.)
- [ ] Locked/Unlocked States
- [ ] Categories unterscheidbar
- [ ] Fragment Details on Click

#### 3.5 Achievements (65 neue)

**Test pro Kategorie:**
- [ ] LEARNING (15): Mindestens 10 sichtbar
- [ ] EXPLORATION (15): Boss-Battles, Mission-Streaks
- [ ] COLLECTION (12): Fragment & Equipment Achievements
- [ ] SOCIAL (8): Friend, Challenge, Guild Achievements
- [ ] MASTER (15): Streak Milestones, Completionist

**Funktional-Tests:**
- [ ] Achievement Unlock Logic funktioniert
- [ ] XP Reward wird vergeben
- [ ] Notification erscheint bei Unlock
- [ ] Secret Achievements versteckt bis Unlock
- [ ] Progress Tracking funktioniert

#### 3.6 Quests (18 neue)

**Daily Quests (10):**
- [ ] Tägliche Lektion
- [ ] Lerneifer (3 Lessons)
- [ ] Vollgas (5 Lessons)
- [ ] Abenteuerlustig (1 Mission)
- [ ] Perfektionist (Perfect Lesson)
- [ ] Sammler (1 Fragment)
- [ ] Ausrüster (Equip Item)
- [ ] Skill-Jäger (Unlock Skill)
- [ ] Streaker (Maintain Streak)
- [ ] Vielseitig (2 Lessons + 1 Mission)

**Weekly Quests (8):**
- [ ] Wöchentlicher Gelehrter (15 Lessons)
- [ ] Wöchentlicher Abenteurer (3 Missions)
- [ ] Perfekte Woche (7 Tage Goal)
- [ ] Fragment-Jäger (5 Fragments)
- [ ] Ausrüstungs-Upgrade (3 Items)
- [ ] XP-Jäger (2000 XP)
- [ ] Skill-Meister (3 Skills)
- [ ] Soziale Woche (2 Friends + 1 Challenge)

**Funktional-Tests:**
- [ ] Quests erscheinen täglich/wöchentlich
- [ ] Progress Tracking funktioniert
- [ ] Completion Detection
- [ ] Rewards vergeben
- [ ] Reset um Mitternacht (Daily)
- [ ] Reset Montags (Weekly)

---

### PHASE 4: Component Functionality (20 Tests)

#### 4.1 LevelProgressRing Component
- [ ] Importiere in Dashboard
- [ ] Zeige Current XP / XP for Next Level
- [ ] Circular Progress korrekt
- [ ] Animation smooth (500ms)
- [ ] Colors (Temple Gold Gradient)
- [ ] Responsive Sizes

#### 4.2 StreakDisplay Component
- [ ] Zeige in Dashboard Hero
- [ ] Flame Animation
- [ ] Streak Number prominent
- [ ] Color-Coding (Yellow → Purple)
- [ ] Milestone Indicator
- [ ] Click-Action (optional)

#### 4.3 DailyGoalRing Component
- [ ] In Dashboard eingebaut
- [ ] Progress basierend auf Lessons Today
- [ ] Completion Animation (Checkmark)
- [ ] Color Change (Gold → Green)
- [ ] Motivations-Text

#### 4.4 StatsRadarChart Component
- [ ] In Profile Page
- [ ] 5 Stats korrekt gemappt
- [ ] Pentagon Shape
- [ ] Labels lesbar
- [ ] Value Numbers korrekt

#### 4.5 Achievement Wall Component
- [ ] In Collection oder Achievements Page
- [ ] Grid-Layout responsive
- [ ] Locked/Unlocked visuell klar
- [ ] Hover Tooltips
- [ ] Filter nach Type

#### 4.6 Loot Drop Animation
- [ ] Trigger nach Mission Complete
- [ ] Chest erscheint
- [ ] Click zum Öffnen
- [ ] Flip Animation
- [ ] Rarity Effects:
  - [ ] COMMON: Gray, wenig Particles
  - [ ] UNCOMMON: Green, mehr Particles
  - [ ] RARE: Blue, viele Particles
  - [ ] EPIC: Purple, sehr viele
  - [ ] LEGENDARY: Orange, Explosion
  - [ ] ARTIFACT: Gold/Red, Maximum

#### 4.7 Enhanced Level-Up
- [ ] Trigger bei Level-Up
- [ ] Fullscreen Overlay
- [ ] Confetti (50 Partikel)
- [ ] Glowing Background
- [ ] Star Icon rotiert
- [ ] Level Number animiert
- [ ] Stats Gained nacheinander
- [ ] Schließt smooth

#### 4.8 Streak Milestone Modal
- [ ] Trigger bei 7, 30, 100, 365
- [ ] Entsprechende Emoji (🔥 → 👑🔥👑)
- [ ] Fireworks
- [ ] Reward Display
- [ ] Motivations-Message

#### 4.9 Streak Recovery Modal
- [ ] Trigger bei verpasstem Tag
- [ ] Freezes Count korrekt
- [ ] Use Button enabled/disabled
- [ ] Warning Messages
- [ ] Confirmation

#### 4.10 Achievement Notification
- [ ] Toast rechts oben
- [ ] Slide-in von rechts
- [ ] Icon + Name + XP
- [ ] Auto-Close 4s
- [ ] Manual Close X
- [ ] Multiple stackable

#### 4.11 Enhanced Button
- [ ] Hover: Scale 1.05
- [ ] Click: Scale 0.95
- [ ] Loading State (Spinner + "Lädt...")
- [ ] Icon Support
- [ ] Disabled State grau
- [ ] Variants funktionieren

#### 4.12 Enhanced Card
- [ ] Hover: Scale 1.02, Y -4px
- [ ] Shadow intensiver
- [ ] Border Gold
- [ ] Spring Animation
- [ ] Nur bei hover=true

---

### PHASE 5: API Routes (6 neue Routes)

#### 5.1 Friends API
- [ ] GET `/api/social/friends` - Liste Friends
- [ ] POST `/api/social/friends` - Add Friend
- [ ] POST `/api/social/friends/[id]/accept` - Accept Request
- [ ] POST `/api/social/friends/[id]/decline` - Decline Request
- [ ] Error Handling
- [ ] Auth Check

#### 5.2 Profile API
- [ ] GET `/api/profile/[userId]` - Public Profile
- [ ] Privacy Check (isPublic)
- [ ] Character Data korrekt
- [ ] Stats korrekt
- [ ] Achievements Count
- [ ] Fragments Count
- [ ] isFriend Status

#### 5.3 Achievements API
- [ ] GET `/api/achievements` - All Achievements with Progress
- [ ] POST `/api/achievements/unlock` - Unlock Achievement
- [ ] Progress Calculation
- [ ] XP Reward

#### 5.4 Quests API
- [ ] GET `/api/quests` - Daily & Weekly Quests
- [ ] POST `/api/quests/progress` - Update Progress
- [ ] POST `/api/quests/complete` - Complete Quest
- [ ] Reset Logic (Daily/Weekly)
- [ ] Rewards

#### 5.5 User Preferences API
- [ ] GET `/api/user/preferences` - Get Preferences
- [ ] POST `/api/user/preferences` - Save Preferences
- [ ] Default Values
- [ ] Validation

#### 5.6 Recommendations API
- [ ] GET `/api/recommendations/lessons` - Recommended Lessons
- [ ] GET `/api/recommendations/missions` - Recommended Missions
- [ ] Personalization Logic
- [ ] Adaptive Difficulty

---

### PHASE 6: Integration Tests (15 Tests)

#### 6.1 Onboarding Flow (End-to-End)
1. [ ] Registrierung
2. [ ] Onboarding Start
3. [ ] Alle Tutorial Steps
4. [ ] Character Creation
5. [ ] Erste Lektion starten
6. [ ] Dashboard angezeigt

#### 6.2 Daily Routine Flow
1. [ ] Login → Dashboard
2. [ ] Check Streak (sollte incrementieren)
3. [ ] Check Daily Goal (0/5)
4. [ ] Complete 1 Lesson
5. [ ] Check Daily Goal (1/5)
6. [ ] Complete Daily Quest
7. [ ] Check Quest Progress
8. [ ] Complete 5 Lessons (Daily Limit)
9. [ ] Try 6th Lesson (sollte blocked sein)
10. [ ] Check Leaderboard Update

#### 6.3 Level-Up Flow
1. [ ] Current XP nahe Next Level
2. [ ] Complete Lesson
3. [ ] Level-Up Notification erscheint
4. [ ] Confetti Effect
5. [ ] Stats Increased
6. [ ] Notification Close
7. [ ] Dashboard zeigt neues Level
8. [ ] New Content unlocked?

#### 6.4 Mission Complete Flow
1. [ ] Start Mission
2. [ ] Complete Objectives
3. [ ] Mission Complete Screen
4. [ ] Fragment Unlocked
5. [ ] Loot Drop Animation (Equipment)
6. [ ] XP Reward
7. [ ] Achievement Unlocked? (first_mission)
8. [ ] Collection Updated

#### 6.5 Achievement Unlock Flow
1. [ ] Do Action (z.B. complete 10 lessons)
2. [ ] Achievement Notification erscheint
3. [ ] XP Reward granted
4. [ ] Achievements Page zeigt Unlock
5. [ ] Profile zeigt updated Count

#### 6.6 Streak Milestone Flow
1. [ ] Login 7 Tage in Folge
2. [ ] Streak Milestone Modal erscheint
3. [ ] Bonus XP vergeben
4. [ ] Badge/Achievement unlocked
5. [ ] Profile zeigt Milestone

#### 6.7 Streak Lost & Recovery
1. [ ] Miss a day (Simulate)
2. [ ] Streak Recovery Modal
3. [ ] Use Streak Freeze
4. [ ] Streak bleibt erhalten
5. [ ] Freeze Count decrements
6. [ ] Monthly Reset tracked

#### 6.8 Quest Completion
1. [ ] Check Daily Quests
2. [ ] Complete Quest Requirement
3. [ ] Progress Updates live
4. [ ] Quest marked Complete
5. [ ] Rewards granted
6. [ ] New Quests tomorrow

#### 6.9 Friend Add Flow
1. [ ] Search User (later)
2. [ ] Add Friend by ID
3. [ ] Pending Request sent
4. [ ] Friend receives Request
5. [ ] Friend Accepts
6. [ ] Both see each other in Friends List
7. [ ] Profiles linked

#### 6.10 Equipment Set Bonus
1. [ ] Equip 2 pieces of "Rüstung Gottes"
2. [ ] Check Set Bonus (10%)
3. [ ] Stats increase
4. [ ] Equip 4 pieces
5. [ ] Set Bonus (25%)
6. [ ] Equip 6 pieces (all)
7. [ ] Set Bonus (50%)
8. [ ] Total Strength reflects bonus

#### 6.11 Collection Bonus
1. [ ] Unlock 15 Fragments
2. [ ] Check Collection Bonus (+15%)
3. [ ] Total Strength increases
4. [ ] Unlock 30 Fragments
5. [ ] Bonus +30%
6. [ ] Unlock 45 Fragments
7. [ ] Bonus +50%
8. [ ] Unlock 60 Fragments
9. [ ] Bonus +100%!

#### 6.12 Personalization
1. [ ] Gehe zu Settings
2. [ ] Set Daily Goal to 5
3. [ ] Set Difficulty to "hard"
4. [ ] Save
5. [ ] Check Dashboard (Goal reflects)
6. [ ] Check Recommended Lessons (harder ones)

#### 6.13 Performance
1. [ ] Measure Page Load Times
2. [ ] Check Lazy Loading (Network Tab)
3. [ ] Test Offline Mode (Service Worker)
4. [ ] Test Image Optimization
5. [ ] Test Caching

#### 6.14 Accessibility
1. [ ] Tab through all elements
2. [ ] Focus Outlines visible
3. [ ] Skip Links work (Tab + Enter)
4. [ ] Screen Reader (Test mit VoiceOver/NVDA)
5. [ ] Reduced Motion (Preferences)
6. [ ] Color Contrast (WebAIM)

#### 6.15 Mobile Responsiveness
1. [ ] Test auf 320px (iPhone SE)
2. [ ] Test auf 768px (iPad)
3. [ ] Test auf 1920px (Desktop)
4. [ ] Touch Targets 44x44px
5. [ ] Navigation funktioniert
6. [ ] Modals Fullscreen auf Mobile

---

### PHASE 7: Bug-Hunting (10 Areas)

1. [ ] **Navigation**: Alle Links funktionieren?
2. [ ] **Forms**: Submit funktioniert überall?
3. [ ] **Auth**: Login/Logout/Register?
4. [ ] **API Errors**: Error Messages korrekt?
5. [ ] **Loading States**: Kein "Lädt..." hängen?
6. [ ] **Animations**: Keine Performance-Issues?
7. [ ] **Data Persistence**: Saves korrekt?
8. [ ] **Refresh**: State bleibt nach Refresh?
9. [ ] **Concurrent Actions**: Race Conditions?
10. [ ] **Edge Cases**: Empty States, Limits, etc.?

---

## 📊 SUCCESS CRITERIA

### Muss funktionieren (P0 - Critical):
- [ ] Auth (Login/Register)
- [ ] Character Creation
- [ ] Lessons Start & Complete
- [ ] Missions Start & Complete
- [ ] XP Gain & Level-Up
- [ ] Equipment Equip/Unequip
- [ ] Dashboard Load
- [ ] Navigation

### Sollte funktionieren (P1 - High):
- [ ] Onboarding Flow
- [ ] Achievements Unlock
- [ ] Quests Progress
- [ ] Streak Tracking
- [ ] Collection Display
- [ ] Leaderboard
- [ ] Friends System

### Nice-to-Have (P2 - Medium):
- [ ] All Animations smooth
- [ ] Perfect Responsiveness
- [ ] Offline Mode
- [ ] Performance 90+ Lighthouse

---

## 🎯 TEST-EXECUTION PLAN

### Step 1: Dev Server starten (5 Min)
```bash
cd /Users/yannickhartmann/Documents/GitHub/crucified-app
npm run dev
```

### Step 2: Database Seeds (15 Min)
- Alle 14 neue Seed-Files ausführen
- Verifiziere Success-Messages
- Check Database-Counts

### Step 3: Systematisches Testing (120 Min)
- Phase 1: Pages (30 Min)
- Phase 2: Components (30 Min)
- Phase 3: Content Samples (30 Min)
- Phase 4: Integration (30 Min)

### Step 4: Bug Documentation (30 Min)
- Liste alle gefundenen Issues
- Kategorisiere nach Severity (P0-P3)
- Priorisiere Fixes

### Step 5: Fix Critical Bugs (60-180 Min)
- P0 Bugs sofort fixen
- P1 Bugs dokumentieren
- P2/P3 in Backlog

---

## 📝 TEST-REPORT TEMPLATE

```markdown
## Test Session Report

**Datum**: 7. November 2025
**Tester**: [Name]
**Browser**: Chrome/Firefox/Safari
**Duration**: [X] Minuten

### Tested Features
- [x] Feature A - ✅ Funktioniert
- [ ] Feature B - ❌ Bug gefunden
- [~] Feature C - ⚠️ Teilweise

### Bugs Found
1. **[P0] Critical Bug Title**
   - Description: ...
   - Steps to Reproduce: ...
   - Expected: ...
   - Actual: ...

### Performance
- Page Load: [X]s
- Lighthouse Score: [X]/100
- Memory Usage: OK/High

### UX Feedback
- Positive: ...
- Issues: ...
- Suggestions: ...

### Overall Assessment
✅ PASS / ❌ FAIL / ⚠️ NEEDS WORK
```

---

## 🎉 READY TO TEST!

**Alle Test-Cases definiert!**  
**Total: 353+ Tests**  
**Geschätzte Dauer: 3-4 Stunden systematisches Testing**

**Nächster Schritt**: Development Server starten und systematisch testen! 🧪

---

**Status**: Testing Checklist KOMPLETT ✅  
**Bereitschaft**: READY FÜR BROWSER-TESTING 🧪  
**Empfehlung**: Starte mit P0 Critical Features, dann systematisch durch alle Phasen

