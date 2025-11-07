// Lessons EXPANSION Part 9 - Große Propheten
// 17 Lektionen (Jesaja, Jeremia, Hesekiel, Daniel)
// FINAL PUSH ZUM 150+ ZIEL!

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart9() {
  console.log('Starting Lesson Expansion Part 9: Große Propheten...');
  console.log('FINAL PUSH zum 150+ Lessons Ziel!');

  // JESAJA (5 Lektionen)
  const jesajaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jes' } });
  if (jesajaBook) {
    await prisma.lesson.create({
      data: {
        bookId: jesajaBook.id,
        title: 'Jesaja - Die Berufung des Propheten',
        description: 'Lerne über Jesajas Vision und Berufung.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Jesaja in seiner Vision?',
              questionType: 'multiple_choice',
              correctAnswer: 'Den HERRN auf einem hohen Thron',
              optionsJson: JSON.stringify(['Den HERRN auf einem hohen Thron', 'Einen Engel', 'Einen König', 'Nichts']),
            },
            {
              questionText: 'Was riefen die Seraphim?',
              questionType: 'multiple_choice',
              correctAnswer: 'Heilig, heilig, heilig ist der HERR',
              optionsJson: JSON.stringify(['Heilig, heilig, heilig ist der HERR', 'Gepriesen sei Gott', 'Halleluja', 'Amen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jesajaBook.id,
        title: 'Jesaja - Der leidende Gottesknecht',
        description: 'Verstehe die Prophezeiung über den leidenden Messias.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagt Jesaja 53 über den Gottesknecht?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er trug unsere Krankheiten und litt für unsere Sünden',
              optionsJson: JSON.stringify(['Er trug unsere Krankheiten und litt für unsere Sünden', 'Er herrschte als König', 'Er war mächtig', 'Er war reich']),
            },
            {
              questionText: 'Auf wen weist Jesaja 53 hin?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf Jesus Christus',
              optionsJson: JSON.stringify(['Auf Jesus Christus', 'Auf Jesaja selbst', 'Auf David', 'Auf niemanden']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jesajaBook.id,
        title: 'Jesaja - Der kommende König',
        description: 'Lerne über die messianischen Verheißungen.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was wird über das Kind gesagt, das geboren wird?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wunder-Rat, Gott-Held, Ewig-Vater, Friede-Fürst',
              optionsJson: JSON.stringify(['Wunder-Rat, Gott-Held, Ewig-Vater, Friede-Fürst', 'Ein normales Kind', 'Ein Krieger', 'Ein Priester']),
            },
            {
              questionText: 'Wo wird der König herrschen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf dem Thron Davids für immer',
              optionsJson: JSON.stringify(['Auf dem Thron Davids für immer', 'Nur kurz', 'Nirgendwo', 'In Babylon']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jesajaBook.id,
        title: 'Jesaja - Trost für Israel',
        description: 'Verstehe Gottes Trost und Verheißungen für sein Volk.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Gottes Botschaft in Jesaja 40?',
              questionType: 'multiple_choice',
              correctAnswer: 'Tröstet, tröstet mein Volk',
              optionsJson: JSON.stringify(['Tröstet, tröstet mein Volk', 'Fürchtet euch', 'Flieht', 'Kämpft']),
            },
            {
              questionText: 'Wie wird die Wüste?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie wird blühen wie eine Rose',
              optionsJson: JSON.stringify(['Sie wird blühen wie eine Rose', 'Sie bleibt trocken', 'Sie wird größer', 'Sie verschwindet']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jesajaBook.id,
        title: 'Jesaja - Die Gerechtigkeit Gottes',
        description: 'Lerne über Gottes Gerechtigkeit und Heil.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sind unsere Gerechtigkeiten laut Jesaja?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wie ein beflecktes Kleid',
              optionsJson: JSON.stringify(['Wie ein beflecktes Kleid', 'Perfekt', 'Ausreichend', 'Sehr gut']),
            },
            {
              questionText: 'Wer ist gerecht?',
              questionType: 'multiple_choice',
              correctAnswer: 'Allein Gott',
              optionsJson: JSON.stringify(['Allein Gott', 'Alle Menschen', 'Die Guten', 'Die Reichen']),
            },
          ],
        },
      },
    });
  }

  // JEREMIA (4 Lektionen)
  const jeremiaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jer' } });
  if (jeremiaBook) {
    await prisma.lesson.create({
      data: {
        bookId: jeremiaBook.id,
        title: 'Jeremia - Der weinende Prophet',
        description: 'Lerne über Jeremias schweren Dienst.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was musste Jeremia verkünden?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes Gericht über Jerusalem',
              optionsJson: JSON.stringify(['Gottes Gericht über Jerusalem', 'Nur Segen', 'Nur Freude', 'Nur Frieden']),
            },
            {
              questionText: 'Wie reagierte das Volk auf Jeremia?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie verfolgten und lehnten ihn ab',
              optionsJson: JSON.stringify(['Sie verfolgten und lehnten ihn ab', 'Sie jubelten', 'Sie gehorchten', 'Sie liebten ihn']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jeremiaBook.id,
        title: 'Jeremia - Der neue Bund',
        description: 'Verstehe Gottes Verheißung eines neuen Bundes.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was verspricht Gott im neuen Bund?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sein Gesetz in ihre Herzen zu schreiben',
              optionsJson: JSON.stringify(['Sein Gesetz in ihre Herzen zu schreiben', 'Reichtum', 'Macht', 'Weisheit']),
            },
            {
              questionText: 'Was wird Gott mit den Sünden tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ihrer nicht mehr gedenken',
              optionsJson: JSON.stringify(['Ihrer nicht mehr gedenken', 'Sie aufschreiben', 'Sie bestrafen', 'Sie zeigen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jeremiaBook.id,
        title: 'Jeremia - Jeremia in der Grube',
        description: 'Lerne über Jeremias Leiden und Gottes Bewahrung.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum wurde Jeremia in die Grube geworfen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil er Gottes Gericht prophezeite',
              optionsJson: JSON.stringify(['Weil er Gottes Gericht prophezeite', 'Weil er stahl', 'Weil er log', 'Ohne Grund']),
            },
            {
              questionText: 'Was zeigt Jeremias Geschichte?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes Treue bewahrt seine Diener',
              optionsJson: JSON.stringify(['Gottes Treue bewahrt seine Diener', 'Propheten haben es leicht', 'Man sollte schweigen', 'Gott ist fern']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: jeremiaBook.id,
        title: 'Jeremia - Hoffnung trotz Gericht',
        description: 'Verstehe Gottes Verheißung der Wiederherstellung.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was verspricht Gott trotz des Gerichts?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wiederherstellung und Rückkehr',
              optionsJson: JSON.stringify(['Wiederherstellung und Rückkehr', 'Völlige Zerstörung', 'Vergessen', 'Nichts']),
            },
            {
              questionText: 'Was sind Gottes Gedanken über uns?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gedanken des Friedens und einer Zukunft',
              optionsJson: JSON.stringify(['Gedanken des Friedens und einer Zukunft', 'Gedanken des Unheils', 'Keine Gedanken', 'Gedanken der Rache']),
            },
          ],
        },
      },
    });
  }

  // HESEKIEL (4 Lektionen)
  const hesekielBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Hes' } });
  if (hesekielBook) {
    await prisma.lesson.create({
      data: {
        bookId: hesekielBook.id,
        title: 'Hesekiel - Die Vision der Herrlichkeit',
        description: 'Lerne über Hesekiels Vision von Gottes Herrlichkeit.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Hesekiel in seiner Vision?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Herrlichkeit Gottes auf einem Thronwagen',
              optionsJson: JSON.stringify(['Die Herrlichkeit Gottes auf einem Thronwagen', 'Einen Tempel', 'Eine Stadt', 'Einen Berg']),
            },
            {
              questionText: 'Was waren die vier lebendigen Wesen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Cherubim mit vier Gesichtern',
              optionsJson: JSON.stringify(['Cherubim mit vier Gesichtern', 'Menschen', 'Tiere', 'Engel']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hesekielBook.id,
        title: 'Hesekiel - Das Tal der Totengebeine',
        description: 'Verstehe die Vision von der Auferweckung Israels.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Hesekiel im Tal?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sehr viele Totengebeine',
              optionsJson: JSON.stringify(['Sehr viele Totengebeine', 'Lebendige Menschen', 'Tiere', 'Einen Tempel']),
            },
            {
              questionText: 'Was geschah mit den Gebeinen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie wurden lebendig und ein großes Heer entstand',
              optionsJson: JSON.stringify(['Sie wurden lebendig und ein großes Heer entstand', 'Nichts', 'Sie zerfielen', 'Sie wurden begraben']),
            },
            {
              questionText: 'Was symbolisiert diese Vision?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Wiederherstellung Israels durch Gottes Geist',
              optionsJson: JSON.stringify(['Die Wiederherstellung Israels durch Gottes Geist', 'Nur den Tod', 'Nur das Leben', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hesekielBook.id,
        title: 'Hesekiel - Der neue Tempel',
        description: 'Lerne über Hesekiels Vision des zukünftigen Tempels.',
        difficulty: 'hard',
        requiredLevel: 9,
        experienceReward: 220,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Hesekiel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Einen neuen, herrlichen Tempel',
              optionsJson: JSON.stringify(['Einen neuen, herrlichen Tempel', 'Den alten Tempel', 'Keine Tempel', 'Eine Stadt']),
            },
            {
              questionText: 'Was symbolisiert der neue Tempel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gottes Gegenwart bei seinem Volk',
              optionsJson: JSON.stringify(['Gottes Gegenwart bei seinem Volk', 'Nur ein Gebäude', 'Reichtum', 'Macht']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: hesekielBook.id,
        title: 'Hesekiel - Der gute Hirte',
        description: 'Verstehe Gottes Verheißung, selbst der Hirte zu sein.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was verspricht Gott seinem Volk?',
              questionType: 'multiple_choice',
              correctAnswer: 'Selbst ihr Hirte zu sein',
              optionsJson: JSON.stringify(['Selbst ihr Hirte zu sein', 'Sie zu verlassen', 'Sie zu bestrafen', 'Sie zu vergessen']),
            },
            {
              questionText: 'Was wird Gott mit den verlorenen Schafen tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie suchen, heilen und sammeln',
              optionsJson: JSON.stringify(['Sie suchen, heilen und sammeln', 'Sie lassen', 'Sie bestrafen', 'Nichts']),
            },
          ],
        },
      },
    });
  }

  // DANIEL (4 Lektionen)
  const danielBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Dan' } });
  if (danielBook) {
    await prisma.lesson.create({
      data: {
        bookId: danielBook.id,
        title: 'Daniel - Daniel in Babylon',
        description: 'Lerne über Daniels Treue in der Fremde.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat Daniel trotz der Verbote?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er betete dreimal täglich zu Gott',
              optionsJson: JSON.stringify(['Er betete dreimal täglich zu Gott', 'Er hörte auf zu beten', 'Er floh', 'Er versteckte sich']),
            },
            {
              questionText: 'Was zeigt Daniels Treue?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass man Gott mehr gehorchen muss als Menschen',
              optionsJson: JSON.stringify(['Dass man Gott mehr gehorchen muss als Menschen', 'Dass man Menschen gehorchen soll', 'Dass Beten unwichtig ist', 'Dass man schweigen soll']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: danielBook.id,
        title: 'Daniel - Die Löwengrube',
        description: 'Verstehe, wie Gott Daniel in der Löwengrube bewahrte.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum wurde Daniel in die Löwengrube geworfen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weil er zu Gott betete trotz Verbot',
              optionsJson: JSON.stringify(['Weil er zu Gott betete trotz Verbot', 'Weil er stahl', 'Weil er log', 'Ohne Grund']),
            },
            {
              questionText: 'Was geschah in der Löwengrube?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott schloss die Mäuler der Löwen',
              optionsJson: JSON.stringify(['Gott schloss die Mäuler der Löwen', 'Die Löwen fraßen ihn', 'Die Löwen flohen', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: danielBook.id,
        title: 'Daniel - Der Feuerofen',
        description: 'Lerne über die drei Freunde Daniels im Feuerofen.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer waren Daniels drei Freunde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Schadrach, Meschach und Abednego',
              optionsJson: JSON.stringify(['Schadrach, Meschach und Abednego', 'Petrus, Jakobus und Johannes', 'Abraham, Isaak und Jakob', 'Paulus, Silas und Timotheus']),
            },
            {
              questionText: 'Was geschah im Feuerofen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott bewahrte sie und man sah einen vierten im Feuer',
              optionsJson: JSON.stringify(['Gott bewahrte sie und man sah einen vierten im Feuer', 'Sie verbrannten', 'Sie flohen', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: danielBook.id,
        title: 'Daniel - Daniels Visionen',
        description: 'Verstehe Daniels prophetische Visionen über die Zukunft.',
        difficulty: 'hard',
        requiredLevel: 9,
        experienceReward: 230,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sah Daniel in seinen Visionen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Weltreiche und den Menschensohn',
              optionsJson: JSON.stringify(['Weltreiche und den Menschensohn', 'Nur Tiere', 'Nur Engel', 'Nichts']),
            },
            {
              questionText: 'Auf wen weisen Daniels Visionen hin?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf das Reich Gottes und den Messias',
              optionsJson: JSON.stringify(['Auf das Reich Gottes und den Messias', 'Auf Babylon', 'Auf Rom', 'Auf nichts']),
            },
          ],
        },
      },
    });
  }

  console.log('✅ Lesson Expansion Part 9 abgeschlossen!');
  console.log('17 neue Lektionen erstellt (Große Propheten)');
  console.log('  Jesaja: 5, Jeremia: 4, Hesekiel: 4, Daniel: 4');
  console.log('Kumulative Lesson-Count: 134 + 17 = 151 Lektionen');
  console.log('🎉🎉🎉 150+ LESSONS ZIEL ERREICHT! 🎉🎉🎉');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart9()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

