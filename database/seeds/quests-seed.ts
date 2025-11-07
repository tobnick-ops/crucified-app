// Quests Seed - Daily & Weekly Quests
// 6 Quests pro Woche (3 Daily rotating, 3 Weekly)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedQuests() {
  console.log('Starting Quests Seed...');

  // ========== DAILY QUESTS (Pool von 10, rotieren täglich) ==========
  const dailyQuests = [
    {
      type: 'DAILY',
      title: 'Tägliche Lektion',
      description: 'Schließe 1 Lektion heute ab.',
      requirement: JSON.stringify({ type: 'complete_lessons', value: 1 }),
      rewardXp: 50,
      rewardGold: 10,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Lerneifer',
      description: 'Schließe 3 Lektionen heute ab.',
      requirement: JSON.stringify({ type: 'complete_lessons', value: 3 }),
      rewardXp: 150,
      rewardGold: 30,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Vollgas',
      description: 'Schließe 5 Lektionen heute ab (Tageslimit).',
      requirement: JSON.stringify({ type: 'complete_lessons', value: 5 }),
      rewardXp: 300,
      rewardGold: 50,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Abenteuerlustig',
      description: 'Schließe 1 Mission heute ab.',
      requirement: JSON.stringify({ type: 'complete_missions', value: 1 }),
      rewardXp: 100,
      rewardGold: 20,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Perfektionist',
      description: 'Beantworte alle Fragen einer Lektion richtig.',
      requirement: JSON.stringify({ type: 'perfect_lesson', value: 1 }),
      rewardXp: 100,
      rewardGold: 15,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Sammler',
      description: 'Schalte 1 Fragment frei.',
      requirement: JSON.stringify({ type: 'unlock_fragment', value: 1 }),
      rewardXp: 75,
      rewardGold: 15,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Ausrüster',
      description: 'Rüste ein neues Equipment-Item aus.',
      requirement: JSON.stringify({ type: 'equip_item', value: 1 }),
      rewardXp: 50,
      rewardGold: 10,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Skill-Jäger',
      description: 'Schalte einen neuen Skill frei.',
      requirement: JSON.stringify({ type: 'unlock_skill', value: 1 }),
      rewardXp: 100,
      rewardGold: 20,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Streaker',
      description: 'Behalte deinen Login-Streak.',
      requirement: JSON.stringify({ type: 'maintain_streak', value: 1 }),
      rewardXp: 25,
      rewardGold: 5,
      isActive: true,
    },
    {
      type: 'DAILY',
      title: 'Vielseitig',
      description: 'Schließe 2 Lektionen und 1 Mission ab.',
      requirement: JSON.stringify({ type: 'lessons_and_missions', lessons: 2, missions: 1 }),
      rewardXp: 200,
      rewardGold: 40,
      isActive: true,
    },
  ];

  // ========== WEEKLY QUESTS (Pool von 8, rotieren wöchentlich) ==========
  const weeklyQuests = [
    {
      type: 'WEEKLY',
      title: 'Wöchentlicher Gelehrter',
      description: 'Schließe 15 Lektionen diese Woche ab.',
      requirement: JSON.stringify({ type: 'complete_lessons', value: 15 }),
      rewardXp: 500,
      rewardGold: 100,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Wöchentlicher Abenteurer',
      description: 'Schließe 3 Missionen diese Woche ab.',
      requirement: JSON.stringify({ type: 'complete_missions', value: 3 }),
      rewardXp: 400,
      rewardGold: 80,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Perfekte Woche',
      description: 'Erfülle dein tägliches Ziel an 7 Tagen.',
      requirement: JSON.stringify({ type: 'daily_goal_streak', value: 7 }),
      rewardXp: 700,
      rewardGold: 150,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Fragment-Jäger',
      description: 'Schalte 5 Fragmente diese Woche frei.',
      requirement: JSON.stringify({ type: 'unlock_fragments', value: 5 }),
      rewardXp: 300,
      rewardGold: 60,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Ausrüstungs-Upgrade',
      description: 'Erhalte 3 neue Equipment-Items.',
      requirement: JSON.stringify({ type: 'obtain_equipment', value: 3 }),
      rewardXp: 250,
      rewardGold: 50,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'XP-Jäger',
      description: 'Verdiene 2000 XP diese Woche.',
      requirement: JSON.stringify({ type: 'earn_xp', value: 2000 }),
      rewardXp: 400,
      rewardGold: 80,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Skill-Meister',
      description: 'Schalte 3 neue Skills frei.',
      requirement: JSON.stringify({ type: 'unlock_skills', value: 3 }),
      rewardXp: 600,
      rewardGold: 120,
      isActive: true,
    },
    {
      type: 'WEEKLY',
      title: 'Soziale Woche',
      description: 'Füge 2 Freunde hinzu und gewinne 1 Challenge.',
      requirement: JSON.stringify({ type: 'social_activity', friends: 2, challenges: 1 }),
      rewardXp: 500,
      rewardGold: 100,
      isActive: true,
    },
  ];

  console.log('Creating Daily Quests...');
  for (const quest of dailyQuests) {
    await prisma.quest.upsert({
      where: { id: `daily-${quest.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `daily-${quest.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...quest,
      },
    });
  }

  console.log('Creating Weekly Quests...');
  for (const quest of weeklyQuests) {
    await prisma.quest.upsert({
      where: { id: `weekly-${quest.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `weekly-${quest.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...quest,
      },
    });
  }

  console.log('✅ Quests Seed Complete!');
  console.log(`\nSummary:`);
  console.log(`  Daily Quests Pool: ${dailyQuests.length} quests`);
  console.log(`  Weekly Quests Pool: ${weeklyQuests.length} quests`);
  console.log(`  TOTAL: ${dailyQuests.length + weeklyQuests.length} quests`);
  console.log(`\nDaily: 3 random quests rotate each day`);
  console.log(`Weekly: 3 random quests rotate each week`);
}

// Allow standalone execution
if (require.main === module) {
  seedQuests()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

