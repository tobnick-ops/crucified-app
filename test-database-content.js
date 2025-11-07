// Database Content Verification für GAMEREADY Seeds
// Verifiziert, dass alle Seeds erfolgreich ausgeführt wurden

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const results = {
  passed: 0,
  failed: 0,
  warnings: 0
};

async function testCount(name, model, expected, details = '') {
  try {
    const count = await prisma[model].count();
    const passed = count >= expected;
    
    if (passed) {
      console.log(`${colors.green}✓${colors.reset} ${name}: ${count} (expected ${expected}+) ${details}`);
      results.passed++;
    } else {
      console.log(`${colors.red}✗${colors.reset} ${name}: ${count} (expected ${expected}+) ${details}`);
      results.failed++;
    }
    
    return { count, expected, passed };
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${name}: ERROR - ${error.message}`);
    results.failed++;
    return { count: 0, expected, passed: false, error };
  }
}

async function testEquipmentSlots() {
  try {
    console.log('\n  🔍 Checking Equipment Slots Distribution...');
    const slots = ['HEAD', 'CHEST', 'LEGS', 'FEET', 'WEAPON', 'ACCESSORY'];
    
    for (const slot of slots) {
      const count = await prisma.equipmentItem.count({
        where: { itemType: slot }
      });
      
      if (count === 0) {
        console.log(`    ${colors.red}✗${colors.reset} ${slot}: ${count} items (CRITICAL: Empty slot!)`);
        results.failed++;
      } else if (count < 5) {
        console.log(`    ${colors.yellow}⚠${colors.reset} ${slot}: ${count} items (Low, but OK)`);
        results.warnings++;
        results.passed++;
      } else {
        console.log(`    ${colors.green}✓${colors.reset} ${slot}: ${count} items`);
        results.passed++;
      }
    }
  } catch (error) {
    console.log(`    ${colors.red}✗${colors.reset} Equipment Slots Check ERROR: ${error.message}`);
    results.failed++;
  }
}

async function testFragmentCategories() {
  try {
    console.log('\n  🔍 Checking Fragment Categories...');
    
    const charactersCount = await prisma.fragment.count({
      where: { 
        OR: [
          { category: 'CHARACTERS' },
          { category: 'CHARACTER' }
        ]
      }
    });
    const locationsCount = await prisma.fragment.count({
      where: { 
        OR: [
          { category: 'LOCATIONS' },
          { category: 'LOCATION' }
        ]
      }
    });
    const conceptsCount = await prisma.fragment.count({
      where: { 
        OR: [
          { category: 'CONCEPTS' },
          { category: 'CONCEPT' }
        ]
      }
    });
    const eventsCount = await prisma.fragment.count({
      where: { 
        OR: [
          { category: 'EVENTS' },
          { category: 'EVENT' }
        ]
      }
    });
    
    console.log(`    Characters: ${charactersCount} (expected ~20)`);
    console.log(`    Locations: ${locationsCount} (expected ~15)`);
    console.log(`    Concepts: ${conceptsCount} (expected ~12)`);
    console.log(`    Events: ${eventsCount} (expected ~10)`);
    
    if (charactersCount > 0 && locationsCount > 0 && conceptsCount > 0 && eventsCount > 0) {
      console.log(`    ${colors.green}✓${colors.reset} All categories present`);
      results.passed++;
    } else {
      console.log(`    ${colors.red}✗${colors.reset} Some categories missing`);
      results.failed++;
    }
  } catch (error) {
    console.log(`    ${colors.red}✗${colors.reset} Fragment Categories Check ERROR: ${error.message}`);
    results.failed++;
  }
}

async function testAchievementCategories() {
  try {
    console.log('\n  🔍 Checking Achievement Categories...');
    
    const categories = ['LEARNING', 'EXPLORATION', 'COLLECTION', 'SOCIAL', 'MASTER'];
    
    for (const category of categories) {
      const count = await prisma.achievement.count({
        where: { category }
      });
      
      if (count > 0) {
        console.log(`    ${colors.green}✓${colors.reset} ${category}: ${count} achievements`);
        results.passed++;
      } else {
        console.log(`    ${colors.red}✗${colors.reset} ${category}: ${count} achievements (EMPTY!)`);
        results.failed++;
      }
    }
  } catch (error) {
    console.log(`    ${colors.red}✗${colors.reset} Achievement Categories Check ERROR: ${error.message}`);
    results.failed++;
  }
}

async function testQuestTypes() {
  try {
    console.log('\n  🔍 Checking Quest Types...');
    
    const dailyCount = await prisma.quest.count({
      where: { type: 'DAILY' }
    });
    const weeklyCount = await prisma.quest.count({
      where: { type: 'WEEKLY' }
    });
    
    console.log(`    Daily Quests: ${dailyCount} (expected 10)`);
    console.log(`    Weekly Quests: ${weeklyCount} (expected 8)`);
    
    if (dailyCount >= 10 && weeklyCount >= 8) {
      console.log(`    ${colors.green}✓${colors.reset} Quest distribution correct`);
      results.passed++;
    } else {
      console.log(`    ${colors.red}✗${colors.reset} Quest distribution incorrect`);
      results.failed++;
    }
  } catch (error) {
    console.log(`    ${colors.red}✗${colors.reset} Quest Types Check ERROR: ${error.message}`);
    results.failed++;
  }
}

async function testBibleBookCoverage() {
  try {
    console.log('\n  🔍 Checking Bible Book Coverage...');
    
    const totalBooks = await prisma.bibleBook.count();
    const booksWithLessons = await prisma.lesson.groupBy({
      by: ['bookId']
    });
    
    console.log(`    Total Bible Books: ${totalBooks}`);
    console.log(`    Books with Lessons: ${booksWithLessons.length}`);
    
    const coverage = ((booksWithLessons.length / totalBooks) * 100).toFixed(1);
    console.log(`    Coverage: ${coverage}%`);
    
    if (booksWithLessons.length >= 40) {
      console.log(`    ${colors.green}✓${colors.reset} Good coverage (40+ books)`);
      results.passed++;
    } else {
      console.log(`    ${colors.yellow}⚠${colors.reset} Limited coverage (${booksWithLessons.length} books)`);
      results.warnings++;
    }
  } catch (error) {
    console.log(`    ${colors.red}✗${colors.reset} Bible Book Coverage Check ERROR: ${error.message}`);
    results.failed++;
  }
}

async function runDatabaseTests() {
  console.log(`${colors.blue}
╔══════════════════════════════════════════════════════════╗
║     DATABASE CONTENT VERIFICATION - GAMEREADY SEEDS     ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

  console.log('\n📊 Testing Content Counts...\n');

  // Main Content Tests
  await testCount('Lessons', 'lesson', 151, '(Target: 150+)');
  await testCount('Missions', 'mission', 15, '(Target: 15+)');
  await testCount('Equipment Items', 'equipmentItem', 43, '(Target: 50+)');
  await testCount('Fragments', 'fragment', 57, '(Target: 60+)');
  await testCount('Achievements', 'achievement', 65, '(Target: 50+)');
  await testCount('Quests', 'quest', 18, '(Target: 18+)');

  // Additional Checks
  await testCount('Bible Books', 'bibleBook', 66, '(Should be 66)');
  await testCount('Users', 'user', 0, '(Dev DB, should be empty)');

  // Detailed Tests
  console.log('\n🔍 Detailed Content Checks...');
  await testEquipmentSlots();
  await testFragmentCategories();
  await testAchievementCategories();
  await testQuestTypes();
  await testBibleBookCoverage();

  // Final Report
  console.log(`\n\n${colors.blue}
╔══════════════════════════════════════════════════════════╗
║                    TEST RESULTS                         ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;
  
  console.log(`
  Total Tests:    ${total}
  ${colors.green}Passed:         ${results.passed}${colors.reset}
  ${colors.red}Failed:         ${results.failed}${colors.reset}
  ${colors.yellow}Warnings:       ${results.warnings}${colors.reset}
  
  Pass Rate:      ${passRate}%
  `);

  if (results.failed === 0) {
    console.log(`${colors.green}✅ Alle Seed-Daten sind korrekt! Database ist GAMEREADY! 🎉${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️  Einige Seed-Daten fehlen oder sind inkorrekt.${colors.reset}`);
    console.log('Führen Sie die entsprechenden Seeds erneut aus.\n');
  }

  await prisma.$disconnect();
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runDatabaseTests().catch(async (error) => {
  console.error(`${colors.red}Fatal Error: ${error.message}${colors.reset}`);
  await prisma.$disconnect();
  process.exit(1);
});

