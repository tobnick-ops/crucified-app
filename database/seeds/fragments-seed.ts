// Fragments Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFragments() {
  // Get books
  const ersteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Mo' },
  });

  const zweiteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '2Mo' },
  });

  const ersteSamuelBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Sam' },
  });

  const matthaeusBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Mt' },
  });

  const johannesBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Joh' },
  });

  const roemerBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Röm' },
  });

  // Character Fragments
  const characters = [
    {
      name: 'Noah',
      book: ersteMoseBook,
      description: 'Noah, der Gerechte, der die Arche baute und die Sintflut überlebte.',
      condition: 'Schließe die Mission "Die Arche bauen" ab',
    },
    {
      name: 'Mose',
      book: zweiteMoseBook,
      description: 'Mose, der Führer Israels, der das Volk aus Ägypten führte.',
      condition: 'Schließe die Mission "Ägypten befreien" ab',
    },
    {
      name: 'David',
      book: ersteSamuelBook,
      description: 'David, der König Israels, der Goliath besiegte.',
      condition: 'Schließe die Mission "David vs. Goliath" ab',
    },
    {
      name: 'Petrus',
      book: matthaeusBook,
      description: 'Petrus, der Fels der Gemeinde, der Jesus nachfolgte.',
      condition: 'Schließe 5 Lektionen aus dem Matthäusevangelium ab',
    },
    {
      name: 'Paulus',
      book: roemerBook,
      description: 'Paulus, der Apostel der Heiden, der die Briefe schrieb.',
      condition: 'Schließe 5 Lektionen aus dem Römerbrief ab',
    },
  ];

  for (const character of characters) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: character.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: character.book?.id || null,
          characterName: character.name,
          description: character.description,
          unlockCondition: character.condition,
          fragmentType: 'character',
        },
      });
    }
  }

  // Location Fragments
  const locations = [
    {
      name: 'Die Arche',
      book: ersteMoseBook,
      description: 'Die Arche Noah, die Rettung vor der Sintflut bot.',
      condition: 'Schließe die Mission "Die Arche bauen" ab',
    },
    {
      name: 'Berg Sinai',
      book: zweiteMoseBook,
      description: 'Der Berg Sinai, wo Mose die Zehn Gebote empfing.',
      condition: 'Schließe 3 Lektionen aus 2. Mose ab',
    },
    {
      name: 'Der Tempel',
      book: matthaeusBook,
      description: 'Der Tempel in Jerusalem, wo Jesus lehrte.',
      condition: 'Schließe 5 Lektionen aus dem Neuen Testament ab',
    },
  ];

  for (const location of locations) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: location.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: location.book?.id || null,
          characterName: location.name,
          description: location.description,
          unlockCondition: location.condition,
          fragmentType: 'location',
        },
      });
    }
  }

  // Concept Fragments
  const concepts = [
    {
      name: 'Gnade',
      book: roemerBook,
      description: 'Die Gnade Gottes, die durch Jesus Christus offenbart wird.',
      condition: 'Schließe 3 Lektionen aus dem Römerbrief ab',
    },
    {
      name: 'Glaube',
      book: roemerBook,
      description: 'Der Glaube, der zur Gerechtigkeit führt.',
      condition: 'Erreiche Level 5',
    },
    {
      name: 'Liebe',
      book: johannesBook,
      description: 'Die Liebe Gottes, die in Jesus Christus offenbart wurde.',
      condition: 'Schließe 3 Lektionen aus dem Johannesevangelium ab',
    },
  ];

  for (const concept of concepts) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: concept.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: concept.book?.id || null,
          characterName: concept.name,
          description: concept.description,
          unlockCondition: concept.condition,
          fragmentType: 'concept',
        },
      });
    }
  }

  console.log('Seeded Fragments successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedFragments()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

