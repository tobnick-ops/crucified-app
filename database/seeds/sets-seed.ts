// Equipment Sets Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSets() {
  // Rüstung Gottes Set (Epheser 6)
  const armorOfGodSet = await prisma.equipmentSet.create({
    data: {
      name: 'Rüstung Gottes',
      description: 'Die vollständige Rüstung Gottes aus Epheser 6',
      bonus2Piece: '+20% Faith, +20% Wisdom',
      bonus4Piece: '+50% Total Strength, +"Schild des Glaubens" Ability',
      bonus6Piece: '+100% Total Strength, +"Schwert des Geistes" Ability',
    },
  });

  // Find equipment items for the set
  const armorOfGodChest = await prisma.equipmentItem.findFirst({
    where: { name: 'Rüstung aus Epheser 6' },
  });

  const swordOfSpirit = await prisma.equipmentItem.findFirst({
    where: { name: 'Schwert des Geistes' },
  });

  const bootsOfReadiness = await prisma.equipmentItem.findFirst({
    where: { name: 'Stiefel der Bereitschaft' },
  });

  if (armorOfGodChest) {
    await prisma.equipmentSetItem.create({
      data: {
        setId: armorOfGodSet.id,
        equipmentId: armorOfGodChest.id,
      },
    });
  }

  if (swordOfSpirit) {
    await prisma.equipmentSetItem.create({
      data: {
        setId: armorOfGodSet.id,
        equipmentId: swordOfSpirit.id,
      },
    });
  }

  if (bootsOfReadiness) {
    await prisma.equipmentSetItem.create({
      data: {
        setId: armorOfGodSet.id,
        equipmentId: bootsOfReadiness.id,
      },
    });
  }

  console.log('Equipment Sets seeded successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedSets()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

