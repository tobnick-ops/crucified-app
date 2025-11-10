/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const characterId = process.argv[2];

  if (!characterId) {
    console.error('Bitte Character-ID angeben.');
    process.exit(1);
  }

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      equipment: { include: { equipment: true } },
      stats: true,
      missions: true,
      fragments: true,
    },
  });

  console.log(JSON.stringify(character, null, 2));
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

