// Missions Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMissions() {
  // Get books and fragments
  const zweiteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '2Mo' },
  });

  const ersteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Mo' },
  });

  const ersteSamuelBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Sam' },
  });

  // Create Fragments first
  let moseFragment = await prisma.fragment.findFirst({
    where: { characterName: 'Mose' },
  });
  if (!moseFragment) {
    moseFragment = await prisma.fragment.create({
      data: {
        bookId: zweiteMoseBook?.id || null,
        characterName: 'Mose',
        description: 'Mose, der Führer Israels, der das Volk aus Ägypten führte und die Zehn Gebote empfing.',
        unlockCondition: 'Schließe die Mission "Ägypten befreien" ab',
        fragmentType: 'character',
      },
    });
  }

  let noahFragment = await prisma.fragment.findFirst({
    where: { characterName: 'Noah' },
  });
  if (!noahFragment) {
    noahFragment = await prisma.fragment.create({
      data: {
        bookId: ersteMoseBook?.id || null,
        characterName: 'Noah',
        description: 'Noah, der Gerechte, der die Arche baute und die Sintflut überlebte.',
        unlockCondition: 'Schließe die Mission "Die Arche bauen" ab',
        fragmentType: 'character',
      },
    });
  }

  let davidFragment = await prisma.fragment.findFirst({
    where: { characterName: 'David' },
  });
  if (!davidFragment) {
    davidFragment = await prisma.fragment.create({
      data: {
        bookId: ersteSamuelBook?.id || null,
        characterName: 'David',
        description: 'David, der König Israels, der Goliath besiegte und ein Mann nach Gottes Herzen war.',
        unlockCondition: 'Schließe die Mission "David vs. Goliath" ab',
        fragmentType: 'character',
      },
    });
  }

  // Create Mission: Ägypten befreien
  if (zweiteMoseBook) {
    const mission1 = await prisma.mission.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: 'Ägypten befreien',
        description: 'Hilf Mose, das Volk Israel aus der Sklaverei in Ägypten zu führen. Sammle Ressourcen und treffe die richtigen Entscheidungen.',
        requiredLevel: 3,
        experienceReward: 200,
        storyCharacterId: moseFragment.id,
        missionType: 'RESOURCE_COLLECTION',
        estimatedDuration: 10,
        objectives: {
          create: [
            {
              objectiveText: 'Sammle 10 Frosch-Plagen',
              objectiveType: 'collect',
              requiredValue: 10,
            },
            {
              objectiveText: 'Sammle 5 Heuschrecken-Plagen',
              objectiveType: 'collect',
              requiredValue: 5,
            },
            {
              objectiveText: 'Interagiere mit Pharao',
              objectiveType: 'interact',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // Create Mission: Die Arche bauen
  if (ersteMoseBook) {
    const mission2 = await prisma.mission.create({
      data: {
        bookId: ersteMoseBook.id,
        title: 'Die Arche bauen',
        description: 'Hilf Noah, die Arche zu bauen. Sammle Holz, Pech und andere Materialien für die Arche.',
        requiredLevel: 2,
        experienceReward: 150,
        storyCharacterId: noahFragment.id,
        missionType: 'RESOURCE_COLLECTION',
        estimatedDuration: 8,
        objectives: {
          create: [
            {
              objectiveText: 'Sammle 20 Holz-Bretter',
              objectiveType: 'collect',
              requiredValue: 20,
            },
            {
              objectiveText: 'Sammle 10 Pech-Behälter',
              objectiveType: 'collect',
              requiredValue: 10,
            },
            {
              objectiveText: 'Interagiere mit Noah',
              objectiveType: 'interact',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // Create Mission: David vs. Goliath
  if (ersteSamuelBook) {
    const mission3 = await prisma.mission.create({
      data: {
        bookId: ersteSamuelBook.id,
        title: 'David vs. Goliath',
        description: 'Hilf David, Goliath zu besiegen. Entscheide dich richtig und vertraue auf Gott.',
        requiredLevel: 5,
        experienceReward: 250,
        storyCharacterId: davidFragment.id,
        missionType: 'STORY_INTERACTION',
        estimatedDuration: 12,
        objectives: {
          create: [
            {
              objectiveText: 'Sammle 5 Steine für die Steinschleuder',
              objectiveType: 'collect',
              requiredValue: 5,
            },
            {
              objectiveText: 'Interagiere mit Goliath',
              objectiveType: 'interact',
              requiredValue: 1,
            },
            {
              objectiveText: 'Interagiere mit Saul',
              objectiveType: 'interact',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  console.log('Seeded Missions successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedMissions()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

