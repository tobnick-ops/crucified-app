// Skills Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSkills() {
  const rabbis = await prisma.rabbi.findMany();
  
  const paulusRabbi = rabbis.find((r: { name: string }) => r.name === 'Paulus');
  const petrusRabbi = rabbis.find((r: { name: string }) => r.name === 'Petrus');
  const moseRabbi = rabbis.find((r: { name: string }) => r.name === 'Mose');
  const davidRabbi = rabbis.find((r: { name: string }) => r.name === 'David');

  // Create Skill Trees for each Rabbi
  if (paulusRabbi) {
    let paulusSkillTree = await prisma.skillTree.findFirst({
      where: { rabbiId: paulusRabbi.id },
    });
    if (!paulusSkillTree) {
      paulusSkillTree = await prisma.skillTree.create({
        data: {
          rabbiId: paulusRabbi.id,
          name: 'Paulus - Briefe und Gemeindebau',
          description: 'Lerne die Briefe des Paulus zu verstehen und Gemeinden zu bauen.',
        },
      });
    }

    // Paulus Skills
    const grundlagenGlauben = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Grundlagen des Glaubens',
        description: 'Verstehe die Grundlagen des Glaubens aus Römer 1-3.',
        levelRequirement: 1,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 5, wisdom: 5 }),
      },
    });

    const briefeVerstehen = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Briefe verstehen',
        description: 'Lerne die Briefe des Paulus zu verstehen und anzuwenden.',
        levelRequirement: 5,
        parentSkillId: grundlagenGlauben.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 10, wisdom: 5 }),
      },
    });

    await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Römerbrief Meister',
        description: 'Meistere den Römerbrief und seine tiefen Wahrheiten.',
        levelRequirement: 10,
        parentSkillId: briefeVerstehen.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 15, wisdom: 10 }),
      },
    });

    await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Korintherbrief Meister',
        description: 'Verstehe die Gemeindepraxis aus den Korintherbriefen.',
        levelRequirement: 10,
        parentSkillId: briefeVerstehen.id,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ knowledge: 15, service: 10 }),
      },
    });

    const gemeindeaufbau = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Gemeindeaufbau',
        description: 'Lerne, wie man Gemeinden baut und leitet.',
        levelRequirement: 5,
        parentSkillId: grundlagenGlauben.id,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ service: 10, leadership: 5 }),
      },
    });

    await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Apostel der Heiden',
        description: 'Werde zu einem Apostel, der die Heiden erreicht.',
        levelRequirement: 15,
        parentSkillId: gemeindeaufbau.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 20, service: 15 }),
      },
    });

    // Update Rabbi with skill tree
    await prisma.rabbi.update({
      where: { id: paulusRabbi.id },
      data: { startingSkillTreeId: paulusSkillTree.id },
    });
  }

  if (petrusRabbi) {
    let petrusSkillTree = await prisma.skillTree.findFirst({
      where: { rabbiId: petrusRabbi.id },
    });
    if (!petrusSkillTree) {
      petrusSkillTree = await prisma.skillTree.create({
        data: {
          rabbiId: petrusRabbi.id,
          name: 'Petrus - Gemeindeleitung',
          description: 'Lerne Gemeindeleitung und Jüngerschaft von Petrus.',
        },
      });
    }

    await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Fischer der Menschen',
        description: 'Lerne Menschen zu Jüngern zu machen.',
        levelRequirement: 1,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ service: 5, leadership: 5 }),
      },
    });

    // Update Rabbi
    await prisma.rabbi.update({
      where: { id: petrusRabbi.id },
      data: { startingSkillTreeId: petrusSkillTree.id },
    });
  }

  if (moseRabbi) {
    let moseSkillTree = await prisma.skillTree.findFirst({
      where: { rabbiId: moseRabbi.id },
    });
    if (!moseSkillTree) {
      moseSkillTree = await prisma.skillTree.create({
        data: {
          rabbiId: moseRabbi.id,
          name: 'Mose - Weisheit und Führung',
          description: 'Lerne Weisheit und Führung durch Gottes Gesetz.',
        },
      });
    }

    await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Gesetz Gottes verstehen',
        description: 'Verstehe das Gesetz Gottes und seine Bedeutung.',
        levelRequirement: 1,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ wisdom: 5, knowledge: 5 }),
      },
    });

    // Update Rabbi
    await prisma.rabbi.update({
      where: { id: moseRabbi.id },
      data: { startingSkillTreeId: moseSkillTree.id },
    });
  }

  if (davidRabbi) {
    let davidSkillTree = await prisma.skillTree.findFirst({
      where: { rabbiId: davidRabbi.id },
    });
    if (!davidSkillTree) {
      davidSkillTree = await prisma.skillTree.create({
        data: {
          rabbiId: davidRabbi.id,
          name: 'David - Anbetung und Führung',
          description: 'Lerne Anbetung und Führung von David.',
        },
      });
    }

    await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Anbetung lernen',
        description: 'Lerne, Gott in Wahrheit anzubeten.',
        levelRequirement: 1,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 5, wisdom: 5 }),
      },
    });

    // Update Rabbi
    await prisma.rabbi.update({
      where: { id: davidRabbi.id },
      data: { startingSkillTreeId: davidSkillTree.id },
    });
  }

  console.log('Seeded Skills successfully');
}

// Allow standalone execution
if (require.main === module) {
  seedSkills()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

