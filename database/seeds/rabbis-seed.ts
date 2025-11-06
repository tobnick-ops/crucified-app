// Rabbis Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRabbis() {
  // Find starting books
  const roemerBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Röm' },
  });

  const matthaeusBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Mt' },
  });

  const zweiteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '2Mo' },
  });

  const ersteSamuelBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Sam' },
  });

  // Create Rabbis (check if exists first, then create)
  let paulusRabbi = await prisma.rabbi.findFirst({
    where: { name: 'Paulus' },
  });
  if (!paulusRabbi) {
    paulusRabbi = await prisma.rabbi.create({
      data: {
        name: 'Paulus',
        description: 'Apostel der Heiden, Meister der Briefe und Gemeindebau. Start-Pfad: Briefe verstehen und Gemeinden bauen.',
        startingBookId: roemerBook?.id || null,
      },
    });
  }

  let petrusRabbi = await prisma.rabbi.findFirst({
    where: { name: 'Petrus' },
  });
  if (!petrusRabbi) {
    petrusRabbi = await prisma.rabbi.create({
      data: {
        name: 'Petrus',
        description: 'Fels der Gemeinde, Fischer der Menschen. Start-Pfad: Gemeindeleitung und Jüngerschaft.',
        startingBookId: matthaeusBook?.id || null,
      },
    });
  }

  let moseRabbi = await prisma.rabbi.findFirst({
    where: { name: 'Mose' },
  });
  if (!moseRabbi) {
    moseRabbi = await prisma.rabbi.create({
      data: {
        name: 'Mose',
        description: 'Führer Israels, Gesetzgeber. Start-Pfad: Weisheit und Führung durch Gottes Gesetz.',
        startingBookId: zweiteMoseBook?.id || null,
      },
    });
  }

  let davidRabbi = await prisma.rabbi.findFirst({
    where: { name: 'David' },
  });
  if (!davidRabbi) {
    davidRabbi = await prisma.rabbi.create({
      data: {
        name: 'David',
        description: 'König Israels, Mann nach Gottes Herzen. Start-Pfad: Anbetung und Führung.',
        startingBookId: ersteSamuelBook?.id || null,
      },
    });
  }

  console.log('Seeded 4 Rabbis successfully');
  
  return { paulusRabbi, petrusRabbi, moseRabbi, davidRabbi };
}

// Allow standalone execution
if (require.main === module) {
  seedRabbis()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

