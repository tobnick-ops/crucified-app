//  Lessons MASSIVE EXPANSION - 136 neue Lektionen
// Systematische Erweiterung nach Content Audit Plan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansion() {
  console.log('Starting MASSIVE Lesson Expansion...');

  // ===== EVANGELIEN =====
  
  // MATTHÄUS (2 zusätzliche → Total 5)
  const matthaeusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Mt' } });
  if (matthaeusBook) {
    await prisma.lesson.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Matthäus - Geburt und Kindheit Jesu',
        description: 'Lerne über die Geburt Jesu und die Weisen aus dem Morgenland.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 100,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wo wurde Jesus geboren?',
              questionType: 'multiple_choice',
              correctAnswer: 'Bethlehem',
              optionsJson: JSON.stringify(['Bethlehem', 'Nazareth', 'Jerusalem', 'Kapernaum']),
            },
            {
              questionText: 'Wer besuchte das neugeborene Jesus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Weisen aus dem Morgenland',
              optionsJson: JSON.stringify(['Die Weisen aus dem Morgenland', 'Die Pharisäer', 'Die Römer', 'Die Samariter']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Matthäus - Taufe und Versuchung Jesu',
        description: 'Verstehe Jesu Taufe durch Johannes und seine Versuchung in der Wüste.',
        difficulty: 'easy',
        requiredLevel: 2,
        experienceReward: 110,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer taufte Jesus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Johannes der Täufer',
              optionsJson: JSON.stringify(['Johannes der Täufer', 'Petrus', 'Ein Pharisäer', 'Ein Priester']),
            },
            {
              questionText: 'Wie lange wurde Jesus in der Wüste versucht?',
              questionType: 'multiple_choice',
              correctAnswer: '40 Tage',
              optionsJson: JSON.stringify(['40 Tage', '7 Tage', '3 Tage', '1 Tag']),
            },
          ],
        },
      },
    });
  }

  // MARKUS (4 zusätzliche → Total 5)
  const markusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Mk' } });
  if (markusBook) {
    await prisma.lesson.create({
      data: {
        bookId: markusBook.id,
        title: 'Markus - Der Anfang des Dienstes',
        description: 'Lerne über den Beginn von Jesu öffentlichem Wirken.',
        difficulty: 'easy',
        requiredLevel: 1,
        experienceReward: 100,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Jesu erste Botschaft?',
              questionType: 'multiple_choice',
              correctAnswer: 'Tut Buße und glaubt an das Evangelium',
              optionsJson: JSON.stringify(['Tut Buße und glaubt an das Evangelium', 'Liebt eure Feinde', 'Folgt mir nach', 'Verkauft alles']),
            },
            {
              questionText: 'Wen berief Jesus zuerst als Jünger?',
              questionType: 'multiple_choice',
              correctAnswer: 'Simon und Andreas',
              optionsJson: JSON.stringify(['Simon und Andreas', 'Johannes und Jakobus', 'Matthäus und Thomas', 'Petrus und Paulus']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: markusBook.id,
        title: 'Markus - Heilungen und Wunder',
        description: 'Verstehe die Heilungswunder Jesu und ihre Bedeutung.',
        difficulty: 'medium',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was zeigten Jesu Heilungen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Seine göttliche Macht und Barmherzigkeit',
              optionsJson: JSON.stringify(['Seine göttliche Macht und Barmherzigkeit', 'Seine medizinischen Kenntnisse', 'Seine Zauberkunst', 'Seinen Reichtum']),
            },
            {
              questionText: 'Warum heilte Jesus am Sabbat?',
              questionType: 'multiple_choice',
              correctAnswer: 'Um zu zeigen, dass Barmherzigkeit wichtiger ist als starre Regeln',
              optionsJson: JSON.stringify(['Um zu zeigen, dass Barmherzigkeit wichtiger ist als starre Regeln', 'Um die Pharisäer zu ärgern', 'Weil er das Gesetz nicht kannte', 'Aus Versehen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: markusBook.id,
        title: 'Markus - Der Weg nach Jerusalem',
        description: 'Folge Jesus auf seinem Weg nach Jerusalem.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was prophezeite Jesus über Jerusalem?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass er leiden und sterben würde',
              optionsJson: JSON.stringify(['Dass er leiden und sterben würde', 'Dass er König werden würde', 'Dass er fliehen würde', 'Dass er kämpfen würde']),
            },
            {
              questionText: 'Was bedeutet "den Kelch trinken"?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes Willen annehmen, auch wenn es Leiden bedeutet',
              optionsJson: JSON.stringify(['Gottes Willen annehmen, auch wenn es Leiden bedeutet', 'Wein trinken', 'Feiern', 'Fasten']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: markusBook.id,
        title: 'Markus - Die Passion',
        description: 'Verstehe das Leiden und Sterben Jesu im Markusevangelium.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was betete Jesus in Gethsemane?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nimm diesen Kelch von mir, doch nicht mein, sondern dein Wille',
              optionsJson: JSON.stringify(['Nimm diesen Kelch von mir, doch nicht mein, sondern dein Wille', 'Rette mich vor dem Tod', 'Ich will nicht sterben', 'Warum hast du mich verlassen']),
            },
            {
              questionText: 'Was rief Jesus am Kreuz?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mein Gott, mein Gott, warum hast du mich verlassen',
              optionsJson: JSON.stringify(['Mein Gott, mein Gott, warum hast du mich verlassen', 'Es ist vollbracht', 'Vater, in deine Hände', 'Ich habe Durst']),
            },
          ],
        },
      },
    });
  }

  // LUKAS (3 zusätzliche → Total 5)
  const lukasBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Lk' } });
  if (lukasBook) {
    await prisma.lesson.create({
      data: {
        bookId: lukasBook.id,
        title: 'Lukas - Der barmherzige Samariter',
        description: 'Lerne das Gleichnis vom barmherzigen Samariter.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 140,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer war der Nächste des Mannes, der überfallen wurde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Samariter, der ihm half',
              optionsJson: JSON.stringify(['Der Samariter, der ihm half', 'Der Priester', 'Der Levit', 'Keiner']),
            },
            {
              questionText: 'Was lehrt dieses Gleichnis?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nächstenliebe kennt keine Grenzen',
              optionsJson: JSON.stringify(['Nächstenliebe kennt keine Grenzen', 'Man soll vorsichtig sein', 'Priester sind wichtig', 'Reisen ist gefährlich']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: lukasBook.id,
        title: 'Lukas - Der verlorene Sohn',
        description: 'Verstehe das Gleichnis vom verlorenen Sohn und Gottes Liebe.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat der jüngere Sohn mit seinem Erbe?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er verprasste es in einem fernen Land',
              optionsJson: JSON.stringify(['Er verprasste es in einem fernen Land', 'Er investierte es weise', 'Er gab es den Armen', 'Er verlor es']),
            },
            {
              questionText: 'Wie reagierte der Vater auf die Rückkehr des Sohnes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er empfing ihn mit Freude und gab ein Fest',
              optionsJson: JSON.stringify(['Er empfing ihn mit Freude und gab ein Fest', 'Er war zornig', 'Er wies ihn ab', 'Er verlangte Wiedergutmachung']),
            },
            {
              questionText: 'Was symbolisiert der Vater in diesem Gleichnis?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes bedingungslose Liebe und Vergebung',
              optionsJson: JSON.stringify(['Gottes bedingungslose Liebe und Vergebung', 'Strenge Gerechtigkeit', 'Menschliche Schwäche', 'Weltliche Macht']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: lukasBook.id,
        title: 'Lukas - Die Emmaus-Jünger',
        description: 'Lerne über die Begegnung der Emmaus-Jünger mit dem auferstandenen Jesus.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wann erkannten die Jünger Jesus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Beim Brotbrechen',
              optionsJson: JSON.stringify(['Beim Brotbrechen', 'Am Anfang', 'An seiner Stimme', 'An seinen Wunden']),
            },
            {
              questionText: 'Was lehrte Jesus ihnen auf dem Weg?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Schriften über den Messias',
              optionsJson: JSON.stringify(['Die Schriften über den Messias', 'Neue Gebote', 'Griechische Philosophie', 'Römische Geschichte']),
            },
          ],
        },
      },
    });
  }

  // JOHANNES (2 zusätzliche → Total 5)
  const johannesBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Joh' } });
  if (johannesBook) {
    await prisma.lesson.create({
      data: {
        bookId: johannesBook.id,
        title: 'Johannes - Das Wort wurde Fleisch',
        description: 'Verstehe den Prolog des Johannesevangeliums.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war im Anfang?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Wort',
              optionsJson: JSON.stringify(['Das Wort', 'Das Licht', 'Die Welt', 'Der Mensch']),
            },
            {
              questionText: 'Was bedeutet "Das Wort wurde Fleisch"?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jesus, Gottes Sohn, wurde Mensch',
              optionsJson: JSON.stringify(['Jesus, Gottes Sohn, wurde Mensch', 'Die Bibel wurde geschrieben', 'Gott sprach zur Welt', 'Ein Prophet kam']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: johannesBook.id,
        title: 'Johannes - Das hohepriesterliche Gebet',
        description: 'Lerne Jesu Gebet für seine Jünger und alle Gläubigen.',
        difficulty: 'hard',
        requiredLevel: 10,
        experienceReward: 250,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wofür betete Jesus für seine Jünger?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass sie eins seien und bewahrt werden',
              optionsJson: JSON.stringify(['Dass sie eins seien und bewahrt werden', 'Dass sie reich werden', 'Dass sie mächtig werden', 'Dass sie gelehrt werden']),
            },
            {
              questionText: 'Was ist ewiges Leben laut Johannes 17?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott und Jesus Christus zu erkennen',
              optionsJson: JSON.stringify(['Gott und Jesus Christus zu erkennen', 'Nie zu sterben', 'Im Himmel zu sein', 'Lange zu leben']),
            },
          ],
        },
      },
    });
  }

  // ===== PAULUS-BRIEFE =====

  // 1. KORINTHER (3 zusätzliche → Total 5)
  const ersteKorintherBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Kor' } });
  if (ersteKorintherBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteKorintherBook.id,
        title: '1. Korinther - Einheit der Gemeinde',
        description: 'Lerne über die Wichtigkeit der Einheit in der Gemeinde.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 140,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war das Problem in Korinth?',
              questionType: 'multiple_choice',
              correctAnswer: 'Spaltungen und Parteiungen',
              optionsJson: JSON.stringify(['Spaltungen und Parteiungen', 'Zu viel Einheit', 'Armut', 'Verfolgung']),
            },
            {
              questionText: 'Was lehrt Paulus über Einheit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Alle sind ein Leib in Christus',
              optionsJson: JSON.stringify(['Alle sind ein Leib in Christus', 'Jeder soll für sich sein', 'Einheit ist unwichtig', 'Man muss sich trennen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteKorintherBook.id,
        title: '1. Korinther - Geistesgaben',
        description: 'Verstehe die verschiedenen Geistesgaben und ihren Zweck.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer gibt die Geistesgaben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Der Heilige Geist',
              optionsJson: JSON.stringify(['Der Heilige Geist', 'Die Apostel', 'Die Gemeinde', 'Man selbst']),
            },
            {
              questionText: 'Zu welchem Zweck werden Geistesgaben gegeben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zum Nutzen der Gemeinde',
              optionsJson: JSON.stringify(['Zum Nutzen der Gemeinde', 'Zur eigenen Ehre', 'Zur Macht', 'Zum Reichtum']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteKorintherBook.id,
        title: '1. Korinther - Die Ordnung der Gemeinde',
        description: 'Lerne über die Ordnung und Organisation der Gemeinde.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was soll im Gottesdienst geschehen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Alles zur Erbauung der Gemeinde',
              optionsJson: JSON.stringify(['Alles zur Erbauung der Gemeinde', 'Jeder redet durcheinander', 'Nur Zungenrede', 'Nur Gesang']),
            },
            {
              questionText: 'Was ist das Wichtigste in der Gemeinde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Liebe und Ordnung',
              optionsJson: JSON.stringify(['Liebe und Ordnung', 'Macht', 'Reichtum', 'Größe']),
            },
          ],
        },
      },
    });
  }

  console.log('Lesson Expansion: Evangelien und 1.Korinther abgeschlossen');
  console.log('Fortsetzung folgt in lessons-expansion-part2.ts...');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansion()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

