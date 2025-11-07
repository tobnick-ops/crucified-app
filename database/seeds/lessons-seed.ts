// Lessons Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessons() {
  // Delete existing lessons for idempotency
  await prisma.question.deleteMany({});
  await prisma.lesson.deleteMany({});

  // Get books for lessons
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

  const markusBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Mk' },
  });

  const lukasBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Lk' },
  });

  const ersteKorintherBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: '1Kor' },
  });

  const galaterBook = await prisma.bibleBook.findUnique({
    where: { abbreviation: 'Gal' },
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
            {
              questionText: 'Wie wird die Gerechtigkeit erlangt laut Römer 3:22?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch Glauben an Jesus Christus',
              optionsJson: JSON.stringify([
                'Durch Glauben an Jesus Christus',
                'Durch gute Werke',
                'Durch Gebete',
                'Durch Opfergaben',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: roemerBook.id,
        title: 'Römerbrief - Kapitel 5: Rechtfertigung durch Glauben',
        description: 'Lerne über die Rechtfertigung durch Glauben und die Versöhnung mit Gott.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist der Lohn der Sünde laut Römer 6:23?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Tod',
              optionsJson: JSON.stringify([
                'Der Tod',
                'Krankheit',
                'Armut',
                'Einsamkeit',
              ]),
            },
            {
              questionText: 'Was ist die Gabe Gottes in Römer 6:23?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ewiges Leben in Christus Jesus',
              optionsJson: JSON.stringify([
                'Ewiges Leben in Christus Jesus',
                'Reichtum',
                'Gesundheit',
                'Erfolg',
              ]),
            },
            {
              questionText: 'Durch wen haben wir Frieden mit Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch unseren Herrn Jesus Christus',
              optionsJson: JSON.stringify([
                'Durch unseren Herrn Jesus Christus',
                'Durch gute Taten',
                'Durch Gebete',
                'Durch Fasten',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: roemerBook.id,
        title: 'Römerbrief - Kapitel 8: Leben im Geist',
        description: 'Verstehe das Leben im Geist und die Freiheit von der Sünde.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt Römer 8:1 über die in Christus Jesus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Es gibt keine Verdammnis',
              optionsJson: JSON.stringify([
                'Es gibt keine Verdammnis',
                'Sie sind reich',
                'Sie sind weise',
                'Sie sind mächtig',
              ]),
            },
            {
              questionText: 'Wer hilft uns in unserer Schwachheit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Heilige Geist',
              optionsJson: JSON.stringify([
                'Der Heilige Geist',
                'Engel',
                'Menschen',
                'Unsere eigene Kraft',
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
            {
              questionText: 'Was lehrte Jesus über das Gebet in Matthäus 6?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Vaterunser',
              optionsJson: JSON.stringify([
                'Das Vaterunser',
                'Viele Worte',
                'Lautes Schreien',
                'Komplizierte Rituale',
              ]),
            },
            {
              questionText: 'Was sagt Jesus über Sorgen in Matthäus 6?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sorgt euch nicht um morgen',
              optionsJson: JSON.stringify([
                'Sorgt euch nicht um morgen',
                'Sorgt euch um alles',
                'Sorgt euch nur um Geld',
                'Sorgt euch um eure Feinde',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Matthäus - Die Gleichnisse Jesu',
        description: 'Lerne die Gleichnisse Jesu und ihre Bedeutung.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Gleichnis vom Sämann?',
              questionType: 'multiple_choice',
              correctAnswer: 'Eine Lehre über das Hören des Wortes',
              optionsJson: JSON.stringify([
                'Eine Lehre über das Hören des Wortes',
                'Eine Geschichte über Landwirtschaft',
                'Ein Märchen',
                'Eine Prophezeiung',
              ]),
            },
            {
              questionText: 'Was lehrt das Gleichnis vom verlorenen Sohn?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes Barmherzigkeit und Vergebung',
              optionsJson: JSON.stringify([
                'Gottes Barmherzigkeit und Vergebung',
                'Die Wichtigkeit von Geld',
                'Familienkonflikte',
                'Landwirtschaft',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Matthäus - Passion und Auferstehung',
        description: 'Lerne über das Leiden, den Tod und die Auferstehung Jesu.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 220,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was geschah am Karfreitag?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus wurde gekreuzigt',
              optionsJson: JSON.stringify([
                'Jesus wurde gekreuzigt',
                'Jesus wurde geboren',
                'Jesus wurde getauft',
                'Jesus fuhr in den Himmel',
              ]),
            },
            {
              questionText: 'Was geschah am Ostersonntag?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus ist auferstanden',
              optionsJson: JSON.stringify([
                'Jesus ist auferstanden',
                'Jesus wurde gekreuzigt',
                'Jesus wurde geboren',
                'Jesus wurde getauft',
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
            {
              questionText: 'Was ist das erste Gebot?',
              questionType: 'multiple_choice',
              correctAnswer: 'Du sollst keine anderen Götter neben mir haben',
              optionsJson: JSON.stringify([
                'Du sollst keine anderen Götter neben mir haben',
                'Du sollst nicht stehlen',
                'Du sollst nicht töten',
                'Du sollst deine Eltern ehren',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: '2. Mose - Der Bund am Sinai',
        description: 'Lerne über den Bund, den Gott mit dem Volk Israel schloss.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war der Bund am Sinai?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein Vertrag zwischen Gott und dem Volk Israel',
              optionsJson: JSON.stringify([
                'Ein Vertrag zwischen Gott und dem Volk Israel',
                'Ein Friedensvertrag',
                'Ein Handelsabkommen',
                'Ein Kriegsbündnis',
              ]),
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
            {
              questionText: 'Was geschah bei der Speisung der 5000?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus vermehrte 5 Brote und 2 Fische',
              optionsJson: JSON.stringify([
                'Jesus vermehrte 5 Brote und 2 Fische',
                'Jesus kaufte mehr Essen',
                'Die Leute brachten eigenes Essen',
                'Jesus betete und Essen fiel vom Himmel',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: johannesBook.id,
        title: 'Johannes - Die Ich-bin-Worte',
        description: 'Lerne die sieben Ich-bin-Worte Jesu und ihre Bedeutung.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das erste Ich-bin-Wort Jesu?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ich bin das Brot des Lebens',
              optionsJson: JSON.stringify([
                'Ich bin das Brot des Lebens',
                'Ich bin das Licht der Welt',
                'Ich bin die Tür',
                'Ich bin der gute Hirte',
              ]),
            },
            {
              questionText: 'Was bedeutet "Ich bin der gute Hirte"?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus führt und beschützt seine Schafe',
              optionsJson: JSON.stringify([
                'Jesus führt und beschützt seine Schafe',
                'Jesus ist ein Bauer',
                'Jesus mag Tiere',
                'Jesus ist ein König',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: johannesBook.id,
        title: 'Johannes - Die Auferstehung',
        description: 'Lerne über die Auferstehung Jesu und die Erscheinungen.',
        difficulty: 'hard',
        requiredLevel: 9,
        experienceReward: 230,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer war der erste Zeuge der Auferstehung?',
              questionType: 'multiple_choice',
              correctAnswer: 'Maria Magdalena',
              optionsJson: JSON.stringify([
                'Maria Magdalena',
                'Petrus',
                'Johannes',
                'Thomas',
              ]),
            },
            {
              questionText: 'Was sagte Jesus zu Thomas?',
              questionType: 'multiple_choice',
              correctAnswer: 'Selig sind, die nicht sehen und doch glauben',
              optionsJson: JSON.stringify([
                'Selig sind, die nicht sehen und doch glauben',
                'Du bist verurteilt',
                'Du musst es sehen',
                'Glaube ist unwichtig',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for Markus
  if (markusBook) {
    await prisma.lesson.create({
      data: {
        bookId: markusBook.id,
        title: 'Markus - Das Wirken Jesu',
        description: 'Lerne über das Wirken Jesu und seine Taten.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 140,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was kennzeichnet das Markusevangelium?',
              questionType: 'multiple_choice',
              correctAnswer: 'Viele Wunder und Taten Jesu',
              optionsJson: JSON.stringify([
                'Viele Wunder und Taten Jesu',
                'Lange Reden',
                'Gleichnisse',
                'Prophetien',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for Lukas
  if (lukasBook) {
    await prisma.lesson.create({
      data: {
        bookId: lukasBook.id,
        title: 'Lukas - Die Geburt Jesu',
        description: 'Lerne über die Geburt Jesu und die Weihnachtsgeschichte.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 110,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wo wurde Jesus geboren?',
              questionType: 'multiple_choice',
              correctAnswer: 'In Bethlehem',
              optionsJson: JSON.stringify([
                'In Bethlehem',
                'In Jerusalem',
                'In Nazareth',
                'In Galiläa',
              ]),
            },
            {
              questionText: 'Wer erschien den Hirten?',
              questionType: 'multiple_choice',
              correctAnswer: 'Engel',
              optionsJson: JSON.stringify([
                'Engel',
                'Könige',
                'Propheten',
                'Priester',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: lukasBook.id,
        title: 'Lukas - Barmherzigkeit und Vergebung',
        description: 'Lerne über die Barmherzigkeit Jesu und Vergebung.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was lehrt das Gleichnis vom barmherzigen Samariter?',
              questionType: 'multiple_choice',
              correctAnswer: 'Liebe deinen Nächsten wie dich selbst',
              optionsJson: JSON.stringify([
                'Liebe deinen Nächsten wie dich selbst',
                'Ignoriere deine Feinde',
                'Hilfe nur für Freunde',
                'Geld ist wichtig',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for 1. Korinther
  if (ersteKorintherBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteKorintherBook.id,
        title: '1. Korinther - Die Liebe',
        description: 'Lerne über die größte Gabe: die Liebe (1. Korinther 13).',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist die größte Gabe laut 1. Korinther 13?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Liebe',
              optionsJson: JSON.stringify([
                'Die Liebe',
                'Der Glaube',
                'Die Hoffnung',
                'Die Weisheit',
              ]),
            },
            {
              questionText: 'Was sagt Paulus über die Liebe?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie ist langmütig und freundlich',
              optionsJson: JSON.stringify([
                'Sie ist langmütig und freundlich',
                'Sie ist schnell und streng',
                'Sie ist egoistisch',
                'Sie ist oberflächlich',
              ]),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteKorintherBook.id,
        title: '1. Korinther - Die Auferstehung',
        description: 'Lerne über die Auferstehung und die Hoffnung.',
        difficulty: 'hard',
        requiredLevel: 10,
        experienceReward: 240,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt Paulus über die Auferstehung?',
              questionType: 'multiple_choice',
              correctAnswer: 'Christus ist auferstanden als Erstling',
              optionsJson: JSON.stringify([
                'Christus ist auferstanden als Erstling',
                'Es gibt keine Auferstehung',
                'Nur einige werden auferstehen',
                'Auferstehung ist unwichtig',
              ]),
            },
          ],
        },
      },
    });
  }

  // Create lessons for Galater
  if (galaterBook) {
    await prisma.lesson.create({
      data: {
        bookId: galaterBook.id,
        title: 'Galater - Freiheit in Christus',
        description: 'Lerne über die Freiheit in Christus und das Gesetz.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt Paulus über die Freiheit in Christus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zur Freiheit hat uns Christus befreit',
              optionsJson: JSON.stringify([
                'Zur Freiheit hat uns Christus befreit',
                'Wir sind noch im Gesetz',
                'Freiheit ist unwichtig',
                'Gesetz ist wichtiger',
              ]),
            },
            {
              questionText: 'Was sind die Früchte des Geistes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Liebe, Freude, Friede, Geduld...',
              optionsJson: JSON.stringify([
                'Liebe, Freude, Friede, Geduld...',
                'Reichtum, Macht, Erfolg',
                'Gesetze, Regeln, Vorschriften',
                'Opfer, Rituale, Zeremonien',
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

