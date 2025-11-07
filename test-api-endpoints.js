// Schneller API-Test für GAMEREADY Features
// Testet alle kritischen Endpunkte ohne Browser

const BASE_URL = 'http://localhost:3000';

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
  warnings: 0,
  tests: []
};

async function testEndpoint(name, path, expectedStatus = 200, options = {}) {
  try {
    console.log(`\n${colors.blue}Testing:${colors.reset} ${name}`);
    console.log(`  URL: ${BASE_URL}${path}`);
    
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const status = response.status;
    const isSuccess = status === expectedStatus;
    
    if (isSuccess) {
      console.log(`  ${colors.green}✓ Status: ${status}${colors.reset}`);
      results.passed++;
    } else {
      console.log(`  ${colors.red}✗ Status: ${status} (expected ${expectedStatus})${colors.reset}`);
      results.failed++;
    }
    
    // Try to get response body
    let body;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
      console.log(`  Response Preview: ${JSON.stringify(body).substring(0, 100)}...`);
    }
    
    results.tests.push({
      name,
      path,
      status,
      passed: isSuccess,
      body: body ? JSON.stringify(body).substring(0, 200) : 'N/A'
    });
    
    return { response, body, passed: isSuccess };
  } catch (error) {
    console.log(`  ${colors.red}✗ Error: ${error.message}${colors.reset}`);
    results.failed++;
    results.tests.push({
      name,
      path,
      status: 'ERROR',
      passed: false,
      error: error.message
    });
    return { error, passed: false };
  }
}

async function runTests() {
  console.log(`${colors.blue}
╔══════════════════════════════════════════════════════════╗
║     CRUCIFIED APP - GAMEREADY API TEST SUITE           ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

  console.log('\n🔍 Testing Server Availability...');
  const serverCheck = await testEndpoint('Server Health Check', '/', 200);
  
  if (!serverCheck.passed) {
    console.log(`\n${colors.red}❌ Server ist nicht erreichbar auf ${BASE_URL}${colors.reset}`);
    console.log('Bitte stellen Sie sicher, dass der Dev-Server läuft: npm run dev');
    process.exit(1);
  }

  console.log('\n\n📋 TESTING PAGE ROUTES...');
  
  // Kritische Pages
  await testEndpoint('Dashboard Page', '/dashboard', 200);
  await testEndpoint('Achievements Page', '/achievements', 200);
  await testEndpoint('Quests Page', '/quests', 200);
  await testEndpoint('Settings Page', '/settings', 200);
  await testEndpoint('Friends Page', '/social/friends', 200);
  await testEndpoint('Lessons Page', '/lessons', 200);
  await testEndpoint('Missions Page', '/missions', 200);
  await testEndpoint('Character Page', '/character', 200);
  
  console.log('\n\n🔌 TESTING API ENDPOINTS...');
  
  // Note: Diese Tests erfordern Authentication - werden wahrscheinlich 401 oder 307 (Redirect) zurückgeben
  await testEndpoint('API: Achievements', '/api/achievements', [200, 401, 307]);
  await testEndpoint('API: Quests', '/api/quests', [200, 401, 307]);
  await testEndpoint('API: User Preferences', '/api/user/preferences', [200, 401, 307]);
  await testEndpoint('API: Friends', '/api/social/friends', [200, 401, 307]);
  
  console.log('\n\n📊 TESTING DATABASE CONTENT...');
  
  // Diese Tests prüfen, ob die Seeds funktioniert haben
  const dbTests = {
    lessons: { expected: 151, table: 'lessons' },
    missions: { expected: 15, table: 'missions' },
    equipment: { expected: 43, table: 'equipment_items' },
    fragments: { expected: 57, table: 'fragments' },
    achievements: { expected: 65, table: 'achievements' },
    quests: { expected: 18, table: 'quests' }
  };
  
  console.log(`\n${colors.yellow}ℹ️  Database content verification requires Prisma Client${colors.reset}`);
  console.log('Run this separately: node test-database-content.js\n');

  // Final Report
  console.log(`\n\n${colors.blue}
╔══════════════════════════════════════════════════════════╗
║                    TEST RESULTS                         ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

  const total = results.passed + results.failed;
  const passRate = ((results.passed / total) * 100).toFixed(1);
  
  console.log(`
  Total Tests:    ${total}
  ${colors.green}Passed:         ${results.passed}${colors.reset}
  ${colors.red}Failed:         ${results.failed}${colors.reset}
  ${colors.yellow}Warnings:       ${results.warnings}${colors.reset}
  
  Pass Rate:      ${passRate}%
  `);

  if (results.passed === total) {
    console.log(`${colors.green}✓ Alle Tests bestanden! 🎉${colors.reset}\n`);
  } else {
    console.log(`${colors.yellow}⚠️  Einige Tests sind fehlgeschlagen.${colors.reset}`);
    console.log('Überprüfen Sie die Ausgabe oben für Details.\n');
  }

  // Detailed Results
  console.log('\n📝 Detailed Results:\n');
  results.tests.forEach((test, i) => {
    const icon = test.passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
    console.log(`  ${icon} ${test.name}`);
    console.log(`     Path: ${test.path}`);
    console.log(`     Status: ${test.status}`);
    if (test.error) {
      console.log(`     Error: ${test.error}`);
    }
  });

  console.log('\n');
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal Error: ${error.message}${colors.reset}`);
  process.exit(1);
});

