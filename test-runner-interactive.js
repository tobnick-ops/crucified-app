#!/usr/bin/env node
// Interaktiver Test-Runner für GAMEREADY Browser-Tests
// Führt User systematisch durch alle 60 Tests

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test Batches - Logisch gruppiert für effizienten Workflow
const testBatches = {
  batch1: {
    name: 'Quick Smoke Test (5 Tests)',
    priority: 'P0 - KRITISCH',
    estimatedTime: '15 min',
    description: 'Verifiziert, dass die App grundsätzlich funktioniert',
    tests: [
      {
        id: 'smoke-1',
        name: 'Server & Landing Page',
        steps: [
          'Öffne http://localhost:3000',
          'Seite lädt ohne Fehler',
          'Keine Console-Errors (F12)',
          'Login-/Signup sichtbar'
        ]
      },
      {
        id: 'smoke-2',
        name: 'Dashboard lädt',
        steps: [
          'Navigiere zu /dashboard',
          'Seite lädt (kein 404/500)',
          'Mindestens 3 Components sichtbar',
          'Keine kritischen Console-Errors'
        ]
      },
      {
        id: 'smoke-3',
        name: 'Achievements laden',
        steps: [
          'Navigiere zu /achievements',
          'Mindestens 10 Achievements sichtbar',
          'Category-Filter vorhanden',
          'Keine API-Errors (Network Tab)'
        ]
      },
      {
        id: 'smoke-4',
        name: 'Lessons Content vorhanden',
        steps: [
          'Navigiere zu /lessons',
          'Mindestens 50 Lessons sichtbar',
          'Lessons von verschiedenen Büchern',
          'Kein "No lessons found"'
        ]
      },
      {
        id: 'smoke-5',
        name: 'LEGS Equipment Check (KRITISCH!)',
        steps: [
          'Navigiere zu /character/equipment',
          'LEGS Slot IST NICHT LEER!',
          'Mindestens 3-4 LEGS Items sichtbar',
          'Equipment kann angeklickt werden'
        ]
      }
    ]
  },
  
  batch2: {
    name: 'Core Pages Deep Dive (8 Tests)',
    priority: 'P1 - High',
    estimatedTime: '45 min',
    description: 'Detaillierte Tests aller Haupt-Pages',
    tests: [
      {
        id: 'test-page-dashboard',
        name: 'Dashboard Volltest',
        steps: [
          'Hero Section mit Character Info sichtbar',
          'Level Progress Ring zeigt korrekten Level',
          'Streak Display mit Flamme animiert',
          'Daily Goal Ring zeigt Progress',
          'Stats Overview (5 Stats) vorhanden',
          'Collection Progress angezeigt',
          'Quick Actions klickbar',
          'Alle API Calls erfolgreich (Network Tab)'
        ]
      },
      {
        id: 'test-page-onboarding',
        name: 'Onboarding Flow',
        steps: [
          'Navigiere zu /onboarding',
          'Welcome Screen zeigt Value Proposition',
          'Step 1/5 Indicator sichtbar',
          'Tutorial-Steps durchklickbar',
          'Skip Button funktioniert',
          'Navigation zu Character Create möglich',
          'Kompletter Flow ohne Fehler'
        ]
      },
      {
        id: 'test-page-achievements',
        name: 'Achievements Volltest',
        steps: [
          'Alle 65 Achievements laden (zählen!)',
          'Category Filter: ALL, LEARNING, EXPLORATION, COLLECTION, SOCIAL, MASTER',
          'Completion % korrekt angezeigt',
          'Locked/Unlocked States unterscheidbar',
          'Progress Bars bei unlocked Items',
          'Hover zeigt Tooltip/Details',
          'Secret Achievements haben 🔒'
        ]
      },
      {
        id: 'test-page-quests',
        name: 'Quests Volltest',
        steps: [
          '3 Daily Quests angezeigt',
          '3 Weekly Quests angezeigt',
          'Progress Bars zeigen korrekten Progress (0% bei neu)',
          'Reset-Info sichtbar (Daily: 24h, Weekly: 7d)',
          'Completion States (TODO/IN PROGRESS/DONE)',
          'Reward Info (XP + Gold) sichtbar'
        ]
      },
      {
        id: 'test-page-settings',
        name: 'Settings Volltest',
        steps: [
          'Daily Goal Slider (1-10)',
          'Difficulty Select (Easy/Medium/Hard)',
          'Theme Toggle (Light/Dark)',
          'Font Size Buttons',
          'Reduced Motion Checkbox',
          'Sound Toggle',
          'Privacy Options',
          'Save Button funktioniert',
          'Success-Message nach Save'
        ]
      },
      {
        id: 'test-page-friends',
        name: 'Friends Page',
        steps: [
          'Friends List sichtbar (kann leer sein)',
          'Pending Requests Section vorhanden',
          'Empty State gut gestaltet',
          'Add Friend Button/Funktion vorhanden',
          'Keine Crash bei leerer Liste'
        ]
      },
      {
        id: 'test-page-profile',
        name: 'Profile Page',
        steps: [
          'Navigiere zu /profile/[deine-userId]',
          'Character Info lädt',
          'Stats Radar Chart rendert (Pentagon)',
          'Streak Display sichtbar',
          'Achievements Count korrekt',
          'Fragments Count korrekt',
          'Add Friend Button (bei fremden Profiles)'
        ]
      },
      {
        id: 'test-navigation-links',
        name: 'Navigation Links',
        steps: [
          'Alle 8 Links vorhanden: Dashboard, Charakter, Lektionen, Missionen, Sammlung, Erfolge, Quests, Rangliste',
          'Alle Links funktionieren (keine 404)',
          'Active State wird gesetzt',
          'Mobile: Navigation responsive',
          'Icons sichtbar'
        ]
      }
    ]
  },
  
  batch3: {
    name: 'Components & Visuals (12 Tests)',
    priority: 'P1 - High',
    estimatedTime: '30 min',
    description: 'Visuelle Components und UI-Elemente',
    tests: [
      {
        id: 'test-component-level-ring',
        name: 'LevelProgressRing',
        steps: [
          'Im Dashboard sichtbar',
          'Circular Progress visuell korrekt',
          'Level Number in Center',
          'XP Label (z.B. "500/1000 XP")',
          'Gradient funktioniert',
          'Animation smooth beim Hover'
        ]
      },
      {
        id: 'test-component-streak',
        name: 'StreakDisplay',
        steps: [
          'Flamme 🔥 animiert (Pulse-Effekt)',
          'Streak Number prominent',
          'Color ändert sich mit Level (1-6: orange, 7+: gold)',
          'Milestone-Indicator bei 7/30/100/365',
          'Tooltip bei Hover'
        ]
      },
      {
        id: 'test-component-radar',
        name: 'StatsRadarChart',
        steps: [
          'Pentagon-Shape erkennbar',
          '5 Stats gemappt (Faith, Wisdom, Knowledge, Service, Leadership)',
          'Labels lesbar',
          'Werte korrekt dargestellt',
          'Gradient/Farben funktionieren',
          'Responsive sizing'
        ]
      },
      {
        id: 'test-component-achievement-wall',
        name: 'AchievementWall',
        steps: [
          'Grid-Layout responsive',
          'Unlocked Fragments farbig',
          'Locked Fragments grau mit 🔒',
          'Completion % oben angezeigt',
          'Collection Bonus angezeigt',
          'Hover Tooltips funktionieren',
          'Legend/Erklärung sichtbar'
        ]
      },
      {
        id: 'test-component-daily-goal',
        name: 'DailyGoalRing',
        steps: [
          'Progress basierend auf Lessons Today',
          'Checkmark ✓ bei 100%',
          'Color Change Gold→Green bei Complete',
          'Scale Animation beim Progress-Update',
          'Label zeigt "3/5" Format'
        ]
      },
      {
        id: 'test-button-interactions',
        name: 'Enhanced Button',
        steps: [
          'Hover: Scale 1.05 smooth',
          'Click: Scale 0.95',
          'Loading State: Spinner + "Lädt..."',
          'Icon Support funktioniert',
          'Disabled State grau + cursor not-allowed',
          'Alle Variants: primary, secondary, danger, ghost'
        ]
      },
      {
        id: 'test-card-interactions',
        name: 'Enhanced Card',
        steps: [
          'Hover Effect: Scale 1.02, Y -4px',
          'Shadow intensiver bei Hover',
          'Border→Gold bei Hover',
          'Spring Animation smooth',
          'Nur bei hover=true aktiv',
          'Kein Layout-Shift bei Hover'
        ]
      },
      {
        id: 'test-animation-loot-drop',
        name: 'LootDropAnimation',
        steps: [
          'Triggert nach Mission Complete',
          'Chest erscheint in Bildmitte',
          'Click zum Öffnen funktioniert',
          'Flip Animation smooth',
          'Rarity-Colors: COMMON gray → EPIC purple → ARTIFACT gold/red',
          'Particles fliegen nach außen'
        ]
      },
      {
        id: 'test-animation-level-up',
        name: 'Enhanced LevelUpNotification',
        steps: [
          'Fullscreen Overlay (schwarzer Hintergrund)',
          'Confetti Effekt: ~50 Partikel fallen',
          'Glowing Background pulsiert',
          'Star ⭐ rotiert',
          'Level Number animiert erscheint',
          'Stats nacheinander eingeblendet',
          'Close Button funktioniert'
        ]
      },
      {
        id: 'test-animation-streak-milestone',
        name: 'StreakMilestoneModal',
        steps: [
          'Triggert bei 7/30/100/365 Tagen',
          'Fireworks Effekt',
          'Emoji ändert sich: 🔥 → 🔥🔥 → 🔥🔥🔥 → 👑🔥👑',
          'Reward Info (z.B. 50 XP)',
          'Motivations-Text',
          'Close Button'
        ]
      },
      {
        id: 'test-content-lessons',
        name: 'Lessons Content Verification',
        steps: [
          'Mindestens 150 Lessons sichtbar',
          'Stichprobe: 1 Easy, 1 Medium, 1 Hard',
          'NT und AT Bücher vertreten',
          'Daily Limit funktioniert (5 Lessons)',
          'Lesson Start funktioniert',
          'Questions laden'
        ]
      },
      {
        id: 'test-content-missions',
        name: 'Missions Content Verification',
        steps: [
          'Mindestens 15 Missions sichtbar',
          'Verschiedene Types: Story, Combat, Resource, Puzzle',
          'Stichprobe: 1 Mission starten',
          'Objectives angezeigt',
          'Phaser Game lädt',
          'Mission Complete möglich'
        ]
      }
    ]
  },
  
  batch4: {
    name: 'Content & API Verification (6 Tests)',
    priority: 'P1 - High',
    estimatedTime: '30 min',
    description: 'Seed-Daten und API-Endpoints',
    tests: [
      {
        id: 'test-content-equipment',
        name: 'Equipment Content (KRITISCH)',
        steps: [
          'LEGS Slot hat 8+ Items',
          'Alle 6 Slots haben Items (HEAD, CHEST, LEGS, FEET, WEAPON, ACCESSORY)',
          'Equip funktioniert',
          'Unequip funktioniert',
          'Stats Update nach Equip',
          'Set-Bonus bei passenden Sets'
        ]
      },
      {
        id: 'test-content-fragments',
        name: 'Fragments Content',
        steps: [
          '60+ Total Fragments (zählen via UI)',
          'Kategorien erkennbar: Characters (blau), Locations (grün), Concepts (lila), Events (rot)',
          'Collection Bonus korrekt: 15 Fragments = +15%, 30 = +30%, etc.',
          'Locked/Unlocked States',
          'Fragment Details bei Click'
        ]
      },
      {
        id: 'test-api-achievements',
        name: 'API /api/achievements',
        steps: [
          'Network Tab öffnen (F12)',
          'Achievements-Page laden',
          'API Call Status: 200',
          'Response enthält 65 Achievements',
          'Progress-Calculation korrekt',
          'Keine Console Errors',
          'Response-Time < 2s'
        ]
      },
      {
        id: 'test-api-quests',
        name: 'API /api/quests',
        steps: [
          'Quests-Page laden',
          'API Call Status: 200',
          'Response: dailyQuests (3) + weeklyQuests (3)',
          'Progress-Tracking vorhanden',
          'Keine Console Errors'
        ]
      },
      {
        id: 'test-api-preferences',
        name: 'API /api/user/preferences',
        steps: [
          'Settings-Page laden',
          'GET Request erfolgreich',
          'Preferences angezeigt',
          'Änderung vornehmen',
          'POST Request erfolgreich',
          'Success-Message erscheint',
          'Reload: Änderung persistent'
        ]
      },
      {
        id: 'test-api-friends',
        name: 'API /api/social/friends',
        steps: [
          'Friends-Page laden',
          'API Call erfolgreich',
          'Friends-Liste (kann leer sein)',
          'Error Handling bei leerer Liste gut',
          'Add Friend funktioniert'
        ]
      }
    ]
  },
  
  batch5: {
    name: 'Integration Flows (6 Tests)',
    priority: 'P2 - Medium',
    estimatedTime: '60 min',
    description: 'End-to-End User Journeys',
    tests: [
      {
        id: 'test-flow-onboarding',
        name: 'Complete Onboarding Flow',
        steps: [
          'Neuen Test-Account erstellen',
          'Onboarding durchlaufen (alle 5 Steps)',
          'Character Creation abschließen',
          'Erste Lektion starten',
          'Dashboard wird angezeigt',
          'Kompletter Flow < 5 Min'
        ]
      },
      {
        id: 'test-flow-daily-routine',
        name: 'Daily Routine Simulation',
        steps: [
          'Dashboard öffnen',
          'Streak checken (sollte heute sein)',
          'Daily Quests ansehen',
          '1 Lesson starten & abschließen',
          'XP Gain verifizieren',
          'Daily Goal Update (1/5)',
          'Quest Progress Update (Tägliche Lektion: 1/1)'
        ]
      },
      {
        id: 'test-flow-level-up',
        name: 'Level-Up Flow',
        steps: [
          'Character nahe Next Level bringen (XP sammeln)',
          'Lesson abschließen die Level-Up triggert',
          'Level-Up Notification erscheint',
          'Confetti Effekt sichtbar',
          'Stats Increased animiert gezeigt',
          'Close Modal',
          'Dashboard zeigt neues Level'
        ]
      },
      {
        id: 'test-flow-achievement',
        name: 'Achievement Unlock',
        steps: [
          'Action ausführen die Achievement triggert (z.B. 10. Lesson)',
          'Achievement Notification erscheint (Toast rechts oben)',
          'XP Reward granted',
          'Achievements-Page zeigt Unlock',
          'Toast Auto-Close nach 4s'
        ]
      },
      {
        id: 'test-flow-equipment-set',
        name: 'Equipment Set-Bonus',
        steps: [
          '2 Teile eines Sets equippen (z.B. "Rüstung Gottes")',
          'Set Bonus 10% wird angezeigt',
          'Stats increase sichtbar',
          '4 Teile equippen',
          '25% Bonus wird angezeigt',
          'Total Strength reflektiert Bonus'
        ]
      },
      {
        id: 'test-flow-collection-bonus',
        name: 'Collection Bonus',
        steps: [
          'Fragment-Count checken',
          'Bei 15 Fragments: +15% Bonus angezeigt',
          'Bei 30 Fragments: +30% Bonus',
          'Bei 45 Fragments: +50% Bonus',
          'Total Strength Update korrekt'
        ]
      }
    ]
  },
  
  batch6: {
    name: 'Responsive & Accessibility (9 Tests)',
    priority: 'P2 - Medium',
    estimatedTime: '45 min',
    description: 'Cross-Device & Accessibility',
    tests: [
      {
        id: 'test-responsive-mobile',
        name: 'Mobile (320px-768px)',
        steps: [
          'DevTools → Toggle Device Toolbar',
          'iPhone SE (375px) testen',
          'Navigation responsive (sollte Grid sein)',
          'Dashboard Cards stacken vertikal',
          'Touch Targets mindestens 44x44px',
          'Buttons alle erreichbar',
          'Kein horizontaler Scroll'
        ]
      },
      {
        id: 'test-responsive-tablet',
        name: 'Tablet (768px-1024px)',
        steps: [
          'iPad (768px) testen',
          'Layout nutzt 2-Column wo möglich',
          'Navigation angepasst',
          'Cards in 2er Grid',
          'Text gut lesbar',
          'Keine Überlappungen'
        ]
      },
      {
        id: 'test-responsive-desktop',
        name: 'Desktop (1024px+)',
        steps: [
          'Full Desktop (1920px)',
          'Navigation horizontal',
          'Multi-Column Layouts',
          'Alle Components optimal sichtbar',
          'Kein übermäßiger Whitespace',
          'Bilder/Charts skalieren gut'
        ]
      },
      {
        id: 'test-accessibility-keyboard',
        name: 'Keyboard Navigation',
        steps: [
          'Maus weglegen - nur Tastatur!',
          'Tab-Taste durchgehen',
          'Focus Outlines sichtbar (Gold)',
          'Skip Links erscheinen bei Tab ("Zum Hauptinhalt")',
          'Alle interaktiven Elemente erreichbar',
          'Tab-Reihenfolge logisch',
          'Enter aktiviert Buttons'
        ]
      },
      {
        id: 'test-accessibility-contrast',
        name: 'Color Contrast',
        steps: [
          'WebAIM Contrast Checker öffnen (webaim.org/resources/contrastchecker)',
          'Text auf Temple Gold Background prüfen',
          'Secondary Text Colors prüfen',
          'Mindestens 4.5:1 für Normal Text',
          'Mindestens 3:1 für Large Text',
          'Error Messages gut lesbar'
        ]
      },
      {
        id: 'test-accessibility-reduced-motion',
        name: 'Reduced Motion',
        steps: [
          'Settings → Reduced Motion aktivieren',
          'Seite neu laden (Cmd+R)',
          'Animationen sollten minimal/instant sein',
          'Confetti deaktiviert',
          'Transitions < 0.1s',
          'Keine störenden Bewegungen',
          'App bleibt funktional'
        ]
      },
      {
        id: 'test-performance-lighthouse',
        name: 'Lighthouse Audit',
        steps: [
          'Chrome DevTools → Lighthouse Tab',
          'Mode: Desktop, Alle Categories',
          'Run Analysis auf /dashboard',
          'Performance: 80+',
          'Accessibility: 90+',
          'Best Practices: 90+',
          'SEO: 80+',
          'Verbesserungspunkte dokumentieren'
        ]
      },
      {
        id: 'test-performance-load-times',
        name: 'Load Time Performance',
        steps: [
          'Network Tab öffnen',
          'Hard Refresh (Cmd+Shift+R)',
          'Dashboard Load < 3s',
          'Lessons Page Load < 3s',
          'Images lazy loading',
          'API Calls parallel',
          'No blocking requests',
          'Total Size < 5MB'
        ]
      },
      {
        id: 'test-performance-animations',
        name: 'Animation Performance',
        steps: [
          'DevTools → Performance Tab',
          'Record während Animationen',
          'Alle Animationen 60fps',
          'Loot Drop performant',
          'Level-Up Confetti smooth',
          'Keine Frame Drops',
          'CPU < 80%',
          'Memory stabil'
        ]
      }
    ]
  },
  
  batch7: {
    name: 'Edge Cases & Error Handling (9 Tests)',
    priority: 'P2 - Medium',
    estimatedTime: '30 min',
    description: 'Fehlerbehandlung und Grenzfälle',
    tests: [
      {
        id: 'test-error-handling',
        name: 'Error Handling',
        steps: [
          'DevTools → Network Tab',
          'Throttling auf "Offline"',
          'Page navigieren',
          'Error States angezeigt (User-friendly)',
          'Retry Buttons funktionieren',
          'Console zeigt Details',
          'App crasht nicht'
        ]
      },
      {
        id: 'test-edge-cases-limits',
        name: 'Daily Limits',
        steps: [
          '5 Lessons abschließen',
          '6. Lesson versuchen',
          'Message: "Tägliches Limit erreicht"',
          'Kein Crash',
          'Clear Communication',
          'Alternative Vorschläge (Missionen?)',
          'Limit Reset-Time angezeigt'
        ]
      },
      {
        id: 'test-edge-cases-levels',
        name: 'Level Requirements',
        steps: [
          'Low-Level Character (Level 1-2)',
          'High-Level Lesson versuchen (Level 10+)',
          'Message: "Level X erforderlich"',
          'Disabled State visuell klar',
          'Lock-Icon 🔒',
          'Clear Messaging',
          'Kein Crash beim Click'
        ]
      },
      {
        id: 'test-edge-cases-empty',
        name: 'Empty States',
        steps: [
          'Neuer Character ohne Achievements → Empty State gut gestaltet',
          'Ohne Fragments → Sammelbuch Empty State motivierend',
          'Ohne Friends → Freunde Empty State mit CTA',
          'Alle Empty States haben Illustrations/Icons',
          'Call-to-Action Buttons vorhanden',
          'Keine "undefined" / "null" angezeigt'
        ]
      },
      {
        id: 'test-console-errors',
        name: 'Console Error Check',
        steps: [
          'Browser Console offen halten (F12)',
          'Durch alle Pages navigieren',
          'Keine roten Errors (außer bekannte)',
          'Keine 404s auf wichtige Resources',
          'TypeScript Types korrekt',
          'API Calls alle 200/201',
          'Warnings dokumentieren'
        ]
      },
      {
        id: 'test-console-warnings',
        name: 'Console Warning Check',
        steps: [
          'Warnings durchgehen',
          'React Warnings dokumentieren',
          'Missing Key Warnings notieren',
          'Deprecated APIs',
          'Performance Warnings',
          'Memory Leaks?',
          'Severity bewerten'
        ]
      },
      {
        id: 'test-data-persistence',
        name: 'Data Persistence',
        steps: [
          'XP sammeln (z.B. Lesson complete)',
          'Level aufsteigen',
          'Equipment ändern',
          'Fragment freischalten',
          'Page Refresh (F5)',
          'State bleibt erhalten',
          'Kein Datenverlust'
        ]
      },
      {
        id: 'test-cross-browser-chrome',
        name: 'Chrome Latest',
        steps: [
          'Chrome aktualisieren (Latest)',
          'Alle kritischen Features testen',
          'Screenshots machen',
          'Performance messen',
          'Als Baseline nutzen'
        ]
      },
      {
        id: 'test-cross-browser-firefox',
        name: 'Firefox',
        steps: [
          'Firefox öffnen',
          'Dashboard, Lessons, Achievements öffnen',
          'Animations funktionieren',
          'Layout korrekt',
          'Keine Firefox-spezifische Bugs',
          'Console clean'
        ]
      }
    ]
  },
  
  batch8: {
    name: 'Documentation & Reporting (4 Tests)',
    priority: 'P3 - Low',
    estimatedTime: '30 min',
    description: 'Test-Dokumentation erstellen',
    tests: [
      {
        id: 'test-bugs-document',
        name: 'Bug Documentation',
        steps: [
          'Alle gefundenen Bugs sammeln',
          'BUGS_FOUND.md erstellen',
          'Kategorisieren: P0 Critical, P1 High, P2 Medium, P3 Low',
          'Screenshots anhängen',
          'Steps to Reproduce klar beschreiben',
          'Expected vs. Actual',
          'Environment Info (Browser, OS)'
        ]
      },
      {
        id: 'test-report-create',
        name: 'Test Report',
        steps: [
          'TEST_SESSION_REPORT.md erstellen',
          'Tested Features auflisten (✅/❌/⚠️)',
          'Performance Metrics (Load Times, Lighthouse)',
          'UX Feedback',
          'Overall Assessment: PASS/FAIL/NEEDS WORK',
          'Recommendations',
          'Sign-off'
        ]
      },
      {
        id: 'test-screenshots',
        name: 'Screenshots',
        steps: [
          'docs/screenshots/ Ordner erstellen',
          'Alle 8 Pages screenshotten',
          'Key Components (Modals, Animations)',
          'Bug-Screenshots',
          'Before/After bei Fixes',
          'Benennung: feature-name-timestamp.png'
        ]
      },
      {
        id: 'test-video-recording',
        name: 'Optional: Screen Recording',
        steps: [
          'QuickTime/OBS Screen Recording',
          'Quick Tour (5 Min)',
          'Dashboard → Lesson → Achievement → Quest',
          'Key Features demonstrieren',
          'Für Marketing nutzbar',
          'Upload zu docs/videos/'
        ]
      }
    ]
  }
};

let currentResults = {
  totalTests: 0,
  completed: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  results: []
};

async function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function displayHeader() {
  console.clear();
  console.log(`${colors.bold}${colors.cyan}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     🎮 GAMEREADY BROWSER TEST RUNNER - INTERAKTIV 🎮         ║
║                                                              ║
║     Systematischer Test-Durchlauf für 60 Browser-Tests      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}\n`);
}

function displayBatchOverview() {
  console.log(`${colors.bold}${colors.blue}📋 Test-Batch-Übersicht:${colors.reset}\n`);
  
  Object.entries(testBatches).forEach(([key, batch], index) => {
    const batchNum = index + 1;
    const testCount = batch.tests.length;
    console.log(`${colors.cyan}${batchNum}. ${batch.name}${colors.reset}`);
    console.log(`   Priority: ${batch.priority} | Time: ~${batch.estimatedTime} | Tests: ${testCount}`);
    console.log(`   ${colors.yellow}${batch.description}${colors.reset}\n`);
  });
  
  const totalTests = Object.values(testBatches).reduce((sum, batch) => sum + batch.tests.length, 0);
  const totalTime = Object.values(testBatches).reduce((sum, batch) => {
    const mins = parseInt(batch.estimatedTime);
    return sum + (isNaN(mins) ? 0 : mins);
  }, 0);
  
  console.log(`${colors.bold}Total: ${totalTests} Tests | Geschätzte Zeit: ~${Math.floor(totalTime / 60)}h ${totalTime % 60}min${colors.reset}\n`);
}

async function runBatch(batchKey, batch) {
  console.clear();
  displayHeader();
  
  console.log(`${colors.bold}${colors.magenta}
╔══════════════════════════════════════════════════════════════╗
║  BATCH: ${batch.name.padEnd(54)}  ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}\n`);
  
  console.log(`${colors.yellow}Priority: ${batch.priority}${colors.reset}`);
  console.log(`${colors.yellow}Geschätzte Zeit: ${batch.estimatedTime}${colors.reset}`);
  console.log(`${colors.yellow}Tests: ${batch.tests.length}${colors.reset}\n`);
  console.log(`${batch.description}\n`);
  
  const proceed = await question(`${colors.cyan}Dieses Batch jetzt starten? (j/n/s=skip): ${colors.reset}`);
  
  if (proceed.toLowerCase() === 'n') {
    return false; // Exit runner
  }
  
  if (proceed.toLowerCase() === 's') {
    currentResults.skipped += batch.tests.length;
    return true; // Continue to next batch
  }
  
  for (let i = 0; i < batch.tests.length; i++) {
    const test = batch.tests[i];
    await runTest(test, i + 1, batch.tests.length, batch.name);
  }
  
  return true;
}

async function runTest(test, testNum, totalInBatch, batchName) {
  console.clear();
  displayHeader();
  
  console.log(`${colors.bold}${colors.blue}Batch: ${batchName}${colors.reset}`);
  console.log(`${colors.bold}Test ${testNum}/${totalInBatch}: ${test.name}${colors.reset}\n`);
  
  console.log(`${colors.yellow}Test-Schritte:${colors.reset}\n`);
  test.steps.forEach((step, i) => {
    console.log(`  ${colors.cyan}${i + 1}.${colors.reset} ${step}`);
  });
  
  console.log(`\n${colors.magenta}${'─'.repeat(60)}${colors.reset}\n`);
  console.log(`${colors.bold}Führe diese Schritte im Browser aus.${colors.reset}\n`);
  
  await question(`${colors.green}▶ Drücke Enter wenn bereit zum Starten...${colors.reset}`);
  
  console.log(`\n${colors.yellow}Test läuft... Führe die Schritte durch.${colors.reset}\n`);
  
  const result = await question(`${colors.cyan}Ergebnis? (p=Pass / f=Fail / s=Skip / n=Notes): ${colors.reset}`);
  
  let notes = '';
  if (result.toLowerCase() === 'n' || result.toLowerCase() === 'f') {
    notes = await question(`${colors.yellow}Notizen/Bugs eingeben: ${colors.reset}`);
  }
  
  const testResult = {
    id: test.id,
    name: test.name,
    status: result.toLowerCase() === 'p' ? 'PASS' : 
            result.toLowerCase() === 'f' ? 'FAIL' :
            result.toLowerCase() === 's' ? 'SKIP' : 'NOTES',
    notes: notes,
    timestamp: new Date().toISOString()
  };
  
  currentResults.results.push(testResult);
  currentResults.totalTests++;
  currentResults.completed++;
  
  if (testResult.status === 'PASS') currentResults.passed++;
  if (testResult.status === 'FAIL') currentResults.failed++;
  if (testResult.status === 'SKIP') currentResults.skipped++;
  
  console.log(`\n${colors.green}✓ Test dokumentiert${colors.reset}\n`);
  
  const continueTest = await question(`${colors.cyan}Weiter zum nächsten Test? (j/n/r=Report): ${colors.reset}`);
  
  if (continueTest.toLowerCase() === 'r') {
    await showInterimReport();
    await question(`${colors.cyan}Drücke Enter zum Fortfahren...${colors.reset}`);
  }
  
  return continueTest.toLowerCase() !== 'n';
}

async function showInterimReport() {
  console.clear();
  displayHeader();
  
  console.log(`${colors.bold}${colors.blue}📊 Zwischenbericht${colors.reset}\n`);
  console.log(`Total Tests: ${currentResults.totalTests}`);
  console.log(`${colors.green}✓ Passed: ${currentResults.passed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${currentResults.failed}${colors.reset}`);
  console.log(`${colors.yellow}⊘ Skipped: ${currentResults.skipped}${colors.reset}`);
  
  const passRate = currentResults.totalTests > 0 
    ? ((currentResults.passed / currentResults.totalTests) * 100).toFixed(1)
    : 0;
  console.log(`\nPass Rate: ${passRate}%\n`);
  
  if (currentResults.failed > 0) {
    console.log(`${colors.red}Failed Tests:${colors.reset}`);
    currentResults.results
      .filter(r => r.status === 'FAIL')
      .forEach(r => {
        console.log(`  ✗ ${r.name}`);
        if (r.notes) console.log(`    Note: ${r.notes}`);
      });
    console.log('');
  }
}

async function generateFinalReport() {
  const reportContent = `# GAMEREADY Browser Test Report

**Datum:** ${new Date().toLocaleDateString('de-DE')}
**Durchgeführt von:** User (mit interaktivem Test-Runner)

## Summary

- **Total Tests:** ${currentResults.totalTests}
- **Passed:** ${currentResults.passed} ✅
- **Failed:** ${currentResults.failed} ❌
- **Skipped:** ${currentResults.skipped} ⊘
- **Pass Rate:** ${currentResults.totalTests > 0 ? ((currentResults.passed / currentResults.totalTests) * 100).toFixed(1) : 0}%

## Detailed Results

${currentResults.results.map((result, i) => `
### ${i + 1}. ${result.name}

- **ID:** ${result.id}
- **Status:** ${result.status}
- **Timestamp:** ${result.timestamp}
${result.notes ? `- **Notes:** ${result.notes}` : ''}
`).join('\n')}

## Recommendations

${currentResults.failed > 0 ? `
### Critical Issues
${currentResults.results.filter(r => r.status === 'FAIL').map(r => `
- ${r.name}: ${r.notes || 'No details provided'}
`).join('\n')}
` : 'Keine kritischen Issues gefunden! 🎉'}

## Next Steps

${currentResults.failed > 0 
  ? '1. Alle Failed Tests beheben\n2. Re-Testing durchführen\n3. Bug-Tickets erstellen' 
  : '1. Performance-Optimierungen\n2. Cross-Browser Testing erweitern\n3. Load Testing'}

---
*Generiert mit GAMEREADY Test Runner*
`;

  const reportPath = path.join(process.cwd(), 'docs', 'BROWSER_TEST_REPORT.md');
  await fs.writeFile(reportPath, reportContent, 'utf-8');
  
  console.log(`\n${colors.green}✓ Report gespeichert: ${reportPath}${colors.reset}\n`);
}

async function main() {
  displayHeader();
  console.log(`${colors.yellow}Willkommen beim interaktiven Test-Runner!${colors.reset}\n`);
  console.log(`Dieser Runner führt dich Schritt für Schritt durch alle 60 Browser-Tests.`);
  console.log(`Du kannst jederzeit pausieren, Notizen machen, und den Fortschritt speichern.\n`);
  
  await question(`${colors.green}Drücke Enter zum Starten...${colors.reset}`);
  
  displayBatchOverview();
  
  const startChoice = await question(`${colors.cyan}Möchtest du:\n1) Alle Batches der Reihe nach\n2) Einzelnes Batch wählen\n3) Batch-Übersicht als Markdown speichern\nWahl (1/2/3): ${colors.reset}`);
  
  if (startChoice === '3') {
    await saveBatchOverview();
    rl.close();
    return;
  }
  
  if (startChoice === '2') {
    const batchNum = await question(`${colors.cyan}Welches Batch (1-8)? ${colors.reset}`);
    const batchKey = `batch${batchNum}`;
    const batch = testBatches[batchKey];
    
    if (!batch) {
      console.log(`${colors.red}Ungültige Batch-Nummer!${colors.reset}`);
      rl.close();
      return;
    }
    
    await runBatch(batchKey, batch);
  } else {
    // Run all batches
    for (const [key, batch] of Object.entries(testBatches)) {
      const shouldContinue = await runBatch(key, batch);
      if (!shouldContinue) break;
      
      if (key !== 'batch8') {
        const takeBreak = await question(`${colors.yellow}\nBatch abgeschlossen! Pause machen? (j/n): ${colors.reset}`);
        if (takeBreak.toLowerCase() === 'j') {
          console.log(`${colors.green}Drücke Enter wenn du weitermachen möchtest...${colors.reset}`);
          await question('');
        }
      }
    }
  }
  
  console.clear();
  displayHeader();
  await showInterimReport();
  
  const saveReport = await question(`${colors.cyan}\nFinalen Report speichern? (j/n): ${colors.reset}`);
  if (saveReport.toLowerCase() === 'j') {
    await generateFinalReport();
  }
  
  console.log(`\n${colors.bold}${colors.green}✅ Test-Session abgeschlossen! Danke!${colors.reset}\n`);
  rl.close();
}

async function saveBatchOverview() {
  const overview = `# GAMEREADY Test Execution Plan

**Total Tests:** ${Object.values(testBatches).reduce((sum, b) => sum + b.tests.length, 0)}
**Total Batches:** ${Object.keys(testBatches).length}

## Batch Overview

${Object.entries(testBatches).map(([key, batch], i) => `
### Batch ${i + 1}: ${batch.name}

- **Priority:** ${batch.priority}
- **Estimated Time:** ${batch.estimatedTime}
- **Tests:** ${batch.tests.length}
- **Description:** ${batch.description}

**Tests in this batch:**
${batch.tests.map((t, j) => `${j + 1}. ${t.name} (${t.steps.length} steps)`).join('\n')}
`).join('\n')}

## Execution Strategy

1. Start with **Batch 1 (Quick Smoke Test)** - validates basic functionality
2. Continue with **Batches 2-4** - core features and content
3. **Batches 5-7** - integration, responsiveness, edge cases
4. **Batch 8** - documentation and reporting

## Progress Tracking

Use this checklist to track your progress:

${Object.entries(testBatches).map(([key, batch], i) => `
### Batch ${i + 1}: ${batch.name}
${batch.tests.map(t => `- [ ] ${t.name}`).join('\n')}
`).join('\n')}
`;

  const overviewPath = path.join(process.cwd(), 'docs', 'TEST_EXECUTION_PLAN.md');
  await fs.writeFile(overviewPath, overview, 'utf-8');
  console.log(`\n${colors.green}✓ Test Execution Plan gespeichert: ${overviewPath}${colors.reset}\n`);
}

// Start
main().catch(console.error);

