// Lessons EXPANSION Part 8 - Weisheitsbücher
// 15 Lektionen (Hiob, Psalmen, Sprüche, Prediger, Hoheslied)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart8() {
  console.log('Starting Lesson Expansion Part 8: Weisheitsbücher...');

  // HIOB (4 Lektionen)
  const hiobBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Hi' } });
  if (hiobBook) {
    await prisma.lesson.create({
      data: {
        bookId: hiobBook.id,
        title: 'Hiob - Das Leiden Hiobs',
        description: 'Lerne über Hiobs Leiden und seine Treue zu Gott.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Hiob vor seinem Leiden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein gerechter und gottesfürchtiger Mann',
              optionsJson: JSON.stringify(['Ein gerechter und gottesfürchtiger Mann', 'Ein Sünder', 'Ein König', 'Ein Prophet']),
            },
            {
              questionText: 'Was verlor Hiob?',
              questionType: 'multiple_choice',
              correctAnswer: 'Seine Kinder, seinen Besitz und seine Gesundheit',
              optionsJson: JSON.stringify(['Seine Kinder, seinen Besitz und seine Gesundheit', 'Nur sein Geld', 'Nur seine Familie', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hiobBook.id,
        title: 'Hiob - Die Freunde Hiobs',
        description: 'Verstehe die Gespräche zwischen Hiob und seinen Freunden.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was behaupteten Hiobs Freunde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass Hiob gesündigt haben muss',
              optionsJson: JSON.stringify(['Dass Hiob gesündigt haben muss', 'Dass Hiob unschuldig ist', 'Dass Gott ungerecht ist', 'Dass es keine Erklärung gibt']),
            },
            {
              questionText: 'Was war Hiobs Antwort?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er klagte Gott sein Leid, aber hielt an ihm fest',
              optionsJson: JSON.stringify(['Er klagte Gott sein Leid, aber hielt an ihm fest', 'Er gab Gott auf', 'Er stimmte seinen Freunden zu', 'Er schwieg']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hiobBook.id,
        title: 'Hiob - Gottes Antwort',
        description: 'Lerne, wie Gott Hiob aus dem Wettersturm antwortete.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was fragte Gott Hiob?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wo warst du, als ich die Erde gründete?',
              optionsJson: JSON.stringify(['Wo warst du, als ich die Erde gründete?', 'Warum hast du gesündigt?', 'Was willst du?', 'Bist du gerecht?']),
            },
            {
              questionText: 'Was erkannte Hiob?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass Gott souverän ist und er sich beugen muss',
              optionsJson: JSON.stringify(['Dass Gott souverän ist und er sich beugen muss', 'Dass er Recht hatte', 'Dass Gott ungerecht ist', 'Dass er unschuldig ist']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hiobBook.id,
        title: 'Hiob - Wiederherstellung',
        description: 'Verstehe, wie Gott Hiob wiederherstellte.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat Gott für Hiob am Ende?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er gab ihm doppelt so viel zurück wie er hatte',
              optionsJson: JSON.stringify(['Er gab ihm doppelt so viel zurück wie er hatte', 'Nichts', 'Die Hälfte', 'Nur Gesundheit']),
            },
            {
              questionText: 'Was lehrt uns Hiobs Geschichte?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott ist souverän und treu, auch im Leiden',
              optionsJson: JSON.stringify(['Gott ist souverän und treu, auch im Leiden', 'Leiden ist Strafe', 'Gott ist ungerecht', 'Man soll nicht leiden']),
            },
          ],
        },
      },
    });
  }

  // PSALMEN (6 Lektionen - wichtigste Psalmen)
  const psalmenBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Ps' } });
  if (psalmenBook) {
    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Psalm 23: Der gute Hirte',
        description: 'Lerne den bekanntesten Psalm über Gottes Führung.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 110,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer ist mein Hirte laut Psalm 23?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der HERR',
              optionsJson: JSON.stringify(['Der HERR', 'David', 'Ein Mensch', 'Niemand']),
            },
            {
              questionText: 'Wo führt mich der Hirte?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zu frischem Wasser und grünen Auen',
              optionsJson: JSON.stringify(['Zu frischem Wasser und grünen Auen', 'In die Wüste', 'Ins Verderben', 'Nirgendwohin']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Psalm 1: Der gesegnete Mensch',
        description: 'Verstehe, was einen gesegneten Menschen ausmacht.',
        difficulty: 'easy',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wohl dem, der nicht...?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wandelt im Rat der Gottlosen',
              optionsJson: JSON.stringify(['Wandelt im Rat der Gottlosen', 'Betet', 'Arbeitet', 'Isst']),
            },
            {
              questionText: 'Womit wird der Gerechte verglichen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mit einem Baum an Wasserbächen',
              optionsJson: JSON.stringify(['Mit einem Baum an Wasserbächen', 'Mit einem Stein', 'Mit dem Wind', 'Mit einem Feuer']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Psalm 51: Buße und Vergebung',
        description: 'Lerne Davids Bußpsalm nach seiner Sünde.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Worum bittet David Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Um Erbarmen und Reinigung von seiner Sünde',
              optionsJson: JSON.stringify(['Um Erbarmen und Reinigung von seiner Sünde', 'Um Reichtum', 'Um Macht', 'Um Weisheit']),
            },
            {
              questionText: 'Was will Gott laut Psalm 51?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein zerbrochenes und zerschlagenes Herz',
              optionsJson: JSON.stringify(['Ein zerbrochenes und zerschlagenes Herz', 'Viele Opfer', 'Reichtum', 'Stolz']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Psalm 139: Gottes Allwissenheit',
        description: 'Verstehe, dass Gott dich durch und durch kennt.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was weiß Gott über uns?',
              questionType: 'multiple_choice',
              correctAnswer: 'Alles - unsere Gedanken, Worte und Wege',
              optionsJson: JSON.stringify(['Alles - unsere Gedanken, Worte und Wege', 'Nur das Offensichtliche', 'Nichts', 'Nur Gutes']),
            },
            {
              questionText: 'Wo kann man vor Gott fliehen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nirgendwohin - Gott ist überall',
              optionsJson: JSON.stringify(['Nirgendwohin - Gott ist überall', 'In die Wüste', 'Ins Meer', 'In die Berge']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Psalmen der Anbetung',
        description: 'Lerne die großen Lobpreis-Psalmen.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist der Refrain von Psalm 100?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jauchzet dem HERRN, alle Welt!',
              optionsJson: JSON.stringify(['Jauchzet dem HERRN, alle Welt!', 'Schweigt!', 'Fürchtet euch!', 'Flieht!']),
            },
            {
              questionText: 'Warum sollen wir Gott loben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil er gut ist und seine Güte ewig währt',
              optionsJson: JSON.stringify(['Weil er gut ist und seine Güte ewig währt', 'Aus Pflicht', 'Ohne Grund', 'Weil wir müssen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: psalmenBook.id,
        title: 'Psalmen - Messianische Psalmen',
        description: 'Verstehe die Psalmen, die auf den Messias hinweisen.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Welcher Psalm beschreibt die Kreuzigung prophetisch?',
              questionType: 'multiple_choice',
              correctAnswer: 'Psalm 22',
              optionsJson: JSON.stringify(['Psalm 22', 'Psalm 1', 'Psalm 100', 'Psalm 150']),
            },
            {
              questionText: 'Was sagt Psalm 22:2?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mein Gott, mein Gott, warum hast du mich verlassen',
              optionsJson: JSON.stringify(['Mein Gott, mein Gott, warum hast du mich verlassen', 'Der HERR ist mein Hirte', 'Lobe den HERRN', 'Halleluja']),
            },
          ],
        },
      },
    });
  }

  // SPRÜCHE (4 Lektionen)
  const spruecheBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Spr' } });
  if (spruecheBook) {
    await prisma.lesson.create({
      data: {
        bookId: spruecheBook.id,
        title: 'Sprüche - Weisheit ruft',
        description: 'Lerne über die Weisheit, die auf den Straßen ruft.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist der Anfang der Weisheit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Furcht des HERRN',
              optionsJson: JSON.stringify(['Die Furcht des HERRN', 'Viel Wissen', 'Viel Geld', 'Viel Macht']),
            },
            {
              questionText: 'Wo ruft die Weisheit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf den Straßen und Plätzen',
              optionsJson: JSON.stringify(['Auf den Straßen und Plätzen', 'Im Verborgenen', 'Nur im Tempel', 'Nirgendwo']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: spruecheBook.id,
        title: 'Sprüche - Die Furcht des HERRN',
        description: 'Verstehe die Bedeutung der Gottesfurcht.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist die Furcht des HERRN?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Anfang der Erkenntnis und Weisheit',
              optionsJson: JSON.stringify(['Der Anfang der Erkenntnis und Weisheit', 'Angst vor Strafe', 'Unwissenheit', 'Schwäche']),
            },
            {
              questionText: 'Was bringt die Furcht des HERRN?',
              questionType: 'multiple_choice',
              correctAnswer: 'Leben, Segen und Schutz',
              optionsJson: JSON.stringify(['Leben, Segen und Schutz', 'Tod', 'Armut', 'Leid']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: spruecheBook.id,
        title: 'Sprüche - Das tugendhafte Weib',
        description: 'Lerne über die tugendhafte Frau in Sprüche 31.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was wird über die tugendhafte Frau gesagt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie ist weit mehr wert als Perlen',
              optionsJson: JSON.stringify(['Sie ist weit mehr wert als Perlen', 'Sie ist arm', 'Sie ist schwach', 'Sie ist unwichtig']),
            },
            {
              questionText: 'Was zeichnet sie aus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weisheit, Fleiß, Gottesfurcht und Nächstenliebe',
              optionsJson: JSON.stringify(['Weisheit, Fleiß, Gottesfurcht und Nächstenliebe', 'Nur Schönheit', 'Reichtum', 'Macht']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: spruecheBook.id,
        title: 'Sprüche - Sprüche über das Leben',
        description: 'Verstehe praktische Weisheit für den Alltag.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir mehr bewahren als alles andere?',
              questionType: 'multiple_choice',
              correctAnswer: 'Unser Herz',
              optionsJson: JSON.stringify(['Unser Herz', 'Unser Geld', 'Unsere Ehre', 'Unser Leben']),
            },
            {
              questionText: 'Was lehrt Sprüche über Freundschaft?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein Freund liebt zu aller Zeit',
              optionsJson: JSON.stringify(['Ein Freund liebt zu aller Zeit', 'Freunde sind unwichtig', 'Man braucht keine Freunde', 'Freunde verraten']),
            },
          ],
        },
      },
    });
  }

  // PREDIGER (2 Lektionen)
  const predigerBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Pred' } });
  if (predigerBook) {
    await prisma.lesson.create({
      data: {
        bookId: predigerBook.id,
        title: 'Prediger - Alles ist Windhauch',
        description: 'Lerne über die Vergänglichkeit irdischer Dinge.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt der Prediger über alles unter der Sonne?',
              questionType: 'multiple_choice',
              correctAnswer: 'Es ist alles Windhauch und Haschen nach Wind',
              optionsJson: JSON.stringify(['Es ist alles Windhauch und Haschen nach Wind', 'Es ist perfekt', 'Es ist ewig', 'Es ist wichtig']),
            },
            {
              questionText: 'Was bleibt nach allem?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott fürchten und seine Gebote halten',
              optionsJson: JSON.stringify(['Gott fürchten und seine Gebote halten', 'Reichtum', 'Ruhm', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: predigerBook.id,
        title: 'Prediger - Der Schluss der Sache',
        description: 'Verstehe die Schlussfolgerung des Predigers.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Fazit des ganzen Buches?',
              questionType: 'multiple_choice',
              correctAnswer: 'Fürchte Gott und halte seine Gebote, das ist der ganze Mensch',
              optionsJson: JSON.stringify(['Fürchte Gott und halte seine Gebote, das ist der ganze Mensch', 'Suche Reichtum', 'Genieße das Leben', 'Es gibt keinen Sinn']),
            },
            {
              questionText: 'Was geschieht mit allen Werken?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott wird jedes Werk ins Gericht bringen',
              optionsJson: JSON.stringify(['Gott wird jedes Werk ins Gericht bringen', 'Sie werden vergessen', 'Sie sind unwichtig', 'Nichts']),
            },
          ],
        },
      },
    });
  }

  // HOHESLIED (1 Lektion)
  const hohesliedBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Hl' } });
  if (hohesliedBook) {
    await prisma.lesson.create({
      data: {
        bookId: hohesliedBook.id,
        title: 'Hoheslied - Die Liebe Gottes',
        description: 'Verstehe das Hohelied als Bild der Liebe zwischen Christus und seiner Gemeinde.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Hohelied?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein Liebeslied, das Gottes Liebe zur Gemeinde symbolisiert',
              optionsJson: JSON.stringify(['Ein Liebeslied, das Gottes Liebe zur Gemeinde symbolisiert', 'Ein Kriegslied', 'Eine Geschichte', 'Eine Prophezeiung']),
            },
            {
              questionText: 'Was ist stärker als der Tod?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Liebe',
              optionsJson: JSON.stringify(['Die Liebe', 'Der Hass', 'Die Macht', 'Das Geld']),
            },
          ],
        },
      },
    });
  }

  console.log('✅ Lesson Expansion Part 8 abgeschlossen!');
  console.log('15 neue Lektionen erstellt (Weisheitsbücher)');
  console.log('  Hiob: 4, Psalmen: 6, Sprüche: 4, Prediger: 2, Hoheslied: 1');
  console.log('Kumulative Lesson-Count: 119 + 15 = 134 Lektionen');
  console.log('🎯 89% des Ziels erreicht!');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart8()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

