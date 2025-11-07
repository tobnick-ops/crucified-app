// Equipment MASSIVE EXPANSION - 39 neue Items
// KRITISCH: LEGS Slot ist komplett leer!
// Sets vervollständigen, Balance herstellen

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEquipmentExpansion() {
  console.log('Starting Equipment Expansion...');
  console.log('CRITICAL: Filling LEGS Slot (currently EMPTY)...');

  const equipmentItems = [
    // ========== LEGS SLOT (8 Items) - KRITISCH! ==========
    // Currently EMPTY - this is a critical gap!
    
    {
      name: 'Einfache Leinenhose',
      description: 'Schlichte Leinenhose für den Alltag.',
      itemType: 'LEGS',
      rarity: 'COMMON',
      baseStrength: 6,
      slot: 'LEGS',
      requiredLevel: 1,
    },
    {
      name: 'Tunika-Hose',
      description: 'Bequeme Hose für den Tempeldienst.',
      itemType: 'LEGS',
      rarity: 'COMMON',
      baseStrength: 8,
      slot: 'LEGS',
      requiredLevel: 1,
    },
    {
      name: 'Wanderer-Hose',
      description: 'Robuste Hose für lange Reisen.',
      itemType: 'LEGS',
      rarity: 'UNCOMMON',
      baseStrength: 18,
      slot: 'LEGS',
      requiredLevel: 3,
    },
    {
      name: 'Priesterrock',
      description: 'Der heilige Rock der Levitenpriester.',
      itemType: 'LEGS',
      rarity: 'RARE',
      baseStrength: 40,
      slot: 'LEGS',
      requiredLevel: 8,
    },
    {
      name: 'Kampfhose des Kriegers',
      description: 'Verstärkte Hose für den geistlichen Kampf.',
      itemType: 'LEGS',
      rarity: 'RARE',
      baseStrength: 45,
      slot: 'LEGS',
      requiredLevel: 10,
    },
    {
      name: 'Königshose Davids',
      description: 'Die prachtvolle Hose des Königs David.',
      itemType: 'LEGS',
      rarity: 'EPIC',
      baseStrength: 60,
      slot: 'LEGS',
      requiredLevel: 12,
    },
    {
      name: 'Beinharnisch der Gerechtigkeit',
      description: 'Teil der Rüstung Gottes - schützt im Stand der Gerechtigkeit.',
      itemType: 'LEGS',
      rarity: 'LEGENDARY',
      baseStrength: 85,
      slot: 'LEGS',
      requiredLevel: 18,
    },
    {
      name: 'Hosen des Ewigen Bundes',
      description: 'Legendäre Hose, getragen von den Hohepries tern des Bundes.',
      itemType: 'LEGS',
      rarity: 'LEGENDARY',
      baseStrength: 90,
      slot: 'LEGS',
      requiredLevel: 20,
    },

    // ========== HELM Additions (7 neue) ==========
    
    {
      name: 'Kopftuch des Pilgers',
      description: 'Einfaches Kopftuch für Reisende.',
      itemType: 'HELM',
      rarity: 'COMMON',
      baseStrength: 7,
      slot: 'HELM',
      requiredLevel: 1,
    },
    {
      name: 'Schreiber-Kappe',
      description: 'Kappe der Schriftgelehrten.',
      itemType: 'HELM',
      rarity: 'UNCOMMON',
      baseStrength: 20,
      slot: 'HELM',
      requiredLevel: 4,
    },
    {
      name: 'Helm des Heils',
      description: 'Teil der Rüstung Gottes - Schutz durch Erlösung.',
      itemType: 'HELM',
      rarity: 'ARTIFACT',
      baseStrength: 100,
      slot: 'HELM',
      requiredLevel: 20,
    },
    {
      name: 'Messing-Helm des Soldaten',
      description: 'Robuster Helm für den geistlichen Kampf.',
      itemType: 'HELM',
      rarity: 'RARE',
      baseStrength: 43,
      slot: 'HELM',
      requiredLevel: 9,
    },
    {
      name: 'Goldverzierte Mitra',
      description: 'Die prachtvolle Kopfbedeckung des Hohepriesters.',
      itemType: 'HELM',
      rarity: 'RARE',
      baseStrength: 40,
      slot: 'HELM',
      requiredLevel: 10,
    },
    {
      name: 'Priestermitra',
      description: 'Heilige Mitra der Levitenpriester mit goldener Platte.',
      itemType: 'HELM',
      rarity: 'EPIC',
      baseStrength: 50,
      slot: 'HELM',
      requiredLevel: 12,
    },
    {
      name: 'Krone Davids',
      description: 'Die goldene Krone des Königs David.',
      itemType: 'HELM',
      rarity: 'LEGENDARY',
      baseStrength: 70,
      slot: 'HELM',
      requiredLevel: 15,
    },

    // ========== CHEST Additions (7 neue) ==========
    
    {
      name: 'Woll-Mantel',
      description: 'Warmer Mantel aus Wolle.',
      itemType: 'CHEST',
      rarity: 'COMMON',
      baseStrength: 10,
      slot: 'CHEST',
      requiredLevel: 2,
    },
    {
      name: 'Tunika des Jüngers',
      description: 'Einfache Tunika der ersten Nachfolger.',
      itemType: 'CHEST',
      rarity: 'COMMON',
      baseStrength: 12,
      slot: 'CHEST',
      requiredLevel: 1,
    },
    {
      name: 'Leder-Rüstung',
      description: 'Robuste Lederrüstung für den Kampf.',
      itemType: 'CHEST',
      rarity: 'UNCOMMON',
      baseStrength: 25,
      slot: 'CHEST',
      requiredLevel: 5,
    },
    {
      name: 'Priestergewand',
      description: 'Das heilige Gewand der Levitenpriester.',
      itemType: 'CHEST',
      rarity: 'EPIC',
      baseStrength: 60,
      slot: 'CHEST',
      requiredLevel: 12,
    },
    {
      name: 'Königsgewand',
      description: 'Das prachtvolle Gewand der Könige Israels.',
      itemType: 'CHEST',
      rarity: 'LEGENDARY',
      baseStrength: 80,
      slot: 'CHEST',
      requiredLevel: 15,
    },
    {
      name: 'Prophetenmantel',
      description: 'Der Mantel der Propheten, getragen von Elia und Elisa.',
      itemType: 'CHEST',
      rarity: 'RARE',
      baseStrength: 55,
      slot: 'CHEST',
      requiredLevel: 10,
    },
    {
      name: 'Fischerhemd des Petrus',
      description: 'Das einfache Hemd des Fischers Simon Petrus.',
      itemType: 'CHEST',
      rarity: 'UNCOMMON',
      baseStrength: 30,
      slot: 'CHEST',
      requiredLevel: 6,
    },

    // ========== FEET Additions (6 neue) ==========
    
    {
      name: 'Wandersandalen',
      description: 'Einfache Sandalen für die Reise.',
      itemType: 'FEET',
      rarity: 'COMMON',
      baseStrength: 7,
      slot: 'FEET',
      requiredLevel: 1,
    },
    {
      name: 'Lederstiefel',
      description: 'Robuste Stiefel aus Leder.',
      itemType: 'FEET',
      rarity: 'COMMON',
      baseStrength: 9,
      slot: 'FEET',
      requiredLevel: 2,
    },
    {
      name: 'Reisende-Stiefel',
      description: 'Bequeme Stiefel für lange Wanderungen.',
      itemType: 'FEET',
      rarity: 'UNCOMMON',
      baseStrength: 20,
      slot: 'FEET',
      requiredLevel: 4,
    },
    {
      name: 'Priesterschuhe',
      description: 'Heilige Schuhe für den Tempeldienst.',
      itemType: 'FEET',
      rarity: 'RARE',
      baseStrength: 35,
      slot: 'FEET',
      requiredLevel: 8,
    },
    {
      name: 'Kriegsstiefel',
      description: 'Verstärkte Stiefel für den Kampf.',
      itemType: 'FEET',
      rarity: 'RARE',
      baseStrength: 40,
      slot: 'FEET',
      requiredLevel: 10,
    },
    {
      name: 'Prophetensandalen',
      description: 'Einfache Sandalen der wandernden Propheten.',
      itemType: 'FEET',
      rarity: 'UNCOMMON',
      baseStrength: 25,
      slot: 'FEET',
      requiredLevel: 5,
    },

    // ========== WEAPON Additions (7 neue) ==========
    
    {
      name: 'Einfacher Stab',
      description: 'Ein einfacher Wanderstab.',
      itemType: 'WEAPON',
      rarity: 'COMMON',
      baseStrength: 8,
      slot: 'WEAPON',
      requiredLevel: 1,
    },
    {
      name: 'Hirtenstab',
      description: 'Der Stab eines Hirten zum Leiten der Herde.',
      itemType: 'WEAPON',
      rarity: 'COMMON',
      baseStrength: 10,
      slot: 'WEAPON',
      requiredLevel: 1,
    },
    {
      name: 'Schleuder',
      description: 'Eine einfache Schleuder mit Steinen.',
      itemType: 'WEAPON',
      rarity: 'COMMON',
      baseStrength: 9,
      slot: 'WEAPON',
      requiredLevel: 2,
    },
    {
      name: 'Bronze-Schwert',
      description: 'Ein einfaches Schwert aus Bronze.',
      itemType: 'WEAPON',
      rarity: 'UNCOMMON',
      baseStrength: 22,
      slot: 'WEAPON',
      requiredLevel: 5,
    },
    {
      name: 'Eisenschwert',
      description: 'Ein starkes Schwert aus Eisen.',
      itemType: 'WEAPON',
      rarity: 'RARE',
      baseStrength: 50,
      slot: 'WEAPON',
      requiredLevel: 10,
    },
    {
      name: 'Zepter Salomos',
      description: 'Das königliche Zepter des weisen Königs Salomo.',
      itemType: 'WEAPON',
      rarity: 'LEGENDARY',
      baseStrength: 85,
      slot: 'WEAPON',
      requiredLevel: 16,
    },
    {
      name: 'Eisenstock',
      description: 'Ein verstärkter Eisenstab.',
      itemType: 'WEAPON',
      rarity: 'UNCOMMON',
      baseStrength: 24,
      slot: 'WEAPON',
      requiredLevel: 4,
    },

    // ========== ACCESSORY Additions (4 neue) ==========
    
    {
      name: 'Gebetskette',
      description: 'Eine einfache Gebetskette aus Holz.',
      itemType: 'ACCESSORY',
      rarity: 'COMMON',
      baseStrength: 7,
      slot: 'ACCESSORY',
      requiredLevel: 1,
    },
    {
      name: 'Holzkreuz-Anhänger',
      description: 'Ein kleines Holzkreuz an einer Kette.',
      itemType: 'ACCESSORY',
      rarity: 'COMMON',
      baseStrength: 8,
      slot: 'ACCESSORY',
      requiredLevel: 1,
    },
    {
      name: 'Schild des Glaubens',
      description: 'Teil der Rüstung Gottes - löscht alle feurigen Pfeile des Bösen.',
      itemType: 'ACCESSORY',
      rarity: 'ARTIFACT',
      baseStrength: 110,
      slot: 'ACCESSORY',
      requiredLevel: 22,
    },
    {
      name: 'Gürtel der Wahrheit',
      description: 'Teil der Rüstung Gottes - umgürtet mit Wahrheit.',
      itemType: 'ACCESSORY',
      rarity: 'ARTIFACT',
      baseStrength: 80,
      slot: 'ACCESSORY',
      requiredLevel: 18,
    },
    {
      name: 'Brustschild des Hohepriesters',
      description: 'Das heilige Brustschild mit 12 Edelsteinen.',
      itemType: 'ACCESSORY',
      rarity: 'EPIC',
      baseStrength: 55,
      slot: 'ACCESSORY',
      requiredLevel: 12,
    },
    {
      name: 'Siegelring Salomos',
      description: 'Der Siegelring des weisen Königs.',
      itemType: 'ACCESSORY',
      rarity: 'RARE',
      baseStrength: 38,
      slot: 'ACCESSORY',
      requiredLevel: 9,
    },
    {
      name: 'Paulus\' Schriftrolle',
      description: 'Eine heilige Schriftrolle mit Paulus\' Briefen.',
      itemType: 'ACCESSORY',
      rarity: 'RARE',
      baseStrength: 42,
      slot: 'ACCESSORY',
      requiredLevel: 10,
    },
    {
      name: 'Gürtel des Elia',
      description: 'Der Ledergürtel des Propheten Elia.',
      itemType: 'ACCESSORY',
      rarity: 'EPIC',
      baseStrength: 48,
      slot: 'ACCESSORY',
      requiredLevel: 11,
    },
  ];

  console.log(`Creating ${equipmentItems.length} new equipment items...`);

  for (const item of equipmentItems) {
    const existing = await prisma.equipmentItem.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.equipmentItem.create({
        data: item,
      });
      console.log(`  ✓ Created: ${item.name} (${item.rarity}, ${item.slot})`);
    } else {
      console.log(`  - Skipped (exists): ${item.name}`);
    }
  }

  console.log('\n✅ Equipment Expansion Complete!');
  console.log('\nSummary:');
  console.log('  LEGS: 8 items (CRITICAL gap filled!)');
  console.log('  HELM: 7 items');
  console.log('  CHEST: 7 items');
  console.log('  FEET: 6 items');
  console.log('  WEAPON: 7 items');
  console.log('  ACCESSORY: 8 items');
  console.log('  TOTAL: 43 items created');

  // Display rarity distribution
  const rarityCount = equipmentItems.reduce((acc, item) => {
    acc[item.rarity] = (acc[item.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\nRarity Distribution:');
  Object.entries(rarityCount).forEach(([rarity, count]) => {
    console.log(`  ${rarity}: ${count} items`);
  });
}

// Allow standalone execution
if (require.main === module) {
  seedEquipmentExpansion()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

