// Lessons EXPANSION Part 2 - Paulus-Briefe & Katholische Briefe
// Fortsetzung der massiven Lesson-Erweiterung

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart2() {
  console.log('Starting Lesson Expansion Part 2: Paulus-Briefe...');

  // 2. KORINTHER (3 Lektionen)
  const zweiteKorintherBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Kor' } });
  if (zweiteKorintherBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteKorintherBook.id,
        title: '2. Korinther - Trost in Bedrängnis',
        description: 'Lerne, wie Gott uns in allen Nöten tröstet.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer ist der Gott allen Trostes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott, der Vater unseres Herrn Jesus Christus',
              optionsJson: JSON.stringify(['Gott, der Vater unseres Herrn Jesus Christus', 'Der Heilige Geist', 'Die Apostel', 'Die Gemeinde']),
            },
            {
              questionText: 'Warum tröstet Gott uns?',
              questionType: 'multiple_choice',
              correctAnswer: 'Damit wir andere trösten können',
              optionsJson: JSON.stringify(['Damit wir andere trösten können', 'Damit wir reich werden', 'Damit wir stark werden', 'Damit wir herrschen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteKorintherBook.id,
        title: '2. Korinther - Der Dienst der Versöhnung',
        description: 'Verstehe den Dienst der Versöhnung durch Christus.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was hat Gott durch Christus getan?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er hat uns mit sich versöhnt',
              optionsJson: JSON.stringify(['Er hat uns mit sich versöhnt', 'Er hat uns reich gemacht', 'Er hat uns mächtig gemacht', 'Er hat uns weise gemacht']),
            },
            {
              questionText: 'Was sind wir als Christen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Botschafter an Christi statt',
              optionsJson: JSON.stringify(['Botschafter an Christi statt', 'Richter', 'Könige', 'Priester']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteKorintherBook.id,
        title: '2. Korinther - Paulus\' Schwachheit und Stärke',
        description: 'Lerne, wie Gottes Kraft in der Schwachheit mächtig ist.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagte Gott zu Paulus über seine Schwachheit?',
              questionType: 'multiple_choice',
              correctAnswer: 'Meine Kraft ist in den Schwachen mächtig',
              optionsJson: JSON.stringify(['Meine Kraft ist in den Schwachen mächtig', 'Du musst stärker werden', 'Schwachheit ist Sünde', 'Schwachheit ist zu vermeiden']),
            },
            {
              questionText: 'Was war Paulus\' Dorn im Fleisch?',
              questionType: 'multiple_choice',
              correctAnswer: 'Eine ungenannte Schwachheit, die ihn demütig hielt',
              optionsJson: JSON.stringify(['Eine ungenannte Schwachheit, die ihn demütig hielt', 'Eine Krankheit', 'Armut', 'Verfolgung']),
            },
          ],
        },
      },
    });
  }

  // GALATER (2 zusätzliche → Total 3)
  const galaterBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Gal' } });
  if (galaterBook) {
    await prisma.lesson.create({
      data: {
        bookId: galaterBook.id,
        title: 'Galater - Gerechtfertigt durch Glauben',
        description: 'Verstehe, dass wir durch Glauben, nicht durch Werke, gerecht werden.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie wird man gerecht vor Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch Glauben an Jesus Christus',
              optionsJson: JSON.stringify(['Durch Glauben an Jesus Christus', 'Durch das Gesetz', 'Durch gute Werke', 'Durch Beschneidung']),
            },
            {
              questionText: 'Was lehrt Paulus über das Gesetz?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Gesetz war unser Erzieher bis Christus kam',
              optionsJson: JSON.stringify(['Das Gesetz war unser Erzieher bis Christus kam', 'Das Gesetz rettet uns', 'Das Gesetz ist unwichtig', 'Das Gesetz ist Sünde']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: galaterBook.id,
        title: 'Galater - Leben im Geist',
        description: 'Lerne über das Leben im Geist und die Früchte des Geistes.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Gegenteil von Leben im Geist?',
              questionType: 'multiple_choice',
              correctAnswer: 'Leben im Fleisch',
              optionsJson: JSON.stringify(['Leben im Fleisch', 'Leben in Armut', 'Leben in Schwachheit', 'Leben in Unwissenheit']),
            },
            {
              questionText: 'Nenne eine Frucht des Geistes.',
              questionType: 'multiple_choice',
              correctAnswer: 'Liebe',
              optionsJson: JSON.stringify(['Liebe', 'Stolz', 'Zorn', 'Neid']),
            },
          ],
        },
      },
    });
  }

  // EPHESER (4 Lektionen)
  const epheserBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Eph' } });
  if (epheserBook) {
    await prisma.lesson.create({
      data: {
        bookId: epheserBook.id,
        title: 'Epheser - Erwählt in Christus',
        description: 'Lerne über Gottes ewigen Plan und unsere Erwählung.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wann hat Gott uns erwählt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Vor Grundlegung der Welt',
              optionsJson: JSON.stringify(['Vor Grundlegung der Welt', 'Bei unserer Geburt', 'Bei unserer Taufe', 'Nach unserem Tod']),
            },
            {
              questionText: 'Zu was hat Gott uns erwählt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass wir heilig und untadelig vor ihm seien',
              optionsJson: JSON.stringify(['Dass wir heilig und untadelig vor ihm seien', 'Dass wir reich werden', 'Dass wir herrschen', 'Dass wir Engel werden']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: epheserBook.id,
        title: 'Epheser - Gnade durch Glauben',
        description: 'Verstehe die Errettung durch Gnade mittels des Glaubens.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wodurch sind wir gerettet?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch Gnade mittels des Glaubens',
              optionsJson: JSON.stringify(['Durch Gnade mittels des Glaubens', 'Durch Werke', 'Durch das Gesetz', 'Durch Opfer']),
            },
            {
              questionText: 'Was sagt Epheser 2:8-9 über Werke?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nicht aus Werken, damit niemand sich rühme',
              optionsJson: JSON.stringify(['Nicht aus Werken, damit niemand sich rühme', 'Werke sind notwendig', 'Werke retten uns', 'Werke sind unwichtig']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: epheserBook.id,
        title: 'Epheser - Die Rüstung Gottes',
        description: 'Lerne über die geistliche Waffenrüstung Gottes.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Gegen wen kämpfen wir?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gegen geistliche Mächte der Bosheit',
              optionsJson: JSON.stringify(['Gegen geistliche Mächte der Bosheit', 'Gegen Menschen', 'Gegen Fleisch und Blut', 'Gegen die Welt']),
            },
            {
              questionText: 'Was ist das Schwert des Geistes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Wort Gottes',
              optionsJson: JSON.stringify(['Das Wort Gottes', 'Ein echtes Schwert', 'Unser Verstand', 'Unsere Kraft']),
            },
            {
              questionText: 'Warum sollen wir die Waffenrüstung anlegen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Um gegen die Listen des Teufels bestehen zu können',
              optionsJson: JSON.stringify(['Um gegen die Listen des Teufels bestehen zu können', 'Um stark auszusehen', 'Um zu kämpfen', 'Um zu herrschen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: epheserBook.id,
        title: 'Epheser - Einheit der Gemeinde',
        description: 'Verstehe die Einheit des Leibes Christi.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was gibt es in der Gemeinde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ein Leib, ein Geist, ein Herr, ein Glaube, eine Taufe',
              optionsJson: JSON.stringify(['Ein Leib, ein Geist, ein Herr, ein Glaube, eine Taufe', 'Viele Leiber', 'Verschiedene Glauben', 'Unterschiedliche Herren']),
            },
            {
              questionText: 'Wozu hat Gott verschiedene Gaben gegeben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zur Zurüstung der Heiligen für den Dienst',
              optionsJson: JSON.stringify(['Zur Zurüstung der Heiligen für den Dienst', 'Zur Konkurrenz', 'Zur Spaltung', 'Zur Ehre einzelner']),
            },
          ],
        },
      },
    });
  }

  // PHILIPPER (3 Lektionen)
  const philipperBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Phil' } });
  if (philipperBook) {
    await prisma.lesson.create({
      data: {
        bookId: philipperBook.id,
        title: 'Philipper - Freude im Herrn',
        description: 'Lerne über die Freude, die wir in Christus haben.',
        difficulty: 'easy',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist das Hauptthema des Philipperbriefes?',
              questionType: 'multiple_choice',
              correctAnswer: 'Freude im Herrn',
              optionsJson: JSON.stringify(['Freude im Herrn', 'Traurigkeit', 'Zorn', 'Angst']),
            },
            {
              questionText: 'Was sagt Paulus über Sorgen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sorgt euch um nichts',
              optionsJson: JSON.stringify(['Sorgt euch um nichts', 'Sorgt euch um alles', 'Sorgen ist gut', 'Sorgen ist Weisheit']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: philipperBook.id,
        title: 'Philipper - Die Demut Christi',
        description: 'Verstehe die Demut und Erniedrigung Christi.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat Christus laut Philipper 2?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er entäußerte sich selbst und nahm Knechtsgestalt an',
              optionsJson: JSON.stringify(['Er entäußerte sich selbst und nahm Knechtsgestalt an', 'Er blieb im Himmel', 'Er herrschte über alle', 'Er wurde reich']),
            },
            {
              questionText: 'Bis wozu war Christus gehorsam?',
              questionType: 'multiple_choice',
              correctAnswer: 'Bis zum Tod am Kreuz',
              optionsJson: JSON.stringify(['Bis zum Tod am Kreuz', 'Bis zum Beginn', 'Bis zur Hälfte', 'Teilweise']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: philipperBook.id,
        title: 'Philipper - Streben nach dem Ziel',
        description: 'Lerne über das Streben nach dem himmlischen Ziel.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was ist Paulus\' Ziel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Christus zu erkennen und den Preis der himmlischen Berufung zu ergreifen',
              optionsJson: JSON.stringify(['Christus zu erkennen und den Preis der himmlischen Berufung zu ergreifen', 'Reich zu werden', 'Berühmt zu werden', 'Macht zu haben']),
            },
            {
              questionText: 'Was vergisst Paulus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Was dahinten ist',
              optionsJson: JSON.stringify(['Was dahinten ist', 'Das Evangelium', 'Christus', 'Seine Aufgabe']),
            },
          ],
        },
      },
    });
  }

  // KOLOSSER (3 Lektionen)
  const kolosserBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Kol' } });
  if (kolosserBook) {
    await prisma.lesson.create({
      data: {
        bookId: kolosserBook.id,
        title: 'Kolosser - Christus über alles',
        description: 'Lerne über die Vorrangstellung Christi über alles.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer ist Christus laut Kolosser 1?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Ebenbild des unsichtbaren Gottes, der Erstgeborene aller Schöpfung',
              optionsJson: JSON.stringify(['Das Ebenbild des unsichtbaren Gottes, der Erstgeborene aller Schöpfung', 'Ein Prophet', 'Ein Engel', 'Ein guter Mensch']),
            },
            {
              questionText: 'Wodurch wurde alles geschaffen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Durch Christus',
              optionsJson: JSON.stringify(['Durch Christus', 'Durch Menschen', 'Durch Engel', 'Durch Zufall']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: kolosserBook.id,
        title: 'Kolosser - Gestorben und auferweckt mit Christus',
        description: 'Verstehe, was es bedeutet, mit Christus gestorben und auferweckt zu sein.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir suchen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Was droben ist, wo Christus ist',
              optionsJson: JSON.stringify(['Was droben ist, wo Christus ist', 'Irdische Dinge', 'Reichtum', 'Ehre']),
            },
            {
              questionText: 'Was ist unser Leben?',
              questionType: 'multiple_choice',
              correctAnswer: 'Verborgen mit Christus in Gott',
              optionsJson: JSON.stringify(['Verborgen mit Christus in Gott', 'Sichtbar für alle', 'Auf der Erde', 'Vergänglich']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: kolosserBook.id,
        title: 'Kolosser - Das neue Leben',
        description: 'Lerne über das neue Leben in Christus.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sollen wir ablegen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Den alten Menschen mit seinen Handlungen',
              optionsJson: JSON.stringify(['Den alten Menschen mit seinen Handlungen', 'Unsere Kleidung', 'Unsere Familie', 'Unsere Arbeit']),
            },
            {
              questionText: 'Was sollen wir anziehen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Den neuen Menschen, der erneuert wird',
              optionsJson: JSON.stringify(['Den neuen Menschen, der erneuert wird', 'Neue Kleidung', 'Stolz', 'Zorn']),
            },
          ],
        },
      },
    });
  }

  console.log('Lesson Expansion Part 2: Paulus-Briefe abgeschlossen');
  console.log('25 neue Lektionen erstellt (2.Kor, Gal, Eph, Phil, Kol)');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart2()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

