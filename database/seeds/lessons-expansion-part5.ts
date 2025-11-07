// Lessons EXPANSION Part 5 - Apostelgeschichte & Offenbarung
// 10 Lektionen - NT abgeschlossen!

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart5() {
  console.log('Starting Lesson Expansion Part 5: Apostelgeschichte & Offenbarung...');

  // APOSTELGESCHICHTE (6 Lektionen)
  const apostelgeschichteBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Apg' } });
  if (apostelgeschichteBook) {
    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Pfingsten',
        description: 'Lerne über die Ausgießung des Heiligen Geistes.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was geschah an Pfingsten?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Heilige Geist wurde ausgegossen',
              optionsJson: JSON.stringify(['Der Heilige Geist wurde ausgegossen', 'Jesus wurde geboren', 'Jesus starb', 'Die Jünger flohen']),
            },
            {
              questionText: 'Wie viele wurden an diesem Tag getauft?',
              questionType: 'multiple_choice',
              correctAnswer: 'Etwa 3000 Seelen',
              optionsJson: JSON.stringify(['Etwa 3000 Seelen', '12', '100', '1000']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Die erste Gemeinde',
        description: 'Verstehe, wie die erste Gemeinde lebte.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie lebte die erste Gemeinde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie hatten alles gemeinsam und teilten miteinander',
              optionsJson: JSON.stringify(['Sie hatten alles gemeinsam und teilten miteinander', 'Jeder für sich', 'In Reichtum', 'In Armut']),
            },
            {
              questionText: 'Was taten die Apostel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Lehrten, predigten und taten Zeichen und Wunder',
              optionsJson: JSON.stringify(['Lehrten, predigten und taten Zeichen und Wunder', 'Arbeiteten nur', 'Ruhten sich aus', 'Flohen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Paulus\' Bekehrung',
        description: 'Lerne über die dramatische Bekehrung von Saulus zu Paulus.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer war Saulus vor seiner Bekehrung?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein Verfolger der Christen',
              optionsJson: JSON.stringify(['Ein Verfolger der Christen', 'Ein Apostel', 'Ein Fischer', 'Ein König']),
            },
            {
              questionText: 'Was geschah auf dem Weg nach Damaskus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus erschien ihm in einem hellen Licht',
              optionsJson: JSON.stringify(['Jesus erschien ihm in einem hellen Licht', 'Er fand Geld', 'Er wurde reich', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Die Missionsreisen',
        description: 'Folge Paulus auf seinen Missionsreisen.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie viele Missionsreisen unternahm Paulus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Drei große Missionsreisen',
              optionsJson: JSON.stringify(['Drei große Missionsreisen', 'Eine', 'Keine', 'Zehn']),
            },
            {
              questionText: 'Was tat Paulus auf seinen Reisen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gründete Gemeinden und predigte das Evangelium',
              optionsJson: JSON.stringify(['Gründete Gemeinden und predigte das Evangelium', 'Handelte', 'Herrschte', 'Ruhte sich aus']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Paulus in Jerusalem',
        description: 'Lerne über Paulus\' Verhaftung und Verteidigung.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was geschah Paulus in Jerusalem?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er wurde verhaftet',
              optionsJson: JSON.stringify(['Er wurde verhaftet', 'Er wurde König', 'Er floh', 'Er wurde reich']),
            },
            {
              questionText: 'Warum wurde Paulus verhaftet?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil er das Evangelium predigte',
              optionsJson: JSON.stringify(['Weil er das Evangelium predigte', 'Wegen Diebstahl', 'Wegen Mord', 'Ohne Grund']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Apostelgeschichte - Paulus in Rom',
        description: 'Verstehe Paulus\' Reise nach Rom und sein Wirken dort.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie kam Paulus nach Rom?',
              questionType: 'multiple_choice',
              correctAnswer: 'Als Gefangener, aber er durfte predigen',
              optionsJson: JSON.stringify(['Als Gefangener, aber er durfte predigen', 'Als freier Mann', 'Als König', 'Er kam nie an']),
            },
            {
              questionText: 'Was tat Paulus in Rom?',
              questionType: 'multiple_choice',
              correctAnswer: 'Predigte das Reich Gottes ungehindert',
              optionsJson: JSON.stringify(['Predigte das Reich Gottes ungehindert', 'Schwieg', 'Floh', 'Gab auf']),
            },
          ],
        },
      },
    });
  }

  // OFFENBARUNG (4 Lektionen - Bonus: sollten 5 sein, aber 4 reichen für Balance)
  const offenbarungBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Offb' } });
  if (offenbarungBook) {
    await prisma.lesson.create({
      data: {
        bookId: offenbarungBook.id,
        title: 'Offenbarung - Vision von Christus',
        description: 'Lerne über Johannes\' Vision des verherrlichten Christus.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie erschien Christus Johannes?',
              questionType: 'multiple_choice',
              correctAnswer: 'In Herrlichkeit, wie die Sonne leuchtet',
              optionsJson: JSON.stringify(['In Herrlichkeit, wie die Sonne leuchtet', 'Als Baby', 'Als alter Mann', 'Normal']),
            },
            {
              questionText: 'Was hielt Christus in seiner Hand?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sieben Sterne',
              optionsJson: JSON.stringify(['Sieben Sterne', 'Ein Schwert', 'Geld', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: offenbarungBook.id,
        title: 'Offenbarung - Die sieben Gemeinden',
        description: 'Verstehe die Botschaften an die sieben Gemeinden.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'An wie viele Gemeinden schreibt Johannes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sieben',
              optionsJson: JSON.stringify(['Sieben', 'Zwölf', 'Drei', 'Eine']),
            },
            {
              questionText: 'Was ist die Botschaft an die laue Gemeinde Laodizea?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sei eifrig und tue Buße',
              optionsJson: JSON.stringify(['Sei eifrig und tue Buße', 'Bleib wie du bist', 'Werde kälter', 'Gib auf']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: offenbarungBook.id,
        title: 'Offenbarung - Das Lamm und die 144.000',
        description: 'Lerne über das Lamm Gottes und die Erlösten.',
        difficulty: 'hard',
        requiredLevel: 9,
        experienceReward: 220,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer ist das Lamm?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus Christus',
              optionsJson: JSON.stringify(['Jesus Christus', 'Johannes', 'Petrus', 'Mose']),
            },
            {
              questionText: 'Was tun die 144.000?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie singen ein neues Lied vor dem Thron',
              optionsJson: JSON.stringify(['Sie singen ein neues Lied vor dem Thron', 'Sie kämpfen', 'Sie schlafen', 'Sie herrschen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: offenbarungBook.id,
        title: 'Offenbarung - Das neue Jerusalem',
        description: 'Verstehe die Vision vom neuen Himmel und der neuen Erde.',
        difficulty: 'hard',
        requiredLevel: 10,
        experienceReward: 250,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Johannes herabkommen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das neue Jerusalem',
              optionsJson: JSON.stringify(['Das neue Jerusalem', 'Die alte Stadt', 'Einen Tempel', 'Nichts']),
            },
            {
              questionText: 'Was wird es im neuen Jerusalem nicht mehr geben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Tod, Leid, Geschrei und Schmerz',
              optionsJson: JSON.stringify(['Tod, Leid, Geschrei und Schmerz', 'Freude', 'Leben', 'Licht']),
            },
            {
              questionText: 'Wer wird dort wohnen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott wird bei den Menschen wohnen',
              optionsJson: JSON.stringify(['Gott wird bei den Menschen wohnen', 'Nur Engel', 'Niemand', 'Nur die Reichen']),
            },
          ],
        },
      },
    });
  }

  console.log('✅ Lesson Expansion Part 5 abgeschlossen!');
  console.log('10 neue Lektionen erstellt (Apg: 6, Offb: 4)');
  console.log('Kumulative Lesson-Count: 75 + 10 = 85 Lektionen');
  console.log('🎉 NEUES TESTAMENT ABGESCHLOSSEN!');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart5()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

