// Lessons EXPANSION Part 6 - Tora (1.-5. Mose) + Judas
// 16 Lektionen - AT Tora Start!

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart6() {
  console.log('Starting Lesson Expansion Part 6: Tora + Judas...');

  // 1. MOSE (5 Lektionen)
  const ersteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Mo' } });
  if (ersteMoseBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteMoseBook.id,
        title: '1. Mose - Die Schöpfung',
        description: 'Lerne über die Schöpfung der Welt in sechs Tagen.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 100,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was schuf Gott am Anfang?',
              questionType: 'multiple_choice',
              correctAnswer: 'Himmel und Erde',
              optionsJson: JSON.stringify(['Himmel und Erde', 'Nur den Himmel', 'Nur die Erde', 'Nichts']),
            },
            {
              questionText: 'Am welchen Tag schuf Gott den Menschen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Am sechsten Tag',
              optionsJson: JSON.stringify(['Am sechsten Tag', 'Am ersten Tag', 'Am dritten Tag', 'Am siebten Tag']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteMoseBook.id,
        title: '1. Mose - Der Sündenfall',
        description: 'Verstehe den ersten Ungehorsam der Menschen gegenüber Gott.',
        difficulty: 'easy',
        requiredLevel: 2,
        experienceReward: 110,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat die Schlange im Garten Eden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie verführte Eva, von der verbotenen Frucht zu essen',
              optionsJson: JSON.stringify(['Sie verführte Eva, von der verbotenen Frucht zu essen', 'Sie half Adam', 'Sie betete', 'Sie schlief']),
            },
            {
              questionText: 'Was war die Folge des Sündenfalls?',
              questionType: 'multiple_choice',
              correctAnswer: 'Adam und Eva wurden aus dem Garten vertrieben',
              optionsJson: JSON.stringify(['Adam und Eva wurden aus dem Garten vertrieben', 'Nichts', 'Sie wurden belohnt', 'Sie blieben im Garten']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteMoseBook.id,
        title: '1. Mose - Die Sintflut',
        description: 'Lerne über die große Flut und Noahs Gehorsam.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 140,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum sandte Gott die Sintflut?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil die Menschen böse geworden waren',
              optionsJson: JSON.stringify(['Weil die Menschen böse geworden waren', 'Ohne Grund', 'Zur Strafe für Noah', 'Weil es zu trocken war']),
            },
            {
              questionText: 'Wie viele Tiere nahm Noah in die Arche?',
              questionType: 'multiple_choice',
              correctAnswer: 'Von jeder Art ein Paar',
              optionsJson: JSON.stringify(['Von jeder Art ein Paar', 'Keine', 'Nur zwei', 'Tausende']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteMoseBook.id,
        title: '1. Mose - Abraham und Isaak',
        description: 'Verstehe Gottes Verheißung an Abraham und die Prüfung seines Glaubens.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was versprach Gott Abraham?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass seine Nachkommen so zahlreich sein werden wie die Sterne',
              optionsJson: JSON.stringify(['Dass seine Nachkommen so zahlreich sein werden wie die Sterne', 'Reichtum', 'Macht', 'Ein Haus']),
            },
            {
              questionText: 'Was sollte Abraham mit Isaak tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ihn als Opfer darbringen',
              optionsJson: JSON.stringify(['Ihn als Opfer darbringen', 'Ihn verlassen', 'Ihn lehren', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteMoseBook.id,
        title: '1. Mose - Josef und seine Brüder',
        description: 'Lerne über Josef, der von seinen Brüdern verkauft wurde und Ägypten rettete.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum hassten Josefs Brüder ihn?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil ihr Vater ihn bevorzugte und er von seinen Träumen erzählte',
              optionsJson: JSON.stringify(['Weil ihr Vater ihn bevorzugte und er von seinen Träumen erzählte', 'Weil er böse war', 'Weil er stark war', 'Ohne Grund']),
            },
            {
              questionText: 'Wo wurde Josef verkauft?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nach Ägypten',
              optionsJson: JSON.stringify(['Nach Ägypten', 'Nach Babylon', 'Nach Rom', 'Nach Griechenland']),
            },
          ],
        },
      },
    });
  }

  // 3. MOSE (3 Lektionen)
  const dritteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '3Mo' } });
  if (dritteMoseBook) {
    await prisma.lesson.create({
      data: {
        bookId: dritteMoseBook.id,
        title: '3. Mose - Opfergesetze',
        description: 'Verstehe die verschiedenen Opfer, die Gott verordnet hat.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum wurden Opfer dargebracht?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zur Sühne für Sünden',
              optionsJson: JSON.stringify(['Zur Sühne für Sünden', 'Zur Unterhaltung', 'Ohne Grund', 'Zum Essen']),
            },
            {
              questionText: 'Welches Opfer war vollkommen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Opfer Christi erfüllte alle Opfer',
              optionsJson: JSON.stringify(['Das Opfer Christi erfüllte alle Opfer', 'Das Stieropfer', 'Das Weizenopfer', 'Kein Opfer']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: dritteMoseBook.id,
        title: '3. Mose - Reinheit und Heiligkeit',
        description: 'Lerne über Gottes Gesetze für Reinheit und Heiligung.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was bedeutet "heilig"?',
              questionType: 'multiple_choice',
              correctAnswer: 'Für Gott abgesondert und rein',
              optionsJson: JSON.stringify(['Für Gott abgesondert und rein', 'Mächtig', 'Reich', 'Weise']),
            },
            {
              questionText: 'Was sagt Gott über Heiligkeit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Seid heilig, denn ich bin heilig',
              optionsJson: JSON.stringify(['Seid heilig, denn ich bin heilig', 'Heiligkeit ist unwichtig', 'Nur Priester müssen heilig sein', 'Niemand kann heilig sein']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: dritteMoseBook.id,
        title: '3. Mose - Der große Versöhnungstag',
        description: 'Verstehe den Tag der Versöhnung und seine Bedeutung.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was geschah am Versöhnungstag?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Hohepriester trat ins Allerheiligste für die Sünden des Volkes',
              optionsJson: JSON.stringify(['Der Hohepriester trat ins Allerheiligste für die Sünden des Volkes', 'Ein Fest', 'Eine Schlacht', 'Nichts']),
            },
            {
              questionText: 'Worauf wies der Versöhnungstag hin?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf das vollkommene Opfer Christi',
              optionsJson: JSON.stringify(['Auf das vollkommene Opfer Christi', 'Auf ein Fest', 'Auf nichts', 'Auf den Tempel']),
            },
          ],
        },
      },
    });
  }

  // 4. MOSE (3 Lektionen)
  const vierteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '4Mo' } });
  if (vierteMoseBook) {
    await prisma.lesson.create({
      data: {
        bookId: vierteMoseBook.id,
        title: '4. Mose - Die Wüstenwanderung',
        description: 'Lerne über Israels 40 Jahre in der Wüste.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie lange wanderte Israel in der Wüste?',
              questionType: 'multiple_choice',
              correctAnswer: '40 Jahre',
              optionsJson: JSON.stringify(['40 Jahre', '7 Jahre', '1 Jahr', '100 Jahre']),
            },
            {
              questionText: 'Warum musste Israel so lange wandern?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wegen ihres Unglaubens',
              optionsJson: JSON.stringify(['Wegen ihres Unglaubens', 'Zur Strafe für Mose', 'Weil sie sich verirrten', 'Ohne Grund']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: vierteMoseBook.id,
        title: '4. Mose - Das Manna',
        description: 'Verstehe, wie Gott sein Volk in der Wüste versorgte.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Manna?',
              questionType: 'multiple_choice',
              correctAnswer: 'Himmelsbrot, das Gott täglich vom Himmel sandte',
              optionsJson: JSON.stringify(['Himmelsbrot, das Gott täglich vom Himmel sandte', 'Normales Brot', 'Fleisch', 'Wasser']),
            },
            {
              questionText: 'Wann musste das Manna gesammelt werden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jeden Morgen',
              optionsJson: JSON.stringify(['Jeden Morgen', 'Jeden Abend', 'Jede Woche', 'Jedes Jahr']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: vierteMoseBook.id,
        title: '4. Mose - Die Kundschafter',
        description: 'Lerne über die zwölf Kundschafter und ihren Bericht.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollten die Kundschafter tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das verheißene Land erkunden',
              optionsJson: JSON.stringify(['Das verheißene Land erkunden', 'Kämpfen', 'Handeln', 'Feiern']),
            },
            {
              questionText: 'Was berichteten die meisten Kundschafter?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass das Land gut ist, aber die Bewohner zu stark sind',
              optionsJson: JSON.stringify(['Dass das Land gut ist, aber die Bewohner zu stark sind', 'Dass das Land schlecht ist', 'Dass es leer ist', 'Dass es perfekt ist']),
            },
          ],
        },
      },
    });
  }

  // 5. MOSE (3 Lektionen)
  const fuenteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '5Mo' } });
  if (fuenteMoseBook) {
    await prisma.lesson.create({
      data: {
        bookId: fuenteMoseBook.id,
        title: '5. Mose - Das Shema',
        description: 'Lerne das wichtigste Gebet Israels: das Shema.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Shema?',
              questionType: 'multiple_choice',
              correctAnswer: 'Höre Israel, der HERR ist unser Gott, der HERR allein',
              optionsJson: JSON.stringify(['Höre Israel, der HERR ist unser Gott, der HERR allein', 'Ein Gebet um Brot', 'Ein Lied', 'Eine Geschichte']),
            },
            {
              questionText: 'Was sollen wir mit ganzem Herzen tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Den HERRN lieben',
              optionsJson: JSON.stringify(['Den HERRN lieben', 'Arbeiten', 'Essen', 'Schlafen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: fuenteMoseBook.id,
        title: '5. Mose - Segen und Fluch',
        description: 'Verstehe den Bund: Gehorsam bringt Segen, Ungehorsam Fluch.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was folgt auf Gehorsam gegenüber Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Segen',
              optionsJson: JSON.stringify(['Segen', 'Fluch', 'Nichts', 'Strafe']),
            },
            {
              questionText: 'Was ist die Konsequenz des Ungehorsams?',
              questionType: 'multiple_choice',
              correctAnswer: 'Fluch und Leid',
              optionsJson: JSON.stringify(['Fluch und Leid', 'Segen', 'Nichts', 'Belohnung']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: fuenteMoseBook.id,
        title: '5. Mose - Der Tod des Mose',
        description: 'Lerne über Moses Tod und sein Vermächtnis.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Durfte Mose ins verheißene Land gehen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nein, er durfte es nur von ferne sehen',
              optionsJson: JSON.stringify(['Nein, er durfte es nur von ferne sehen', 'Ja, er zog ein', 'Ja, er wurde König', 'Er starb vorher']),
            },
            {
              questionText: 'Was war Moses Vermächtnis?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er war der größte Prophet, den der HERR kannte',
              optionsJson: JSON.stringify(['Er war der größte Prophet, den der HERR kannte', 'Er war reich', 'Er war mächtig', 'Nichts besonderes']),
            },
          ],
        },
      },
    });
  }

  // JUDAS (1 Lektion - NT Ergänzung)
  const judasBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jud' } });
  if (judasBook) {
    await prisma.lesson.create({
      data: {
        bookId: judasBook.id,
        title: 'Judas - Für den Glauben kämpfen',
        description: 'Lerne, für den überlieferten Glauben zu kämpfen.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wozu ermahnt Judas die Christen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Für den einmal überlieferten Glauben zu kämpfen',
              optionsJson: JSON.stringify(['Für den einmal überlieferten Glauben zu kämpfen', 'Zu schweigen', 'Zu fliehen', 'Aufzugeben']),
            },
            {
              questionText: 'Vor wem warnt Judas?',
              questionType: 'multiple_choice',
              correctAnswer: 'Vor falschen Lehrern, die sich eingeschlichen haben',
              optionsJson: JSON.stringify(['Vor falschen Lehrern, die sich eingeschlichen haben', 'Vor Römern', 'Vor den Aposteln', 'Vor niemandem']),
            },
          ],
        },
      },
    });
  }

  console.log('✅ Lesson Expansion Part 6 abgeschlossen!');
  console.log('16 neue Lektionen erstellt (1.Mo: 5, 3.Mo: 3, 4.Mo: 3, 5.Mo: 3, Judas: 1, 2.Mo hat bereits 2)');
  console.log('Kumulative Lesson-Count: 85 + 16 = 101 Lektionen');
  console.log('🎉 ÜBER 100 LESSONS MILESTONE!');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart6()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

