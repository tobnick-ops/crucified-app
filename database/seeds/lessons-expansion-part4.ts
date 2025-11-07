// Lessons EXPANSION Part 4 - Hebräer & Katholische Briefe
// Systematische Fortsetzung: 15 Lektionen

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart4() {
  console.log('Starting Lesson Expansion Part 4: Hebräer & Katholische Briefe...');

  // HEBRÄER (5 Lektionen)
  const hebraeerBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Hebr' } });
  if (hebraeerBook) {
    await prisma.lesson.create({
      data: {
        bookId: hebraeerBook.id,
        title: 'Hebräer - Christus ist größer',
        description: 'Verstehe, dass Christus größer ist als Engel, Mose und das Gesetz.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer ist Christus laut Hebräer 1?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Abglanz der Herrlichkeit Gottes',
              optionsJson: JSON.stringify(['Der Abglanz der Herrlichkeit Gottes', 'Ein Prophet', 'Ein Engel', 'Ein guter Mensch']),
            },
            {
              questionText: 'Warum ist Christus größer als die Engel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er ist der Sohn Gottes',
              optionsJson: JSON.stringify(['Er ist der Sohn Gottes', 'Er ist stärker', 'Er ist weiser', 'Er ist älter']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hebraeerBook.id,
        title: 'Hebräer - Der Hohepriester',
        description: 'Lerne über Jesus als unseren ewigen Hohepriester.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Nach welcher Ordnung ist Jesus Hohepriester?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nach der Ordnung Melchisedeks',
              optionsJson: JSON.stringify(['Nach der Ordnung Melchisedeks', 'Nach der Ordnung Aarons', 'Nach der Ordnung Moses', 'Nach der Ordnung Davids']),
            },
            {
              questionText: 'Was hat Jesus als Hohepriester geopfert?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sich selbst',
              optionsJson: JSON.stringify(['Sich selbst', 'Ein Lamm', 'Einen Stier', 'Gold']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hebraeerBook.id,
        title: 'Hebräer - Die Glaubenshelden',
        description: 'Lerne von den Glaubenshelden des Alten Testaments.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Glaube laut Hebräer 11?',
              questionType: 'multiple_choice',
              correctAnswer: 'Eine feste Zuversicht auf das, was man hofft',
              optionsJson: JSON.stringify(['Eine feste Zuversicht auf das, was man hofft', 'Nur Hoffnung', 'Nur Wissen', 'Nur Gefühl']),
            },
            {
              questionText: 'Durch was wurde Abel Gott wohlgefällig?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch den Glauben',
              optionsJson: JSON.stringify(['Durch den Glauben', 'Durch Werke', 'Durch Opfer', 'Durch Reichtum']),
            },
            {
              questionText: 'Was taten die Glaubenshelden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie vertrauten Gott trotz Verfolgung',
              optionsJson: JSON.stringify(['Sie vertrauten Gott trotz Verfolgung', 'Sie wurden reich', 'Sie herrschten', 'Sie lebten in Frieden']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hebraeerBook.id,
        title: 'Hebräer - Der Neue Bund',
        description: 'Verstehe den neuen und besseren Bund in Christus.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist am neuen Bund besser?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er ist auf besseren Verheißungen gegründet',
              optionsJson: JSON.stringify(['Er ist auf besseren Verheißungen gegründet', 'Er hat mehr Regeln', 'Er ist strenger', 'Er ist älter']),
            },
            {
              questionText: 'Wo schreibt Gott das Gesetz im neuen Bund?',
              questionType: 'multiple_choice',
              correctAnswer: 'In unsere Herzen',
              optionsJson: JSON.stringify(['In unsere Herzen', 'Auf Steintafeln', 'In Bücher', 'Nirgendwo']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hebraeerBook.id,
        title: 'Hebräer - Ermahnung zur Ausdauer',
        description: 'Lerne, im Glauben auszuharren.',
        difficulty: 'hard',
        requiredLevel: 9,
        experienceReward: 220,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Auf wen sollen wir schauen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf Jesus, den Anfänger und Vollender des Glaubens',
              optionsJson: JSON.stringify(['Auf Jesus, den Anfänger und Vollender des Glaubens', 'Auf uns selbst', 'Auf andere Menschen', 'Auf die Welt']),
            },
            {
              questionText: 'Warum sollen wir nicht müde werden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil Jesus das Kreuz erduldete und zur Rechten Gottes sitzt',
              optionsJson: JSON.stringify(['Weil Jesus das Kreuz erduldete und zur Rechten Gottes sitzt', 'Weil es einfach ist', 'Weil wir stark sind', 'Ohne Grund']),
            },
          ],
        },
      },
    });
  }

  // JAKOBUS (3 Lektionen)
  const jakobusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jak' } });
  if (jakobusBook) {
    await prisma.lesson.create({
      data: {
        bookId: jakobusBook.id,
        title: 'Jakobus - Glaube und Werke',
        description: 'Verstehe das Verhältnis von Glaube und Werken.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Glaube ohne Werke?',
              questionType: 'multiple_choice',
              correctAnswer: 'Tot',
              optionsJson: JSON.stringify(['Tot', 'Lebendig', 'Perfekt', 'Ausreichend']),
            },
            {
              questionText: 'Welches Beispiel gibt Jakobus für lebendigen Glauben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Abraham, der Isaak opfern wollte',
              optionsJson: JSON.stringify(['Abraham, der Isaak opfern wollte', 'Mose am Berg', 'David und Goliath', 'Noah und die Arche']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jakobusBook.id,
        title: 'Jakobus - Die Zunge bändigen',
        description: 'Lerne über die Macht der Zunge.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist die Zunge?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein kleines Glied, aber kann großen Schaden anrichten',
              optionsJson: JSON.stringify(['Ein kleines Glied, aber kann großen Schaden anrichten', 'Unwichtig', 'Immer gut', 'Immer harmlos']),
            },
            {
              questionText: 'Womit vergleicht Jakobus die Zunge?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mit einem kleinen Feuer, das einen ganzen Wald anzündet',
              optionsJson: JSON.stringify(['Mit einem kleinen Feuer, das einen ganzen Wald anzündet', 'Mit Wasser', 'Mit Wind', 'Mit Erde']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jakobusBook.id,
        title: 'Jakobus - Geduld und Gebet',
        description: 'Lerne über Geduld im Leiden und die Kraft des Gebets.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir im Leiden tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Geduldig sein bis zur Wiederkunft des Herrn',
              optionsJson: JSON.stringify(['Geduldig sein bis zur Wiederkunft des Herrn', 'Aufgeben', 'Klagen', 'Fliehen']),
            },
            {
              questionText: 'Was vermag das Gebet eines Gerechten?',
              questionType: 'multiple_choice',
              correctAnswer: 'Viel, wenn es ernstlich ist',
              optionsJson: JSON.stringify(['Viel, wenn es ernstlich ist', 'Nichts', 'Wenig', 'Es ist unwichtig']),
            },
          ],
        },
      },
    });
  }

  // 1. PETRUS (2 Lektionen)
  const erstePetrusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Pet' } });
  if (erstePetrusBook) {
    await prisma.lesson.create({
      data: {
        bookId: erstePetrusBook.id,
        title: '1. Petrus - Lebendige Hoffnung',
        description: 'Lerne über die lebendige Hoffnung durch die Auferstehung.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist unsere lebendige Hoffnung?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch die Auferstehung Jesu von den Toten',
              optionsJson: JSON.stringify(['Durch die Auferstehung Jesu von den Toten', 'Durch Reichtum', 'Durch Macht', 'Durch Wissen']),
            },
            {
              questionText: 'Was erben Christen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein unvergängliches Erbe im Himmel',
              optionsJson: JSON.stringify(['Ein unvergängliches Erbe im Himmel', 'Geld', 'Land', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: erstePetrusBook.id,
        title: '1. Petrus - Ein heiliges Volk',
        description: 'Verstehe, dass Christen ein heiliges, königliches Priestertum sind.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sind Christen laut Petrus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein auserwähltes Geschlecht, ein königliches Priestertum',
              optionsJson: JSON.stringify(['Ein auserwähltes Geschlecht, ein königliches Priestertum', 'Normale Menschen', 'Sünder', 'Unwichtig']),
            },
            {
              questionText: 'Wozu wurden wir berufen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Tugenden dessen zu verkünden, der uns aus der Finsternis rief',
              optionsJson: JSON.stringify(['Die Tugenden dessen zu verkünden, der uns aus der Finsternis rief', 'Zum Reichtum', 'Zur Macht', 'Zum Ruhm']),
            },
          ],
        },
      },
    });
  }

  // 2. PETRUS (2 Lektionen)
  const zweitePetrusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Pet' } });
  if (zweitePetrusBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweitePetrusBook.id,
        title: '2. Petrus - Leiden für Christus',
        description: 'Lerne über das Leiden um Christi willen.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir tun, wenn wir leiden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Uns freuen, dass wir mit Christus leiden',
              optionsJson: JSON.stringify(['Uns freuen, dass wir mit Christus leiden', 'Verzweifeln', 'Aufgeben', 'Fliehen']),
            },
            {
              questionText: 'Was ist die Belohnung für das Leiden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Herrlichkeit bei der Offenbarung Christi',
              optionsJson: JSON.stringify(['Herrlichkeit bei der Offenbarung Christi', 'Reichtum', 'Macht', 'Ruhm']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweitePetrusBook.id,
        title: '2. Petrus - Wachstum im Glauben',
        description: 'Verstehe, wie man im Glauben wächst.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir zu unserem Glauben hinzufügen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Tugend, Erkenntnis, Selbstbeherrschung, Geduld, Liebe',
              optionsJson: JSON.stringify(['Tugend, Erkenntnis, Selbstbeherrschung, Geduld, Liebe', 'Reichtum', 'Macht', 'Nichts']),
            },
            {
              questionText: 'Was bewirkt Wachstum im Glauben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass wir nicht müßig und unfruchtbar sind',
              optionsJson: JSON.stringify(['Dass wir nicht müßig und unfruchtbar sind', 'Dass wir reich werden', 'Dass wir mächtig werden', 'Nichts']),
            },
          ],
        },
      },
    });
  }

  // 1./2./3. JOHANNES (3 Lektionen)
  const ersteJohannesBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Joh' } });
  if (ersteJohannesBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteJohannesBook.id,
        title: '1. Johannes - Gott ist Licht',
        description: 'Lerne, dass Gott Licht ist und keine Finsternis in ihm ist.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Gott laut Johannes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Licht, und keine Finsternis ist in ihm',
              optionsJson: JSON.stringify(['Licht, und keine Finsternis ist in ihm', 'Nur Liebe', 'Nur Macht', 'Nur Wissen']),
            },
            {
              questionText: 'Was geschieht, wenn wir im Licht wandeln?',
              questionType: 'multiple_choice',
              correctAnswer: 'Haben wir Gemeinschaft untereinander und das Blut Jesu reinigt uns',
              optionsJson: JSON.stringify(['Haben wir Gemeinschaft untereinander und das Blut Jesu reinigt uns', 'Werden wir reich', 'Werden wir mächtig', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteJohannesBook.id,
        title: '1. Johannes - Gott ist Liebe',
        description: 'Verstehe, dass Gott Liebe ist und wir einander lieben sollen.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Liebe',
              optionsJson: JSON.stringify(['Liebe', 'Nur Macht', 'Nur Gericht', 'Nur Wissen']),
            },
            {
              questionText: 'Wie hat Gott seine Liebe gezeigt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er sandte seinen Sohn als Versöhnung für unsere Sünden',
              optionsJson: JSON.stringify(['Er sandte seinen Sohn als Versöhnung für unsere Sünden', 'Er gab uns Reichtum', 'Er gab uns Macht', 'Er gab uns Wissen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteJohannesBook.id,
        title: '1. Johannes - Der Antichrist',
        description: 'Lerne über die Warnung vor dem Antichristen.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist der Geist des Antichristen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Leugnet, dass Jesus Christus im Fleisch gekommen ist',
              optionsJson: JSON.stringify(['Leugnet, dass Jesus Christus im Fleisch gekommen ist', 'Liebt Gott', 'Folgt Christus', 'Dient der Gemeinde']),
            },
            {
              questionText: 'Wie überwinden wir den Antichristen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch den Glauben an Jesus Christus',
              optionsJson: JSON.stringify(['Durch den Glauben an Jesus Christus', 'Durch Kraft', 'Durch Wissen', 'Durch Reichtum']),
            },
          ],
        },
      },
    });
  }

  console.log('Lesson Expansion Part 4 abgeschlossen');
  console.log('15 neue Lektionen erstellt (Hebr, Jak, 1./2.Pet, 1.Joh)');
  console.log('Kumulative Lesson-Count: 60 + 15 = 75 Lektionen');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart4()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

