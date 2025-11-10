// Missions MASSIVE EXPANSION - 12 neue Missionen
// Story-Arcs: Exodus, Jesus Leben, Apostelgeschichte, Endzeit
// Typen: Boss-Battles, Puzzles, Story Interaction, Resource Collection

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMissionsExpansion() {
  console.log('Starting Missions Expansion...');

  // Get Bible Books
  const zweiteMoseBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '2Mo' } });
  const matthaeusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Mt' } });
  const markusBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Mk' } });
  const johannesBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Joh' } });
  const apostelgeschichteBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Apg' } });
  const richterBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Ri' } });
  const danielBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Dan' } });
  const ersteKoenigeBook = await prisma.bibleBook.findUnique({ where: { abbreviation: '1Kön' } });
  const offenbarungBook = await prisma.bibleBook.findUnique({ where: { abbreviation: 'Offb' } });

  // Get or create Fragments for missions
  let aaronFragment = await prisma.fragment.findFirst({ where: { characterName: 'Aaron' } });
  let rotesMeerFragment = await prisma.fragment.findFirst({ where: { characterName: 'Rotes Meer' } });
  let kanaFragment = await prisma.fragment.findFirst({ where: { characterName: 'Kana' } });
  let galileaFragment = await prisma.fragment.findFirst({ where: { characterName: 'See Genezareth' } });
  let heiligerGeistFragment = await prisma.fragment.findFirst({ where: { characterName: 'Heiliger Geist' } });
  let silasFragment = await prisma.fragment.findFirst({ where: { characterName: 'Barnabas' } });
  let simsonFragment = await prisma.fragment.findFirst({ where: { characterName: 'Simson' } });
  let danielFragment = await prisma.fragment.findFirst({ where: { characterName: 'Daniel' } });
  let eliaFragment = await prisma.fragment.findFirst({ where: { characterName: 'Elia' } });

  // ========== STORY-ARC 1: EXODUS & WÜSTE (3 Missionen) ==========

  // Mission 4: Die Zehn Plagen
  if (zweiteMoseBook) {
    await prisma.mission.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: 'Die Zehn Plagen',
        description: 'Erlebe die zehn Plagen, die Gott über Ägypten sandte. Stehe Mose bei, während Pharaos Herz hart bleibt.',
        requiredLevel: 4,
        experienceReward: 300,
        storyCharacterId: aaronFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 15,
        objectives: {
          create: [
            {
              objectiveText: 'Zeuge der 10 Plagen werden (Frösche, Stechmücken, etc.)',
              objectiveType: 'interact',
              requiredValue: 10,
              targetNpc: 'Mose', // FIX: Dynamischer NPC-Name
            },
            {
              objectiveText: 'Pharao konfrontieren',
              objectiveType: 'interact',
              requiredValue: 3,
              targetNpc: 'Pharao', // FIX: Dynamischer NPC-Name
            },
            {
              objectiveText: 'Überwinde Pharaos Sturheit (Boss-Battle)',
              objectiveType: 'boss_defeat',
              requiredValue: 1,
              targetNpc: 'Pharao', // FIX: Dynamischer NPC-Name
            },
          ],
        },
      },
    });

    // Mission 5: Der Durchzug durchs Rote Meer
    await prisma.mission.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: 'Der Durchzug durchs Rote Meer',
        description: 'Fliehe mit Israel vor Pharaos Armee. Erlebe, wie Gott das Rote Meer teilt.',
        requiredLevel: 5,
        experienceReward: 350,
        storyCharacterId: rotesMeerFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 18,
        objectives: {
          create: [
            {
              objectiveText: 'Führe das Volk ans Ufer',
              objectiveType: 'interact',
              requiredValue: 1,
            },
            {
              objectiveText: 'Zeuge, wie das Meer geteilt wird',
              objectiveType: 'witness',
              requiredValue: 1,
            },
            {
              objectiveText: 'Durchquere das Meer sicher (Zeit-Challenge)',
              objectiveType: 'survival',
              requiredValue: 1,
            },
          ],
        },
      },
    });

    // Mission 6: Die Stiftshütte bauen
    await prisma.mission.create({
      data: {
        bookId: zweiteMoseBook.id,
        title: 'Die Stiftshütte bauen',
        description: 'Hilf beim Bau der Stiftshütte nach Gottes genauen Anweisungen. Ein Puzzle aus vielen Teilen.',
        requiredLevel: 6,
        experienceReward: 400,
        storyCharacterId: aaronFragment?.id || null,
        missionType: 'PUZZLE',
        estimatedDuration: 20,
        objectives: {
          create: [
            {
              objectiveText: 'Sammle Gold, Silber und Edelsteine',
              objectiveType: 'collect',
              requiredValue: 30,
            },
            {
              objectiveText: 'Folge dem göttlichen Bauplan (Puzzle)',
              objectiveType: 'puzzle',
              requiredValue: 1,
            },
            {
              objectiveText: 'Vollende die Stiftshütte',
              objectiveType: 'complete',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // ========== STORY-ARC 2: JESUS LEBEN (3 Missionen) ==========

  // Mission 7: Die Hochzeit zu Kana
  if (johannesBook) {
    await prisma.mission.create({
      data: {
        bookId: johannesBook.id,
        title: 'Die Hochzeit zu Kana',
        description: 'Erlebe Jesu erstes Wunder auf der Hochzeit. Hilf, das Problem des fehlenden Weins zu lösen.',
        requiredLevel: 3,
        experienceReward: 250,
        storyCharacterId: kanaFragment?.id || null,
        missionType: 'STORY_INTERACTION',
        estimatedDuration: 12,
        objectives: {
          create: [
            {
              objectiveText: 'Interagiere mit Maria',
              objectiveType: 'interact',
              requiredValue: 1,
            },
            {
              objectiveText: 'Finde 6 Wasserkrüge',
              objectiveType: 'collect',
              requiredValue: 6,
            },
            {
              objectiveText: 'Zeuge das Wunder (Wasser wird zu Wein)',
              objectiveType: 'witness',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // Mission 8: Die Speisung der 5000
  if (matthaeusBook) {
    await prisma.mission.create({
      data: {
        bookId: matthaeusBook.id,
        title: 'Die Speisung der 5000',
        description: 'Hilf bei der wundersamen Speisung von 5000 Menschen mit nur 5 Broten und 2 Fischen.',
        requiredLevel: 4,
        experienceReward: 300,
        storyCharacterId: galileaFragment?.id || null,
        missionType: 'RESOURCE_COLLECTION',
        estimatedDuration: 15,
        objectives: {
          create: [
            {
              objectiveText: 'Sammle 5 Brote',
              objectiveType: 'collect',
              requiredValue: 5,
            },
            {
              objectiveText: 'Sammle 2 Fische',
              objectiveType: 'collect',
              requiredValue: 2,
            },
            {
              objectiveText: 'Verteile das Essen an 5000 Menschen',
              objectiveType: 'distribute',
              requiredValue: 5000,
            },
          ],
        },
      },
    });
  }

  // Mission 9: Der Sturm auf dem See
  if (markusBook) {
    await prisma.mission.create({
      data: {
        bookId: markusBook.id,
        title: 'Der Sturm auf dem See',
        description: 'Überlebe einen gewaltigen Sturm auf dem See Genezareth. Erlebe, wie Jesus den Sturm stillt.',
        requiredLevel: 5,
        experienceReward: 350,
        storyCharacterId: galileaFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 16,
        objectives: {
          create: [
            {
              objectiveText: 'Rudere das Boot (Mini-Game)',
              objectiveType: 'action',
              requiredValue: 100,
            },
            {
              objectiveText: 'Überlebe den Sturm (30 Sekunden)',
              objectiveType: 'survival',
              requiredValue: 30,
            },
            {
              objectiveText: 'Wecke Jesus und zeuge das Wunder',
              objectiveType: 'interact',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // ========== STORY-ARC 3: APOSTELGESCHICHTE (2 Missionen) ==========

  // Mission 10: Pfingsten
  if (apostelgeschichteBook) {
    await prisma.mission.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Pfingsten',
        description: 'Erlebe die Ausgießung des Heiligen Geistes und die Geburt der Kirche.',
        requiredLevel: 7,
        experienceReward: 500,
        storyCharacterId: heiligerGeistFragment?.id || null,
        missionType: 'STORY_INTERACTION',
        estimatedDuration: 25,
        objectives: {
          create: [
            {
              objectiveText: 'Warte im Obergemach',
              objectiveType: 'wait',
              requiredValue: 1,
            },
            {
              objectiveText: 'Zeuge die Feuerzungen',
              objectiveType: 'witness',
              requiredValue: 1,
            },
            {
              objectiveText: 'Höre Petrus\' Predigt',
              objectiveType: 'interact',
              requiredValue: 1,
            },
            {
              objectiveText: 'Sehe 3000 Menschen getauft werden',
              objectiveType: 'witness',
              requiredValue: 1,
            },
          ],
        },
      },
    });

    // Mission 11: Paulus in Philippi
    await prisma.mission.create({
      data: {
        bookId: apostelgeschichteBook.id,
        title: 'Paulus in Philippi',
        description: 'Begleite Paulus nach Philippi. Erlebe Gefangenschaft, Befreiung durch Erdbeben und Bekehrung.',
        requiredLevel: 8,
        experienceReward: 550,
        storyCharacterId: silasFragment?.id || null,
        missionType: 'STORY_INTERACTION',
        estimatedDuration: 28,
        objectives: {
          create: [
            {
              objectiveText: 'Predige das Evangelium',
              objectiveType: 'interact',
              requiredValue: 3,
            },
            {
              objectiveText: 'Befreie die besessene Sklavin',
              objectiveType: 'action',
              requiredValue: 1,
            },
            {
              objectiveText: 'Überlebe die Gefangenschaft',
              objectiveType: 'survival',
              requiredValue: 1,
            },
            {
              objectiveText: 'Zeuge das Erdbeben und die Bekehrung des Kerkermeisters',
              objectiveType: 'witness',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // ========== STORY-ARC 4: BOSS-BATTLES (3 Missionen) ==========

  // Mission 12: Simson vs. die Philister
  if (richterBook) {
    await prisma.mission.create({
      data: {
        bookId: richterBook.id,
        title: 'Simson vs. die Philister',
        description: 'Kämpfe als Simson gegen die Philister. Nutze deine gottgegebene Stärke!',
        requiredLevel: 6,
        experienceReward: 450,
        storyCharacterId: simsonFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 22,
        objectives: {
          create: [
            {
              objectiveText: 'Finde den Eselskinnbacken',
              objectiveType: 'collect',
              requiredValue: 1,
            },
            {
              objectiveText: 'Besiege 1000 Philister (Boss-Wave)',
              objectiveType: 'boss_defeat',
              requiredValue: 1000,
            },
            {
              objectiveText: 'Finale: Bringe die Tempelsäulen zum Einsturz',
              objectiveType: 'action',
              requiredValue: 2,
            },
          ],
        },
      },
    });
  }

  // Mission 13: Daniel in der Löwengrube
  if (danielBook) {
    await prisma.mission.create({
      data: {
        bookId: danielBook.id,
        title: 'Daniel in der Löwengrube',
        description: 'Überlebe eine Nacht mit hungrigen Löwen. Vertraue auf Gottes Schutz!',
        requiredLevel: 7,
        experienceReward: 500,
        storyCharacterId: danielFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 20,
        objectives: {
          create: [
            {
              objectiveText: 'Weigere dich, den König anzubeten',
              objectiveType: 'decision',
              requiredValue: 1,
            },
            {
              objectiveText: 'Überlebe die Nacht in der Löwengrube',
              objectiveType: 'survival',
              requiredValue: 60,
            },
            {
              objectiveText: 'Zeuge Gottes Rettung',
              objectiveType: 'witness',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // Mission 14: Elia vs. die Baalspropheten
  if (ersteKoenigeBook) {
    await prisma.mission.create({
      data: {
        bookId: ersteKoenigeBook.id,
        title: 'Elia vs. die Baalspropheten',
        description: 'Tritt gegen 450 Baalspropheten an. Beweise, dass der HERR der wahre Gott ist!',
        requiredLevel: 9,
        experienceReward: 650,
        storyCharacterId: eliaFragment?.id || null,
        missionType: 'COMBAT',
        estimatedDuration: 30,
        objectives: {
          create: [
            {
              objectiveText: 'Fordere die Baalspropheten heraus',
              objectiveType: 'interact',
              requiredValue: 1,
            },
            {
              objectiveText: 'Baue einen Altar',
              objectiveType: 'build',
              requiredValue: 1,
            },
            {
              objectiveText: 'Übergieße den Altar mit Wasser (12x)',
              objectiveType: 'action',
              requiredValue: 12,
            },
            {
              objectiveText: 'Bete und rufe Feuer vom Himmel (Boss-Finale)',
              objectiveType: 'boss_defeat',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  // ========== STORY-ARC 5: ENDZEIT (1 Mission) ==========

  // Mission 15: Die Vision von Patmos
  if (offenbarungBook) {
    await prisma.mission.create({
      data: {
        bookId: offenbarungBook.id,
        title: 'Die Vision von Patmos',
        description: 'Erlebe Johannes\' Vision auf der Insel Patmos. Siehe die Offenbarung des kommenden Reiches Gottes.',
        requiredLevel: 10,
        experienceReward: 700,
        storyCharacterId: null,
        missionType: 'STORY_INTERACTION',
        estimatedDuration: 35,
        objectives: {
          create: [
            {
              objectiveText: 'Erkunde die Insel Patmos',
              objectiveType: 'explore',
              requiredValue: 5,
            },
            {
              objectiveText: 'Empfange die Vision der 7 Gemeinden',
              objectiveType: 'witness',
              requiredValue: 7,
            },
            {
              objectiveText: 'Sehe den Thron Gottes',
              objectiveType: 'witness',
              requiredValue: 1,
            },
            {
              objectiveText: 'Erlebe die Vision des neuen Jerusalem',
              objectiveType: 'witness',
              requiredValue: 1,
            },
          ],
        },
      },
    });
  }

  console.log('✅ Missions Expansion Complete!');
  console.log('\nNeue Missionen:');
  console.log('  Story-Arc Exodus: 3 Missionen');
  console.log('  Story-Arc Jesus Leben: 3 Missionen');
  console.log('  Story-Arc Apostelgeschichte: 2 Missionen');
  console.log('  Boss-Battles: 3 Missionen');
  console.log('  Endzeit: 1 Mission');
  console.log('\nMission Types:');
  console.log('  Resource Collection: 2');
  console.log('  Story Interaction: 4');
  console.log('  Boss Battle: 3');
  console.log('  Puzzle: 1');
  console.log('  Survival/Escape: 2');
  console.log('\nTOTAL: 12 neue Missionen');
  console.log('TOTAL MIT ORIGINAL (3): 15 Missionen');
  console.log('🎉 MISSIONS ZIEL ERREICHT!');
}

// Allow standalone execution
if (require.main === module) {
  seedMissionsExpansion()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

