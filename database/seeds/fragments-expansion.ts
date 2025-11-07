// Fragments MASSIVE EXPANSION - 49 neue Fragmente
// Kategorien: Charaktere (15), Orte (12), Konzepte (12), Ereignisse (10)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFragmentsExpansion() {
  console.log('Starting Fragments Expansion...');

  // Get Bible Books for references
  const ersteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Mo' } });
  const zweiteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Mo' } });
  const joshuaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jos' } });
  const richterBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Ri' } });
  const ersteSamuelBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Sam' } });
  const ersteKoenigeBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Kön' } });
  const jesajaBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Jes' } });
  const danielBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Dan' } });
  const matthaeusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Mt' } });
  const lukasBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Lk' } });
  const johannesBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Joh' } });
  const apostelgeschichteBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Apg' } });
  const roemerBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Röm' } });
  const epheserBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Eph' } });
  const hebraeerBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Hebr' } });
  const erstePetrusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Pet' } });
  const ersteJohannesBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Joh' } });

  // ========== CHARAKTERE (15 neue) ==========
  const characters = [
    {
      name: 'Abraham',
      book: ersteMoseBook,
      description: 'Abraham, der Vater des Glaubens, dem Gott eine große Nation versprach.',
      condition: 'Schließe 3 Lektionen aus 1. Mose ab',
    },
    {
      name: 'Isaak',
      book: ersteMoseBook,
      description: 'Isaak, der Sohn der Verheißung, durch den Gottes Bund fortgeführt wurde.',
      condition: 'Schließe die Lektion über Abraham ab',
    },
    {
      name: 'Jakob/Israel',
      book: ersteMoseBook,
      description: 'Jakob, der mit Gott rang und Israel genannt wurde, Vater der 12 Stämme.',
      condition: 'Erreiche Level 5',
    },
    {
      name: 'Josef',
      book: ersteMoseBook,
      description: 'Josef, der Träumer, der von seinen Brüdern verkauft wurde und Ägypten rettete.',
      condition: 'Schließe 4 Lektionen aus 1. Mose ab',
    },
    {
      name: 'Aaron',
      book: zweiteMoseBook,
      description: 'Aaron, der erste Hohepriester Israels und Bruder von Mose.',
      condition: 'Schließe die Mission "Ägypten befreien" ab',
    },
    {
      name: 'Josua',
      book: joshuaBook,
      description: 'Josua, der Nachfolger Moses, der Israel ins verheißene Land führte.',
      condition: 'Schließe 2 Lektionen aus Josua ab',
    },
    {
      name: 'Debora',
      book: richterBook,
      description: 'Debora, die Prophetin und Richterin, die Israel zum Sieg führte.',
      condition: 'Schließe 1 Lektion aus Richter ab',
    },
    {
      name: 'Gideon',
      book: richterBook,
      description: 'Gideon, der mit 300 Mann gegen ein Heer von Tausenden siegte.',
      condition: 'Schließe 2 Lektionen aus Richter ab',
    },
    {
      name: 'Simson',
      book: richterBook,
      description: 'Simson, der Nasiräer mit übermenschlicher Kraft.',
      condition: 'Schließe die Mission "Simson vs. die Philister" ab',
    },
    {
      name: 'Samuel',
      book: ersteSamuelBook,
      description: 'Samuel, der letzte Richter und große Prophet, der Könige salbte.',
      condition: 'Schließe 2 Lektionen aus 1. Samuel ab',
    },
    {
      name: 'Salomo',
      book: ersteKoenigeBook,
      description: 'Salomo, der weiseste König, der den Tempel baute.',
      condition: 'Erreiche Level 10',
    },
    {
      name: 'Elia',
      book: ersteKoenigeBook,
      description: 'Elia, der Feuerprophet, der Feuer vom Himmel rief.',
      condition: 'Schließe die Mission "Elia vs. die Baalspropheten" ab',
    },
    {
      name: 'Elisa',
      book: ersteKoenigeBook,
      description: 'Elisa, der Nachfolger Elias mit doppeltem Anteil seines Geistes.',
      condition: 'Schließe 2 Lektionen aus 1./2. Könige ab',
    },
    {
      name: 'Jesaja',
      book: jesajaBook,
      description: 'Jesaja, der große Prophet, der den kommenden Messias prophezeite.',
      condition: 'Schließe 2 Lektionen aus Jesaja ab',
    },
    {
      name: 'Daniel',
      book: danielBook,
      description: 'Daniel, der Prophet in Babylon, der Träume deutete und in der Löwengrube überlebte.',
      condition: 'Schließe die Mission "Daniel in der Löwengrube" ab',
    },
    {
      name: 'Johannes der Täufer',
      book: matthaeusBook,
      description: 'Johannes, der Wegbereiter, der den Weg für den Messias bereitete.',
      condition: 'Schließe die Lektion über die Taufe Jesu ab',
    },
    {
      name: 'Maria',
      book: lukasBook,
      description: 'Maria, die Mutter Jesu, auserwählt, den Erlöser zu gebären.',
      condition: 'Schließe die Lektion über die Geburt Jesu ab',
    },
    {
      name: 'Maria Magdalena',
      book: johannesBook,
      description: 'Maria Magdalena, die erste Zeugin der Auferstehung.',
      condition: 'Schließe die Lektion über die Auferstehung ab',
    },
    {
      name: 'Johannes (Jünger)',
      book: johannesBook,
      description: 'Johannes, der Jünger, den Jesus liebte, Verfasser des Evangeliums.',
      condition: 'Schließe 3 Lektionen aus Johannes ab',
    },
    {
      name: 'Barnabas',
      book: apostelgeschichteBook,
      description: 'Barnabas, der Sohn des Trostes, Gefährte des Paulus.',
      condition: 'Schließe 2 Lektionen aus Apostelgeschichte ab',
    },
  ];

  // ========== ORTE (12 neue) ==========
  const locations = [
    {
      name: 'Garten Eden',
      book: ersteMoseBook,
      description: 'Der Garten Eden, das Paradies, wo die Menschheit begann.',
      condition: 'Schließe die Lektion über die Schöpfung ab',
    },
    {
      name: 'Babel',
      book: ersteMoseBook,
      description: 'Der Turm zu Babel, wo Gott die Sprachen verwirrte.',
      condition: 'Schließe 2 Lektionen aus 1. Mose ab',
    },
    {
      name: 'Sodom und Gomorra',
      book: ersteMoseBook,
      description: 'Die Städte, die wegen ihrer Bosheit durch Feuer zerstört wurden.',
      condition: 'Schließe die Lektion über Abraham ab',
    },
    {
      name: 'Rotes Meer',
      book: zweiteMoseBook,
      description: 'Das Rote Meer, wo Gott einen Weg durch das Wasser bahnte.',
      condition: 'Schließe die Mission "Der Durchzug durchs Rote Meer" ab',
    },
    {
      name: 'Das Verheißene Land',
      book: joshuaBook,
      description: 'Kanaan, das Land, das Gott seinem Volk verheißen hatte.',
      condition: 'Schließe 2 Lektionen aus Josua ab',
    },
    {
      name: 'Jericho',
      book: joshuaBook,
      description: 'Jericho, die erste Stadt, die Israel im verheißenen Land eroberte.',
      condition: 'Schließe die Lektion über die Eroberung Jerichos ab',
    },
    {
      name: 'Jerusalem',
      book: ersteSamuelBook,
      description: 'Jerusalem, die heilige Stadt, Stadt Davids, wo der Tempel stand.',
      condition: 'Erreiche Level 8',
    },
    {
      name: 'Salomos Tempel',
      book: ersteKoenigeBook,
      description: 'Der prachtvolle Tempel, den Salomo für Gott baute.',
      condition: 'Schließe 3 Lektionen aus 1. Könige ab',
    },
    {
      name: 'Bethlehem',
      book: lukasBook,
      description: 'Bethlehem, die Stadt Davids, wo Jesus geboren wurde.',
      condition: 'Schließe die Lektion über die Geburt Jesu ab',
    },
    {
      name: 'Nazareth',
      book: matthaeusBook,
      description: 'Nazareth, die Stadt, wo Jesus aufwuchs.',
      condition: 'Schließe 2 Lektionen aus Matthäus ab',
    },
    {
      name: 'See Genezareth',
      book: matthaeusBook,
      description: 'Der See, wo Jesus wandelte und die Fischer berief.',
      condition: 'Schließe die Mission "Der Sturm auf dem See" ab',
    },
    {
      name: 'Kapernaum',
      book: matthaeusBook,
      description: 'Kapernaum, die Stadt am See, Zentrum von Jesu Wirken.',
      condition: 'Schließe 3 Lektionen aus den Evangelien ab',
    },
    {
      name: 'Golgatha',
      book: matthaeusBook,
      description: 'Golgatha, der Ort der Kreuzigung, wo Jesus für uns starb.',
      condition: 'Schließe die Lektion über die Passion ab',
    },
    {
      name: 'Garten Gethsemane',
      book: matthaeusBook,
      description: 'Der Garten, wo Jesus betete und verraten wurde.',
      condition: 'Schließe die Lektion über die Passion ab',
    },
    {
      name: 'Emmaus',
      book: lukasBook,
      description: 'Der Ort, wo die Jünger den auferstandenen Jesus erkannten.',
      condition: 'Schließe die Lektion über die Emmaus-Jünger ab',
    },
  ];

  // ========== KONZEPTE (12 neue) ==========
  const concepts = [
    {
      name: 'Erlösung',
      book: roemerBook,
      description: 'Die Erlösung durch Christus - Rettung von Sünde und Tod.',
      condition: 'Schließe 3 Lektionen aus Römer ab',
    },
    {
      name: 'Rechtfertigung',
      book: roemerBook,
      description: 'Gerechtfertigt durch Glauben, nicht durch Werke.',
      condition: 'Schließe die Lektion über Rechtfertigung durch Glauben ab',
    },
    {
      name: 'Heiligung',
      book: roemerBook,
      description: 'Der Prozess, geheiligt und Gott ähnlicher zu werden.',
      condition: 'Schließe die Lektion über Leben im Geist ab',
    },
    {
      name: 'Versöhnung',
      book: roemerBook,
      description: 'Versöhnt mit Gott durch den Tod Christi.',
      condition: 'Schließe die Lektion über den Dienst der Versöhnung ab',
    },
    {
      name: 'Bund',
      book: zweiteMoseBook,
      description: 'Gottes Bund mit seinem Volk - ein ewiger Vertrag.',
      condition: 'Schließe die Lektion über den Bund am Sinai ab',
    },
    {
      name: 'Opfer',
      book: hebraeerBook,
      description: 'Das vollkommene Opfer Christi, das alle anderen Opfer erfüllt.',
      condition: 'Schließe 2 Lektionen aus Hebräer ab',
    },
    {
      name: 'Auferstehung',
      book: johannesBook,
      description: 'Der Sieg über den Tod - Christus ist auferstanden!',
      condition: 'Schließe die Lektion über die Auferstehung ab',
    },
    {
      name: 'Wiedergeburt',
      book: johannesBook,
      description: 'Geboren aus Wasser und Geist - neues Leben in Christus.',
      condition: 'Erreiche Level 7',
    },
    {
      name: 'Vergebung',
      book: epheserBook,
      description: 'Vergebung der Sünden durch Christi Blut.',
      condition: 'Schließe 2 Lektionen aus Epheser ab',
    },
    {
      name: 'Hoffnung',
      book: erstePetrusBook,
      description: 'Die lebendige Hoffnung auf das ewige Leben.',
      condition: 'Schließe 2 Lektionen aus 1. Petrus ab',
    },
    {
      name: 'Umkehr',
      book: apostelgeschichteBook,
      description: 'Umkehr und Buße - Sinnesänderung zu Gott hin.',
      condition: 'Schließe 2 Lektionen aus Apostelgeschichte ab',
    },
    {
      name: 'Ewiges Leben',
      book: ersteJohannesBook,
      description: 'Das ewige Leben in Gemeinschaft mit Gott.',
      condition: 'Erreiche Level 12',
    },
  ];

  // ========== EREIGNISSE (10 neue) ==========
  const events = [
    {
      name: 'Die Schöpfung',
      book: ersteMoseBook,
      description: 'Am Anfang schuf Gott Himmel und Erde in sechs Tagen.',
      condition: 'Schließe die Lektion über die Schöpfung ab',
    },
    {
      name: 'Der Sündenfall',
      book: ersteMoseBook,
      description: 'Der erste Ungehorsam - Adam und Eva im Garten Eden.',
      condition: 'Schließe die Lektion über den Sündenfall ab',
    },
    {
      name: 'Die Sintflut',
      book: ersteMoseBook,
      description: 'Das große Gericht - nur Noah und seine Familie wurden gerettet.',
      condition: 'Schließe die Mission "Die Arche bauen" ab',
    },
    {
      name: 'Der Bund mit Abraham',
      book: ersteMoseBook,
      description: 'Gottes Verheißung an Abraham - aus dir wird ein großes Volk.',
      condition: 'Schließe die Lektion über Abraham ab',
    },
    {
      name: 'Der Exodus',
      book: zweiteMoseBook,
      description: 'Der Auszug aus Ägypten - Befreiung aus der Sklaverei.',
      condition: 'Schließe die Mission "Ägypten befreien" ab',
    },
    {
      name: 'Das Goldene Kalb',
      book: zweiteMoseBook,
      description: 'Israels Götzendienst in der Wüste.',
      condition: 'Schließe 3 Lektionen aus 2. Mose ab',
    },
    {
      name: 'Die Taufe Jesu',
      book: matthaeusBook,
      description: 'Der Beginn des Dienstes - Jesus wird von Johannes getauft.',
      condition: 'Schließe die Lektion über die Taufe Jesu ab',
    },
    {
      name: 'Die Verklärung',
      book: matthaeusBook,
      description: 'Jesus erscheint in Herrlichkeit vor Petrus, Jakobus und Johannes.',
      condition: 'Schließe 5 Lektionen aus den Evangelien ab',
    },
    {
      name: 'Das letzte Abendmahl',
      book: matthaeusBook,
      description: 'Jesu letztes Mahl mit seinen Jüngern - Einsetzung des Abendmahls.',
      condition: 'Schließe die Lektion über die Passion ab',
    },
    {
      name: 'Pfingsten',
      book: apostelgeschichteBook,
      description: 'Ausgießung des Heiligen Geistes - Geburtsstunde der Kirche.',
      condition: 'Schließe die Mission "Pfingsten" ab',
    },
  ];

  // Create all fragments
  let created = 0;
  console.log('\nCreating Character Fragments...');
  for (const char of characters) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: char.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: char.book?.id || null,
          characterName: char.name,
          description: char.description,
          unlockCondition: char.condition,
          fragmentType: 'character',
        },
      });
      console.log(`  ✓ ${char.name}`);
      created++;
    }
  }

  console.log('\nCreating Location Fragments...');
  for (const loc of locations) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: loc.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: loc.book?.id || null,
          characterName: loc.name,
          description: loc.description,
          unlockCondition: loc.condition,
          fragmentType: 'location',
        },
      });
      console.log(`  ✓ ${loc.name}`);
      created++;
    }
  }

  console.log('\nCreating Concept Fragments...');
  for (const concept of concepts) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: concept.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: concept.book?.id || null,
          characterName: concept.name,
          description: concept.description,
          unlockCondition: concept.condition,
          fragmentType: 'concept',
        },
      });
      console.log(`  ✓ ${concept.name}`);
      created++;
    }
  }

  console.log('\nCreating Event Fragments...');
  for (const event of events) {
    const existing = await prisma.fragment.findFirst({
      where: { characterName: event.name },
    });
    if (!existing) {
      await prisma.fragment.create({
        data: {
          bookId: event.book?.id || null,
          characterName: event.name,
          description: event.description,
          unlockCondition: event.condition,
          fragmentType: 'concept', // Events als concept type
        },
      });
      console.log(`  ✓ ${event.name}`);
      created++;
    }
  }

  console.log(`\n✅ Fragments Expansion Complete!`);
  console.log(`\nSummary:`);
  console.log(`  Characters: ${characters.length} fragments`);
  console.log(`  Locations: ${locations.length} fragments`);
  console.log(`  Concepts: ${concepts.length} fragments`);
  console.log(`  Events: ${events.length} fragments`);
  console.log(`  TOTAL: ${created} new fragments created`);
}

// Allow standalone execution
if (require.main === module) {
  seedFragmentsExpansion()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

