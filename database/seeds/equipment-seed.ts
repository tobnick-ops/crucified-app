// Equipment Seed Data gemäß Masterplan
// Initiale Equipment-Items basierend auf Bibelstellen

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEquipment() {
  const equipmentItems = [
    // Helm Items
    {
      name: 'Einfache Toga',
      description: 'Die einfache Toga eines Tempelschülers. Beginn deiner Reise.',
      itemType: 'CHEST',
      rarity: 'COMMON',
      baseStrength: 5,
      slot: 'CHEST',
      requiredLevel: 1,
    },
    {
      name: 'Tempel-Kopfbedeckung',
      description: 'Eine einfache Kopfbedeckung für den Tempeldienst.',
      itemType: 'HELM',
      rarity: 'COMMON',
      baseStrength: 8,
      slot: 'HELM',
      requiredLevel: 1,
    },
    
    // Chest Items
    {
      name: 'Roben der Demut',
      description: 'Einfache Roben, die Demut und Hingabe symbolisieren.',
      itemType: 'CHEST',
      rarity: 'UNCOMMON',
      baseStrength: 15,
      slot: 'CHEST',
      requiredLevel: 5,
    },
    {
      name: 'Rüstung aus Epheser 6',
      description: 'Die Rüstung Gottes - Brustpanzer der Gerechtigkeit.',
      itemType: 'CHEST',
      rarity: 'ARTIFACT',
      baseStrength: 120,
      slot: 'CHEST',
      requiredLevel: 20,
    },
    
    // Weapon Items
    {
      name: 'Davids Steinschleuder',
      description: 'Die Steinschleuder, mit der David Goliath besiegte.',
      itemType: 'WEAPON',
      rarity: 'LEGENDARY',
      baseStrength: 60,
      slot: 'WEAPON',
      requiredLevel: 15,
    },
    {
      name: 'Stab des Mose',
      description: 'Der Stab, mit dem Mose Wunder vollbrachte.',
      itemType: 'WEAPON',
      rarity: 'LEGENDARY',
      baseStrength: 70,
      slot: 'WEAPON',
      requiredLevel: 15,
    },
    {
      name: 'Schwert des Geistes',
      description: 'Das Schwert des Geistes, das Wort Gottes.',
      itemType: 'WEAPON',
      rarity: 'ARTIFACT',
      baseStrength: 150,
      slot: 'WEAPON',
      requiredLevel: 25,
    },
    
    // Feet Items
    {
      name: 'Stiefel der Bereitschaft',
      description: 'Stiefel der Bereitschaft für das Evangelium des Friedens.',
      itemType: 'FEET',
      rarity: 'EPIC',
      baseStrength: 35,
      slot: 'FEET',
      requiredLevel: 10,
    },
    {
      name: 'Sandalen des Dienstes',
      description: 'Einfache Sandalen für den Dienst am Tempel.',
      itemType: 'FEET',
      rarity: 'COMMON',
      baseStrength: 6,
      slot: 'FEET',
      requiredLevel: 1,
    },
    
    // Accessory Items
    {
      name: 'Ring des Glaubens',
      description: 'Ein Ring, der den Glauben stärkt.',
      itemType: 'ACCESSORY',
      rarity: 'RARE',
      baseStrength: 25,
      slot: 'ACCESSORY',
      requiredLevel: 8,
    },
    {
      name: 'Amulett der Weisheit',
      description: 'Ein Amulett, das Weisheit und Erkenntnis verleiht.',
      itemType: 'ACCESSORY',
      rarity: 'EPIC',
      baseStrength: 40,
      slot: 'ACCESSORY',
      requiredLevel: 12,
    },
  ];

  for (const item of equipmentItems) {
    const existing = await prisma.equipmentItem.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.equipmentItem.create({
        data: item,
      });
    }
  }

  console.log('Equipment Items seeded successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedEquipment()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

