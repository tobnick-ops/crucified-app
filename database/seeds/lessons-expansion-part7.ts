// Lessons EXPANSION Part 7 - Geschichtsbücher
// 18 Lektionen (Josua, Richter, Samuel, Könige, Esra, Nehemia, Esther)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonsExpansionPart7() {
  console.log('Starting Lesson Expansion Part 7: Geschichtsbücher...');

  // JOSUA (3 Lektionen)
  const josuaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jos' } });
  if (josuaBook) {
    await prisma.lesson.create({
      data: {
        bookId: josuaBook.id,
        title: 'Josua - Die Eroberung Jerichos',
        description: 'Lerne, wie Jericho durch Glauben und Gehorsam fiel.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie sollte Israel Jericho erobern?',
              questionType: 'multiple_choice',
              correctAnswer: 'Indem sie sieben Tage um die Mauern marschierten',
              optionsJson: JSON.stringify(['Indem sie sieben Tage um die Mauern marschierten', 'Mit Waffen', 'Mit Belagerungstürmen', 'Durch Verhandlung']),
            },
            {
              questionText: 'Was geschah am siebten Tag?',
              questionType: 'multiple_choice',
              correctAnswer: 'Die Mauern fielen und Israel eroberte die Stadt',
              optionsJson: JSON.stringify(['Die Mauern fielen und Israel eroberte die Stadt', 'Nichts', 'Sie gaben auf', 'Sie flohen']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: josuaBook.id,
        title: 'Josua - Das verheißene Land',
        description: 'Verstehe die Verteilung des verheißenen Landes.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie viele Stämme Israels gab es?',
              questionType: 'multiple_choice',
              correctAnswer: 'Zwölf',
              optionsJson: JSON.stringify(['Zwölf', 'Zehn', 'Sieben', 'Drei']),
            },
            {
              questionText: 'Was tat Gott mit den Feinden Israels?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er vertrieb sie vor Israel',
              optionsJson: JSON.stringify(['Er vertrieb sie vor Israel', 'Er half ihnen', 'Nichts', 'Er rettete sie']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: josuaBook.id,
        title: 'Josua - Abschiedsrede',
        description: 'Lerne Josuas letzte Worte an Israel.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was forderte Josua das Volk auf zu wählen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wem sie dienen wollen - dem HERRN oder anderen Göttern',
              optionsJson: JSON.stringify(['Wem sie dienen wollen - dem HERRN oder anderen Göttern', 'Einen König', 'Ein Land', 'Eine Stadt']),
            },
            {
              questionText: 'Was sagte Josua für sich und sein Haus?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wir wollen dem HERRN dienen',
              optionsJson: JSON.stringify(['Wir wollen dem HERRN dienen', 'Wir wollen reich werden', 'Wir wollen herrschen', 'Wir wollen ruhen']),
            },
          ],
        },
      },
    });
  }

  // RICHTER (4 Lektionen)
  const richterBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Ri' } });
  if (richterBook) {
    await prisma.lesson.create({
      data: {
        bookId: richterBook.id,
        title: 'Richter - Debora und Barak',
        description: 'Lerne über Debora, die Richterin und Prophetin.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Debora?',
              questionType: 'multiple_choice',
              correctAnswer: 'Eine Richterin und Prophetin',
              optionsJson: JSON.stringify(['Eine Richterin und Prophetin', 'Eine Königin', 'Eine Priesterin', 'Eine Händlerin']),
            },
            {
              questionText: 'Wen rief Debora zum Kampf?',
              questionType: 'multiple_choice',
              correctAnswer: 'Barak',
              optionsJson: JSON.stringify(['Barak', 'David', 'Salomo', 'Mose']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: richterBook.id,
        title: 'Richter - Gideon',
        description: 'Verstehe, wie Gideon mit 300 Mann siegte.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie viele Männer hatte Gideon für die Schlacht?',
              questionType: 'multiple_choice',
              correctAnswer: '300',
              optionsJson: JSON.stringify(['300', '1000', '10000', '12']),
            },
            {
              questionText: 'Warum reduzierte Gott Gideons Armee?',
              questionType: 'multiple_choice',
              correctAnswer: 'Damit Israel nicht denkt, sie hätten sich selbst gerettet',
              optionsJson: JSON.stringify(['Damit Israel nicht denkt, sie hätten sich selbst gerettet', 'Weil die Soldaten schlecht waren', 'Ohne Grund', 'Zur Strafe']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: richterBook.id,
        title: 'Richter - Simson',
        description: 'Lerne über Simson, den starken Mann mit großer Schwäche.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Simsons Geheimnis?',
              questionType: 'multiple_choice',
              correctAnswer: 'Seine ungeschnittenen Haare als Zeichen seines Nasiräats',
              optionsJson: JSON.stringify(['Seine ungeschnittenen Haare als Zeichen seines Nasiräats', 'Seine Muskeln', 'Seine Waffen', 'Seine Weisheit']),
            },
            {
              questionText: 'Wer verriet Simson?',
              questionType: 'multiple_choice',
              correctAnswer: 'Delila',
              optionsJson: JSON.stringify(['Delila', 'Seine Mutter', 'Sein Bruder', 'Ein Freund']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: richterBook.id,
        title: 'Richter - Rut',
        description: 'Lerne über Ruts Treue und Hingabe.',
        difficulty: 'easy',
        requiredLevel: 3,
        experienceReward: 140,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagte Rut zu Noomi?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wo du hingehst, da will ich auch hingehen',
              optionsJson: JSON.stringify(['Wo du hingehst, da will ich auch hingehen', 'Ich gehe zurück', 'Ich bleibe hier', 'Ich gehe allein']),
            },
            {
              questionText: 'Wen heiratete Rut?',
              questionType: 'multiple_choice',
              correctAnswer: 'Boas',
              optionsJson: JSON.stringify(['Boas', 'David', 'Salomo', 'Niemanden']),
            },
          ],
        },
      },
    });
  }

  // 1. SAMUEL (4 Lektionen)
  const ersteSamuelBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Sam' } });
  if (ersteSamuelBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteSamuelBook.id,
        title: '1. Samuel - Samuel wird geboren',
        description: 'Lerne über Hannas Gebet und Samuels Geburt.',
        difficulty: 'easy',
        requiredLevel: 2,
        experienceReward: 120,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat Hanna im Tempel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie betete um einen Sohn',
              optionsJson: JSON.stringify(['Sie betete um einen Sohn', 'Sie opferte', 'Sie sang', 'Sie lehrte']),
            },
            {
              questionText: 'Was versprach Hanna Gott?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass sie ihren Sohn dem HERRN weihen würde',
              optionsJson: JSON.stringify(['Dass sie ihren Sohn dem HERRN weihen würde', 'Dass sie reich wird', 'Dass sie betet', 'Nichts']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteSamuelBook.id,
        title: '1. Samuel - Saul wird König',
        description: 'Verstehe, wie Israel seinen ersten König bekam.',
        difficulty: 'medium',
        requiredLevel: 3,
        experienceReward: 150,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum wollte Israel einen König?',
              questionType: 'multiple_choice',
              correctAnswer: 'Um zu sein wie die anderen Nationen',
              optionsJson: JSON.stringify(['Um zu sein wie die anderen Nationen', 'Weil Gott es befahl', 'Ohne Grund', 'Weil sie reich werden wollten']),
            },
            {
              questionText: 'Was warnte Samuel vor einem König?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass der König sie ausbeuten und unterdrücken würde',
              optionsJson: JSON.stringify(['Dass der König sie ausbeuten und unterdrücken würde', 'Dass er gut sein würde', 'Nichts', 'Dass er weise sein würde']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteSamuelBook.id,
        title: '1. Samuel - David und Goliath',
        description: 'Lerne über Davids Glauben im Kampf gegen Goliath.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Mit was besiegte David Goliath?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mit einer Schleuder und einem Stein',
              optionsJson: JSON.stringify(['Mit einer Schleuder und einem Stein', 'Mit einem Schwert', 'Mit einer Lanze', 'Mit bloßen Händen']),
            },
            {
              questionText: 'Was sagte David zu Goliath?',
              questionType: 'multiple_choice',
              correctAnswer: 'Du kommst mit Schwert, ich komme im Namen des HERRN',
              optionsJson: JSON.stringify(['Du kommst mit Schwert, ich komme im Namen des HERRN', 'Ich fürchte mich', 'Lass uns Frieden schließen', 'Fliehe!']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteSamuelBook.id,
        title: '1. Samuel - David und Jonathan',
        description: 'Verstehe die tiefe Freundschaft zwischen David und Jonathan.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was verband David und Jonathan?',
              questionType: 'multiple_choice',
              correctAnswer: 'Eine tiefe Freundschaft und ein Bund vor Gott',
              optionsJson: JSON.stringify(['Eine tiefe Freundschaft und ein Bund vor Gott', 'Geschäft', 'Krieg', 'Nichts']),
            },
            {
              questionText: 'Was tat Jonathan für David?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er schützte ihn vor seinem Vater Saul',
              optionsJson: JSON.stringify(['Er schützte ihn vor seinem Vater Saul', 'Er verriet ihn', 'Er verließ ihn', 'Nichts']),
            },
          ],
        },
      },
    });
  }

  // 2. SAMUEL (3 Lektionen)
  const zweiteSamuelBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Sam' } });
  if (zweiteSamuelBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteSamuelBook.id,
        title: '2. Samuel - David wird König',
        description: 'Lerne über Davids Herrschaft als König Israels.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Über welchen Stamm wurde David zuerst König?',
              questionType: 'multiple_choice',
              correctAnswer: 'Über Juda',
              optionsJson: JSON.stringify(['Über Juda', 'Über Israel', 'Über Benjamin', 'Über Levi']),
            },
            {
              questionText: 'Wo machte David seine Hauptstadt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Jerusalem',
              optionsJson: JSON.stringify(['Jerusalem', 'Bethlehem', 'Hebron', 'Nazareth']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteSamuelBook.id,
        title: '2. Samuel - Der Bund mit David',
        description: 'Verstehe Gottes ewigen Bund mit David.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was versprach Gott David?',
              questionType: 'multiple_choice',
              correctAnswer: 'Dass sein Thron ewig bestehen würde',
              optionsJson: JSON.stringify(['Dass sein Thron ewig bestehen würde', 'Dass er reich wird', 'Dass er stark wird', 'Nichts']),
            },
            {
              questionText: 'Auf wen wies dieser Bund hin?',
              questionType: 'multiple_choice',
              correctAnswer: 'Auf den Messias, Jesus Christus',
              optionsJson: JSON.stringify(['Auf den Messias, Jesus Christus', 'Auf Salomo', 'Auf niemanden', 'Auf einen Propheten']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteSamuelBook.id,
        title: '2. Samuel - David und Batseba',
        description: 'Lerne über Davids Sünde und Buße.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was war Davids Sünde?',
              questionType: 'multiple_choice',
              correctAnswer: 'Ehebruch mit Batseba und Mord an Uria',
              optionsJson: JSON.stringify(['Ehebruch mit Batseba und Mord an Uria', 'Diebstahl', 'Götzendienst', 'Lüge']),
            },
            {
              questionText: 'Was tat David nachdem Nathan ihn konfrontierte?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er bekannte seine Sünde und tat Buße',
              optionsJson: JSON.stringify(['Er bekannte seine Sünde und tat Buße', 'Er leugnete', 'Er floh', 'Er tötete Nathan']),
            },
          ],
        },
      },
    });
  }

  // KÖNIGE & CHRONIK (5 Lektionen kombiniert)
  const ersteKoenigeBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Kön' } });
  if (ersteKoenigeBook) {
    await prisma.lesson.create({
      data: {
        bookId: ersteKoenigeBook.id,
        title: '1. Könige - Salomo baut den Tempel',
        description: 'Lerne über den Bau des prächtigen Tempels in Jerusalem.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer baute den Tempel?',
              questionType: 'multiple_choice',
              correctAnswer: 'Salomo',
              optionsJson: JSON.stringify(['Salomo', 'David', 'Mose', 'Aaron']),
            },
            {
              questionText: 'Wie lange dauerte der Bau?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sieben Jahre',
              optionsJson: JSON.stringify(['Sieben Jahre', 'Ein Jahr', 'Vierzig Jahre', 'Drei Monate']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: ersteKoenigeBook.id,
        title: '1. Könige - Elia und die Propheten Baals',
        description: 'Verstehe Elias Herausforderung an die falschen Propheten.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was forderte Elia die Baalspropheten heraus zu tun?',
              questionType: 'multiple_choice',
              correctAnswer: 'Feuer vom Himmel zu rufen',
              optionsJson: JSON.stringify(['Feuer vom Himmel zu rufen', 'Zu beten', 'Zu opfern', 'Zu kämpfen']),
            },
            {
              questionText: 'Was geschah mit Elias Opfer?',
              questionType: 'multiple_choice',
              correctAnswer: 'Feuer vom HERRN fiel herab und verzehrte es',
              optionsJson: JSON.stringify(['Feuer vom HERRN fiel herab und verzehrte es', 'Nichts', 'Es verbrannte von selbst', 'Es wurde gestohlen']),
            },
          ],
        },
      },
    });
  }

  const zweiteKoenigeBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Kön' } });
  if (zweiteKoenigeBook) {
    await prisma.lesson.create({
      data: {
        bookId: zweiteKoenigeBook.id,
        title: '2. Könige - Elisas Wunder',
        description: 'Lerne über die Wunder, die Gott durch Elisa tat.',
        difficulty: 'hard',
        requiredLevel: 6,
        experienceReward: 190,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was empfing Elisa von Elia?',
              questionType: 'multiple_choice',
              correctAnswer: 'Einen doppelten Anteil seines Geistes',
              optionsJson: JSON.stringify(['Einen doppelten Anteil seines Geistes', 'Seinen Mantel', 'Sein Geld', 'Nichts']),
            },
            {
              questionText: 'Was tat Elisa für die Witwe?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er vermehrte ihr Öl wunderbar',
              optionsJson: JSON.stringify(['Er vermehrte ihr Öl wunderbar', 'Er gab ihr Geld', 'Nichts', 'Er heiratete sie']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteKoenigeBook.id,
        title: '2. Könige - Der Fall Jerusalems',
        description: 'Verstehe die Eroberung Jerusalems und das Exil.',
        difficulty: 'hard',
        requiredLevel: 8,
        experienceReward: 210,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Warum wurde Jerusalem erobert?',
              questionType: 'multiple_choice',
              correctAnswer: 'Wegen der Sünden und des Götzendienstes des Volkes',
              optionsJson: JSON.stringify(['Wegen der Sünden und des Götzendienstes des Volkes', 'Wegen Schwäche', 'Ohne Grund', 'Wegen Armut']),
            },
            {
              questionText: 'Wohin wurde das Volk verschleppt?',
              questionType: 'multiple_choice',
              correctAnswer: 'Nach Babylon',
              optionsJson: JSON.stringify(['Nach Babylon', 'Nach Ägypten', 'Nach Rom', 'Nach Griechenland']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: zweiteKoenigeBook.id,
        title: '2. Könige - Das Exil',
        description: 'Lerne über die Zeit des babylonischen Exils.',
        difficulty: 'hard',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wie lange dauerte das Exil?',
              questionType: 'multiple_choice',
              correctAnswer: '70 Jahre',
              optionsJson: JSON.stringify(['70 Jahre', '40 Jahre', '7 Jahre', '400 Jahre']),
            },
            {
              questionText: 'Was war Gottes Absicht mit dem Exil?',
              questionType: 'multiple_choice',
              correctAnswer: 'Das Volk zur Umkehr zu bringen',
              optionsJson: JSON.stringify(['Das Volk zur Umkehr zu bringen', 'Sie zu zerstören', 'Sie reich zu machen', 'Keine']),
            },
          ],
        },
      },
    });
  }

  // ESRA (1 Lektion)
  const esraBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Esr' } });
  if (esraBook) {
    await prisma.lesson.create({
      data: {
        bookId: esraBook.id,
        title: 'Esra - Die Rückkehr aus dem Exil',
        description: 'Verstehe die Rückkehr des Volkes nach Jerusalem.',
        difficulty: 'medium',
        requiredLevel: 6,
        experienceReward: 180,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer erlaubte den Juden die Rückkehr?',
              questionType: 'multiple_choice',
              correctAnswer: 'König Kyrus von Persien',
              optionsJson: JSON.stringify(['König Kyrus von Persien', 'Nebukadnezar', 'Pharao', 'Caesar']),
            },
            {
              questionText: 'Was sollte das Volk wieder aufbauen?',
              questionType: 'multiple_choice',
              correctAnswer: 'Den Tempel in Jerusalem',
              optionsJson: JSON.stringify(['Den Tempel in Jerusalem', 'Die Mauern', 'Den Palast', 'Die Stadt']),
            },
          ],
        },
      },
    });
  }

  // NEHEMIA (1 Lektion)
  const nehemiaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Neh' } });
  if (nehemiaBook) {
    await prisma.lesson.create({
      data: {
        bookId: nehemiaBook.id,
        title: 'Nehemia - Der Wiederaufbau der Mauern',
        description: 'Lerne über Nehemias Hingabe beim Wiederaufbau Jerusalems.',
        difficulty: 'medium',
        requiredLevel: 7,
        experienceReward: 200,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was tat Nehemia?',
              questionType: 'multiple_choice',
              correctAnswer: 'Er leitete den Wiederaufbau der Mauern Jerusalems',
              optionsJson: JSON.stringify(['Er leitete den Wiederaufbau der Mauern Jerusalems', 'Er wurde König', 'Er baute den Tempel', 'Er schrieb Briefe']),
            },
            {
              questionText: 'Wie lange dauerte der Bau der Mauer?',
              questionType: 'multiple_choice',
              correctAnswer: '52 Tage',
              optionsJson: JSON.stringify(['52 Tage', '7 Jahre', '40 Tage', '1 Jahr']),
            },
          ],
        },
      },
    });
  }

  // ESTHER (2 Lektionen)
  const estherBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Est' } });
  if (estherBook) {
    await prisma.lesson.create({
      data: {
        bookId: estherBook.id,
        title: 'Esther - Esther wird Königin',
        description: 'Lerne, wie Esther zur Königin von Persien wurde.',
        difficulty: 'medium',
        requiredLevel: 4,
        experienceReward: 160,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Wer war Esthers Pflegevater?',
              questionType: 'multiple_choice',
              correctAnswer: 'Mordechai',
              optionsJson: JSON.stringify(['Mordechai', 'Xerxes', 'Haman', 'Esra']),
            },
            {
              questionText: 'Warum wurde Esther Königin?',
              questionType: 'multiple_choice',
              correctAnswer: 'Gott ordnete es, um sein Volk zu retten',
              optionsJson: JSON.stringify(['Gott ordnete es, um sein Volk zu retten', 'Wegen ihrer Schönheit', 'Durch Zufall', 'Wegen Reichtum']),
            },
          ],
        },
      },
    });

    await prisma.lesson.create({
      data: {
        bookId: estherBook.id,
        title: 'Esther - Rettung des Volkes',
        description: 'Verstehe, wie Esther ihr Volk vor der Vernichtung rettete.',
        difficulty: 'medium',
        requiredLevel: 5,
        experienceReward: 170,
        dailyLimit: 1,
        questions: {
          create: [
            {
              questionText: 'Was sagte Mordechai zu Esther?',
              questionType: 'multiple_choice',
              correctAnswer: 'Vielleicht bist du gerade für diese Zeit Königin geworden',
              optionsJson: JSON.stringify(['Vielleicht bist du gerade für diese Zeit Königin geworden', 'Fliehe!', 'Schweige!', 'Herrsche!']),
            },
            {
              questionText: 'Was tat Esther?',
              questionType: 'multiple_choice',
              correctAnswer: 'Sie riskierte ihr Leben und trat vor den König',
              optionsJson: JSON.stringify(['Sie riskierte ihr Leben und trat vor den König', 'Sie floh', 'Sie schwieg', 'Nichts']),
            },
          ],
        },
      },
    });
  }

  console.log('✅ Lesson Expansion Part 7 abgeschlossen!');
  console.log('18 neue Lektionen erstellt');
  console.log('  1.Mo: 5, 3.Mo: 3, 4.Mo: 3, 5.Mo: 3');
  console.log('  Jos: 3, Ri: 4, 1.Sam: 4, 2.Sam: 3');
  console.log('  Könige: 5, Esra: 1, Neh: 1, Est: 2');
  console.log('Kumulative Lesson-Count: 101 + 18 = 119 Lektionen');
  console.log('🎯 Fast 80% des Ziels erreicht!');
}

// Allow standalone execution
if (require.main === module) {
  seedLessonsExpansionPart7()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

