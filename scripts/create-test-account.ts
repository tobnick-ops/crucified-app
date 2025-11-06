/**
 * Test Account Creation Script
 * 
 * Erstellt einen Test-Account für vollständiges Testing
 * 
 * Usage: tsx scripts/create-test-account.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Erstelle Test-Account...');

  const testEmail = 'test@crucified.app';
  const testPassword = 'Test123456';
  const testName = 'Test-Charakter';

  try {
    // Prüfe ob Test-Account bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (existingUser) {
      console.log('⚠️  Test-Account existiert bereits!');
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: ${testPassword}`);
      console.log('\n   Lösche alten Test-Account...');
      
      // Lösche alten Test-Account und alle zugehörigen Daten
      await prisma.character.deleteMany({
        where: { userId: existingUser.id },
      });
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
      
      console.log('✅ Alter Test-Account gelöscht');
    }

    // Erstelle neuen Test-Account
    const passwordHash = await bcrypt.hash(testPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
      },
    });

    console.log('✅ Test-Account erstellt!');
    console.log('\n📋 Test-Account Details:');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log(`   User ID: ${user.id}`);
    console.log('\n💡 Du kannst dich jetzt mit diesen Daten einloggen!');
    console.log('\n🎯 Nächste Schritte:');
    console.log('   1. Gehe zu http://localhost:3000/signin');
    console.log('   2. Logge dich mit test@crucified.app / Test123456 ein');
    console.log('   3. Erstelle einen Character');
    console.log('   4. Teste alle Features!');

  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Test-Accounts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

