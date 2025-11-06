// Main Seed Script gemäß Masterplan

import { PrismaClient } from '@prisma/client';
import { seedBibleBooks } from './bible-books-seed';
import { seedRabbis } from './rabbis-seed';
import { seedSkills } from './skills-seed';
import { seedLessons } from './lessons-seed';
import { seedMissions } from './missions-seed';
import { seedFragments } from './fragments-seed';
import { seedEquipment } from './equipment-seed';
import { seedSets } from './sets-seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed in order (dependencies first)
    console.log('📚 Seeding Bible Books...');
    await seedBibleBooks();

    console.log('👨‍🏫 Seeding Rabbis...');
    await seedRabbis();

    console.log('🎯 Seeding Skills...');
    await seedSkills();

    console.log('📖 Seeding Lessons...');
    await seedLessons();

    console.log('🎮 Seeding Missions...');
    await seedMissions();

    console.log('🖼️ Seeding Fragments...');
    await seedFragments();

    console.log('⚔️ Seeding Equipment...');
    await seedEquipment();

    console.log('💎 Seeding Equipment Sets...');
    await seedSets();

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

