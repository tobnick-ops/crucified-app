// Lessons EXPANSION Part 3 - Thessalonicher & Pastoral-Briefe
// Systematische Fortsetzung der Lesson-Erweiterung

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart3() {
  console.log('Starting Lesson Expansion Part 3: Thessalonicher & Pastoral-Briefe...');

  // 1. THESSALONICHER (2 Lektionen)
  const ersteThessalonicherBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Thess' } });
  if (ersteThessalonicherBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteThessalonicherBook.id,
        title: '1. Thessalonicher - Glaube, Liebe, Hoffnung',
        description: 'Lerne über die drei großen Tugenden des christlichen Lebens.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was lobt Paulus an den Thessalonichern?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ihr Werk des Glaubens, ihre Arbeit der Liebe und ihre Geduld der Hoffnung',
              optionsJson: JSON.stringify(['Ihr Werk des Glaubens, ihre Arbeit der Liebe und ihre Geduld der Hoffnung', 'Ihren Reichtum', 'Ihre Macht', 'Ihre Weisheit']),
            },
            {
              questionText: 'Was ist die Grundlage des christlichen Lebens?',
              questionType: 'multiple_choice',
              correctAnswer: 'Glaube, Liebe und Hoffnung',
              optionsJson: JSON.stringify(['Glaube, Liebe und Hoffnung', 'Reichtum und Macht', 'Wissen und Bildung', 'Gesetz und Ordnung']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteThessalonicherBook.id,
        title: '1. Thessalonicher - Die Wiederkunft Christi',
        description: 'Verstehe die Lehre von der Wiederkunft des Herrn.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie wird der Herr wiederkommen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mit einem Feldgeschrei und der Stimme des Erzengels',
              optionsJson: JSON.stringify(['Mit einem Feldgeschrei und der Stimme des Erzengels', 'Leise und unsichtbar', 'Als Baby', 'Durch einen Propheten']),
            },
            {
              questionText: 'Was wird mit den Toten in Christus geschehen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie werden zuerst auferstehen',
              optionsJson: JSON.stringify(['Sie werden zuerst auferstehen', 'Sie bleiben tot', 'Sie werden vergessen', 'Sie werden reinkarniert']),
            },
            {
              questionText: 'Wann kommt der Tag des Herrn?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wie ein Dieb in der Nacht',
              optionsJson: JSON.stringify(['Wie ein Dieb in der Nacht', 'Mit Ankündigung', 'Nach einem Zeichen', 'Am bekannten Datum']),
            },
          ],
        },
      },
    });
  }

  // 2. THESSALONICHER (1 Lektion)
  const zweiteThessalonicherBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Thess' } });
  if (zweiteThessalonicherBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteThessalonicherBook.id,
        title: '2. Thessalonicher - Leben in Heiligung',
        description: 'Lerne über das Leben in Heiligung und den Tag des Herrn.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen Christen tun bis Christus wiederkommt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Arbeiten und ein geordnetes Leben führen',
              optionsJson: JSON.stringify(['Arbeiten und ein geordnetes Leben führen', 'Nichts tun und warten', 'Nur beten', 'Die Welt verlassen']),
            },
            {
              questionText: 'Was lehrt Paulus über Müßiggänger?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wer nicht arbeiten will, soll auch nicht essen',
              optionsJson: JSON.stringify(['Wer nicht arbeiten will, soll auch nicht essen', 'Sie sollen unterstützt werden', 'Sie sind gesegnet', 'Sie sind weise']),
            },
          ],
        },
      },
    });
  }

  // 1. TIMOTHEUS (2 Lektionen)
  const ersteTimotheusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Tim' } });
  if (ersteTimotheusBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteTimotheusBook.id,
        title: '1. Timotheus - Glaube bewahren',
        description: 'Lerne, wie man den Glauben in schwierigen Zeiten bewahrt.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist der Zweck des Gesetzes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Für Ungerechte und Sünder',
              optionsJson: JSON.stringify(['Für Ungerechte und Sünder', 'Für alle Menschen zur Erlösung', 'Zur Verdammnis', 'Zum Reichtum']),
            },
            {
              questionText: 'Was ist das Geheimnis des Glaubens?',
              questionType: 'multiple_choice',
              correctAnswer: 'Christus, offenbart im Fleisch',
              optionsJson: JSON.stringify(['Christus, offenbart im Fleisch', 'Eine verborgene Lehre', 'Reichtum', 'Macht']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteTimotheusBook.id,
        title: '1. Timotheus - Leiterschaft in der Gemeinde',
        description: 'Verstehe die Qualifikationen für Gemeindeleiter.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was muss ein Aufseher sein?',
              questionType: 'multiple_choice',
              correctAnswer: 'Untadelig, nüchtern, besonnen, eines Weibes Mann',
              optionsJson: JSON.stringify(['Untadelig, nüchtern, besonnen, eines Weibes Mann', 'Reich und mächtig', 'Jung und stark', 'Beliebt und bekannt']),
            },
            {
              questionText: 'Warum sollen Leiter geprüft werden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Damit sie sich als treu erweisen',
              optionsJson: JSON.stringify(['Damit sie sich als treu erweisen', 'Damit sie reich werden', 'Damit sie Macht bekommen', 'Ohne Grund']),
            },
          ],
        },
      },
    });
  }

  // 2. TIMOTHEUS (2 Lektionen)
  const zweiteTimotheusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Tim' } });
  if (zweiteTimotheusBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteTimotheusBook.id,
        title: '2. Timotheus - Das Vorbild des Glaubens',
        description: 'Lerne, ein Vorbild im Glauben zu sein.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was soll Timotheus weitergeben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Was er von Paulus gelernt hat, an treue Menschen',
              optionsJson: JSON.stringify(['Was er von Paulus gelernt hat, an treue Menschen', 'Sein Geld', 'Seine Macht', 'Seine Weisheit']),
            },
            {
              questionText: 'Als was soll sich ein Diener Christi erweisen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Als ein guter Streiter Christi',
              optionsJson: JSON.stringify(['Als ein guter Streiter Christi', 'Als reich', 'Als mächtig', 'Als berühmt']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteTimotheusBook.id,
        title: '2. Timotheus - Gesunde Lehre',
        description: 'Verstehe die Wichtigkeit gesunder Lehre.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist alle Schrift?',
              questionType: 'multiple_choice',
              correctAnswer: 'Von Gott eingegeben und nützlich zur Lehre',
              optionsJson: JSON.stringify(['Von Gott eingegeben und nützlich zur Lehre', 'Von Menschen geschrieben', 'Nur Geschichte', 'Unwichtig']),
            },
            {
              questionText: 'Wozu ist die Schrift nützlich?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zur Lehre, Überführung, Zurechtweisung und Erziehung',
              optionsJson: JSON.stringify(['Zur Lehre, Überführung, Zurechtweisung und Erziehung', 'Nur zum Lesen', 'Zur Unterhaltung', 'Zum Reichtum']),
            },
          ],
        },
      },
    });
  }

  // TITUS (2 Lektionen)
  const titusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Tit' } });
  if (titusBook) {
    await prisma.lesson.create({
      data: {
        bookId: titusBook.id,
        title: 'Titus - Ordnung in der Gemeinde',
        description: 'Lerne über die Ordnung und Organisation der Gemeinde.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was soll Titus in jeder Stadt einsetzen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Älteste',
              optionsJson: JSON.stringify(['Älteste', 'Könige', 'Soldaten', 'Händler']),
            },
            {
              questionText: 'Was müssen Älteste sein?',
              questionType: 'multiple_choice',
              correctAnswer: 'Untadelig und der gesunden Lehre anhängend',
              optionsJson: JSON.stringify(['Untadelig und der gesunden Lehre anhängend', 'Reich', 'Mächtig', 'Berühmt']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: titusBook.id,
        title: 'Titus - Leben als Christ',
        description: 'Verstehe, wie Christen in der Welt leben sollen.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie sollen wir in dieser Welt leben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Besonnen, gerecht und gottesfürchtig',
              optionsJson: JSON.stringify(['Besonnen, gerecht und gottesfürchtig', 'Wie wir wollen', 'Ohne Regeln', 'Im Überfluss']),
            },
            {
              questionText: 'Wodurch wurden wir gerettet?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nicht durch Werke der Gerechtigkeit, sondern durch Gottes Barmherzigkeit',
              optionsJson: JSON.stringify(['Nicht durch Werke der Gerechtigkeit, sondern durch Gottes Barmherzigkeit', 'Durch unsere Werke', 'Durch das Gesetz', 'Durch Opfer']),
            },
          ],
        },
      },
    });
  }

  // PHILEMON (1 Lektion)
  const philemonBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Phlm' } });
  if (philemonBook) {
    await prisma.lesson.create({
      data: {
        bookId: philemonBook.id,
        title: 'Philemon - Vergebung und Versöhnung',
        description: 'Lerne über christliche Vergebung am Beispiel von Onesimus.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer war Onesimus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein entlaufener Sklave, der Christ wurde',
              optionsJson: JSON.stringify(['Ein entlaufener Sklave, der Christ wurde', 'Ein König', 'Ein Priester', 'Ein Prophet']),
            },
            {
              questionText: 'Was bittet Paulus Philemon zu tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Onesimus zu vergeben und ihn als Bruder aufzunehmen',
              optionsJson: JSON.stringify(['Onesimus zu vergeben und ihn als Bruder aufzunehmen', 'Ihn zu bestrafen', 'Ihn zu verstoßen', 'Ihn zu verkaufen']),
            },
            {
              questionText: 'Was lehrt dieser Brief über Vergebung?',
              questionType: 'multiple_choice',
              correctAnswer: 'Christen sollen einander vergeben wie Christus uns vergeben hat',
              optionsJson: JSON.stringify(['Christen sollen einander vergeben wie Christus uns vergeben hat', 'Vergebung ist unnötig', 'Man muss Rache nehmen', 'Vergebung ist Schwäche']),
            },
          ],
        },
      },
    });
  }

  console.log('Lesson Expansion Part 3 abgeschlossen');
  console.log('10 neue Lektionen erstellt (1./2.Thess, 1./2.Tim, Tit, Phlm)');
  console.log('Kumulative Lesson-Count: 50 + 10 = 60 Lektionen');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart3()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

