// Lessons Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessons() {
  // Get some books for lessons
  const roemerBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Röm' },
  });

  const matthaeusBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Mt' },
  });

  const zweiteMoseBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '2Mo' },
  });

  const johannesBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Joh' },
  });

  // Create lessons for Römerbrief
  if (roemerBook) {
    const lesson1 = await prisma.lesson.create({
      data: {
        bookId: roemerBook.id,
        title: 'Römerbrief - Kapitel 1: Gottes Gerechtigkeit',
        description: 'Lerne über Gottes Gerechtigkeit und wie sie im Evangelium offenbart wird.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 100,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Evangelium Gottes laut Römer 1:1?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Kraft Gottes zur Rettung',
              optionsJson: JSON.stringify([
                'Die Kraft Gottes zur Rettung',
                'Eine Geschichte über Jesus',
                'Ein Gesetz für alle Menschen',
                'Eine Religion',
              ]),
            },
            {
              questionText: 'Was wird in Römer 1:16-17 über die Gerechtigkeit Gottes gesagt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie wird aus Glauben offenbart',
              optionsJson: JSON.stringify([
                'Sie wird aus Glauben offenbart',
                'Sie wird durch Werke erlangt',
                'Sie ist nur für Juden',
                'Sie ist nicht wichtig',
              ]),
            },
          ],
        },
      },
    });

    const lesson2 = await prisma.lesson.create({
      data: {
        bookId: roemerBook.id,
        title: 'Römerbrief - Kapitel 3: Alle haben gesündigt',
        description: 'Verstehe, dass alle Menschen gesündigt haben und Gottes Gnade brauchen.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt Römer 3:23 über alle Menschen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Alle haben gesündigt',
              optionsJson: JSON.stringify([
                'Alle haben gesündigt',
                'Nur einige haben gesündigt',
                'Niemand hat gesündigt',
                'Es ist nicht wichtig',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for Matthäus
  if (matthaeusBook) {
    await prisma.lesson.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Matthäus - Die Bergpredigt',
        description: 'Lerne die wichtigsten Lehren Jesu aus der Bergpredigt.',
        difficulty: 'medium',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sind die Seligpreisungen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Lehren Jesu über Glückseligkeit',
              optionsJson: JSON.stringify([
                'Lehren Jesu über Glückseligkeit',
                'Gebote für alle Menschen',
                'Regeln für die Gemeinde',
                'Geschichten aus dem Alten Testament',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for 2. Mose
  if (zweiteMoseBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: '2. Mose - Die Zehn Gebote',
        description: 'Lerne die Zehn Gebote und ihre Bedeutung.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 100,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie viele Gebote gab Gott Mose auf dem Berg Sinai?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zehn',
              optionsJson: JSON.stringify(['Zehn', 'Fünf', 'Zwölf', 'Vierzehn']),
            },
          ],
        },
      },
    });
  }

  // Create lessons for Johannes
  if (johannesBook) {
    await prisma.lesson.create({
      data: {
        bookId: johannesBook.id,
        title: 'Johannes - Die Wunder Jesu',
        description: 'Lerne über die Wunder Jesu und ihre Bedeutung.',
        difficulty: 'medium',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war das erste Wunder Jesu laut Johannes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wasser zu Wein verwandeln',
              optionsJson: JSON.stringify([
                'Wasser zu Wein verwandeln',
                'Blinde heilen',
                'Lahme gehen machen',
                'Tote auferwecken',
              ]),
            },
          ],
        },
      },
    });
  }

  console.log('Seeded Lessons successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedLessons()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

