// Skills Seed Data gemäß Masterplan

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSkills() {
  const rabbis = await prisma.rabbi.findMany();
  
  const paulusRabbi = rabbis.find((r: { name: string }) => r.name === 'Paulus');
  const petrusRabbi = rabbis.find((r: { name: string }) => r.name === 'Petrus');
  const moseRabbi = rabbis.find((r: { name: string }) => r.name === 'Mose');
  const davidRabbi = rabbis.find((r: { name: string }) => r.name === 'David');

  // Create Skill Trees for each Rabbi (with idempotent cleanup)
  if (paulusRabbi) {
    // Delete existing skills for idempotency
    const existingTree = await prisma.skillTree.findFirst({
      where: { rabbiId: paulusRabbi.id },
      include: { skills: true },
    });
    
    if (existingTree) {
      await prisma.skill.deleteMany({
        where: { skillTreeId: existingTree.id },
      });
      await prisma.skillTree.delete({
        where: { id: existingTree.id },
      });
    }

    const paulusSkillTree = await prisma.skillTree.create({
      data: {
        rabbiId: paulusRabbi.id,
        name: 'Paulus - Briefe und Gemeindebau',
        description: 'Lerne die Briefe des Paulus zu verstehen und Gemeinden zu bauen.',
      },
    });

    // Paulus Skills - 10 Skills total
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
        levelRequirement: 3,
        parentSkillId: grundlagenGlauben.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 10, wisdom: 5 }),
      },
    });

    const gemeindeaufbau = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Gemeindeaufbau',
        description: 'Lerne, wie man Gemeinden baut und leitet.',
        levelRequirement: 3,
        parentSkillId: grundlagenGlauben.id,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ service: 10, leadership: 5 }),
      },
    });

    const roemerbriefMeister = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Römerbrief Meister',
        description: 'Meistere den Römerbrief und seine tiefen Wahrheiten.',
        levelRequirement: 6,
        parentSkillId: briefeVerstehen.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 15, wisdom: 10 }),
      },
    });

    const korintherbriefMeister = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Korintherbrief Meister',
        description: 'Verstehe die Gemeindepraxis aus den Korintherbriefen.',
        levelRequirement: 6,
        parentSkillId: briefeVerstehen.id,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ knowledge: 15, service: 10 }),
      },
    });

    const lehreDesPaulus = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Lehre des Paulus',
        description: 'Vertiefe dein Verständnis der paulinischen Theologie.',
        levelRequirement: 8,
        parentSkillId: roemerbriefMeister.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 20, wisdom: 15 }),
      },
    });

    const apostelDerHeiden = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Apostel der Heiden',
        description: 'Werde zu einem Apostel, der die Heiden erreicht.',
        levelRequirement: 10,
        parentSkillId: gemeindeaufbau.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 20, service: 15 }),
      },
    });

    const galaterbriefMeister = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Galaterbrief Meister',
        description: 'Verstehe die Freiheit in Christus aus dem Galaterbrief.',
        levelRequirement: 8,
        parentSkillId: korintherbriefMeister.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 15, faith: 10 }),
      },
    });

    const missionar = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Missionar',
        description: 'Lerne, das Evangelium zu verkündigen und neue Gemeinden zu gründen.',
        levelRequirement: 12,
        parentSkillId: apostelDerHeiden.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 25, service: 20 }),
      },
    });

    const theologieMeister = await prisma.skill.create({
      data: {
        skillTreeId: paulusSkillTree.id,
        name: 'Theologie Meister',
        description: 'Werde zum Meister der paulinischen Theologie.',
        levelRequirement: 15,
        parentSkillId: lehreDesPaulus.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ knowledge: 30, wisdom: 20 }),
      },
    });

    // Update Rabbi with skill tree
    await prisma.rabbi.update({
      where: { id: paulusRabbi.id },
      data: { startingSkillTreeId: paulusSkillTree.id },
    });
  }

  if (petrusRabbi) {
    // Delete existing skills for idempotency
    const existingTree = await prisma.skillTree.findFirst({
      where: { rabbiId: petrusRabbi.id },
      include: { skills: true },
    });
    
    if (existingTree) {
      await prisma.skill.deleteMany({
        where: { skillTreeId: existingTree.id },
      });
      await prisma.skillTree.delete({
        where: { id: existingTree.id },
      });
    }

    const petrusSkillTree = await prisma.skillTree.create({
      data: {
        rabbiId: petrusRabbi.id,
        name: 'Petrus - Gemeindeleitung',
        description: 'Lerne Gemeindeleitung und Jüngerschaft von Petrus.',
      },
    });

    // Petrus Skills - 8 Skills total
    const fischerDerMenschen = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Fischer der Menschen',
        description: 'Lerne Menschen zu Jüngern zu machen.',
        levelRequirement: 1,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ service: 5, leadership: 5 }),
      },
    });

    const juengerschaft = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Jüngerschaft',
        description: 'Verstehe die Grundlagen der Jüngerschaft.',
        levelRequirement: 3,
        parentSkillId: fischerDerMenschen.id,
        skillType: 'TEMPLE_SERVICE',
        effect: JSON.stringify({ service: 10, leadership: 5 }),
      },
    });

    const gemeindeleitung = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Gemeindeleitung',
        description: 'Lerne, eine Gemeinde zu leiten und zu führen.',
        levelRequirement: 3,
        parentSkillId: fischerDerMenschen.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 10, service: 5 }),
      },
    });

    const prediger = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Prediger',
        description: 'Lerne, das Wort Gottes zu predigen und zu lehren.',
        levelRequirement: 5,
        parentSkillId: juengerschaft.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 10, wisdom: 10 }),
      },
    });

    const hirte = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Hirte der Herde',
        description: 'Werde zu einem Hirten, der seine Herde liebevoll führt.',
        levelRequirement: 7,
        parentSkillId: gemeindeleitung.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 15, service: 10 }),
      },
    });

    const bekennender = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Bekennender',
        description: 'Lerne, mutig für den Glauben einzutreten und zu bekennen.',
        levelRequirement: 6,
        parentSkillId: prediger.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 15, wisdom: 10 }),
      },
    });

    const apostel = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Apostel',
        description: 'Werde zu einem Apostel, der das Evangelium verkündet.',
        levelRequirement: 10,
        parentSkillId: hirte.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 20, service: 15 }),
      },
    });

    const fels = await prisma.skill.create({
      data: {
        skillTreeId: petrusSkillTree.id,
        name: 'Fels der Gemeinde',
        description: 'Werde zu einem festen Fundament für die Gemeinde.',
        levelRequirement: 12,
        parentSkillId: apostel.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 25, faith: 20 }),
      },
    });

    // Update Rabbi
    await prisma.rabbi.update({
      where: { id: petrusRabbi.id },
      data: { startingSkillTreeId: petrusSkillTree.id },
    });
  }

  if (moseRabbi) {
    // Delete existing skills for idempotency
    const existingTree = await prisma.skillTree.findFirst({
      where: { rabbiId: moseRabbi.id },
      include: { skills: true },
    });
    
    if (existingTree) {
      await prisma.skill.deleteMany({
        where: { skillTreeId: existingTree.id },
      });
      await prisma.skillTree.delete({
        where: { id: existingTree.id },
      });
    }

    const moseSkillTree = await prisma.skillTree.create({
      data: {
        rabbiId: moseRabbi.id,
        name: 'Mose - Weisheit und Führung',
        description: 'Lerne Weisheit und Führung durch Gottes Gesetz.',
      },
    });

    // Mose Skills - 8 Skills total
    const gesetzGottes = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Gesetz Gottes verstehen',
        description: 'Verstehe das Gesetz Gottes und seine Bedeutung.',
        levelRequirement: 1,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ wisdom: 5, knowledge: 5 }),
      },
    });

    const zehnGebote = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Zehn Gebote',
        description: 'Lerne die Zehn Gebote und ihre tiefe Bedeutung.',
        levelRequirement: 3,
        parentSkillId: gesetzGottes.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ wisdom: 10, knowledge: 5 }),
      },
    });

    const fuehrung = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Führung',
        description: 'Lerne, ein Volk zu führen und zu leiten.',
        levelRequirement: 3,
        parentSkillId: gesetzGottes.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 10, wisdom: 5 }),
      },
    });

    const prophet = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Prophet',
        description: 'Lerne, Gottes Wort zu verkünden und zu lehren.',
        levelRequirement: 5,
        parentSkillId: zehnGebote.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 10, wisdom: 10 }),
      },
    });

    const vermittler = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Vermittler',
        description: 'Lerne, zwischen Gott und den Menschen zu vermitteln.',
        levelRequirement: 6,
        parentSkillId: fuehrung.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 15, wisdom: 10 }),
      },
    });

    const weisheit = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Weisheit',
        description: 'Erlange göttliche Weisheit für schwierige Entscheidungen.',
        levelRequirement: 7,
        parentSkillId: prophet.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ wisdom: 20, knowledge: 10 }),
      },
    });

    const gesetzgeber = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Gesetzgeber',
        description: 'Werde zu einem Meister des göttlichen Gesetzes.',
        levelRequirement: 10,
        parentSkillId: weisheit.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ wisdom: 25, knowledge: 20 }),
      },
    });

    const anfuehrer = await prisma.skill.create({
      data: {
        skillTreeId: moseSkillTree.id,
        name: 'Anführer des Volkes',
        description: 'Werde zu einem großen Anführer wie Mose.',
        levelRequirement: 12,
        parentSkillId: vermittler.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 25, wisdom: 20 }),
      },
    });

    // Update Rabbi
    await prisma.rabbi.update({
      where: { id: moseRabbi.id },
      data: { startingSkillTreeId: moseSkillTree.id },
    });
  }

  if (davidRabbi) {
    // Delete existing skills for idempotency
    const existingTree = await prisma.skillTree.findFirst({
      where: { rabbiId: davidRabbi.id },
      include: { skills: true },
    });
    
    if (existingTree) {
      await prisma.skill.deleteMany({
        where: { skillTreeId: existingTree.id },
      });
      await prisma.skillTree.delete({
        where: { id: existingTree.id },
      });
    }

    const davidSkillTree = await prisma.skillTree.create({
      data: {
        rabbiId: davidRabbi.id,
        name: 'David - Anbetung und Führung',
        description: 'Lerne Anbetung und Führung von David.',
      },
    });

    // David Skills - 8 Skills total
    const anbetung = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Anbetung lernen',
        description: 'Lerne, Gott in Wahrheit anzubeten.',
        levelRequirement: 1,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 5, wisdom: 5 }),
      },
    });

    const psalmen = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Psalmen',
        description: 'Lerne die Psalmen zu verstehen und zu beten.',
        levelRequirement: 3,
        parentSkillId: anbetung.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 10, wisdom: 5 }),
      },
    });

    const kaempfer = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Kämpfer',
        description: 'Lerne, gegen die Feinde Gottes zu kämpfen.',
        levelRequirement: 3,
        parentSkillId: anbetung.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 10, faith: 5 }),
      },
    });

    const koenig = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'König',
        description: 'Lerne, als König zu regieren und zu führen.',
        levelRequirement: 5,
        parentSkillId: kaempfer.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 15, service: 10 }),
      },
    });

    const saenger = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Sänger',
        description: 'Lerne, Gott mit Liedern zu loben und zu preisen.',
        levelRequirement: 6,
        parentSkillId: psalmen.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 15, wisdom: 10 }),
      },
    });

    const buesser = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Büßer',
        description: 'Lerne, Buße zu tun und Vergebung zu empfangen.',
        levelRequirement: 7,
        parentSkillId: saenger.id,
        skillType: 'FRUIT_OF_SPIRIT',
        effect: JSON.stringify({ faith: 20, wisdom: 15 }),
      },
    });

    const nachGottesHerz = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Nach Gottes Herz',
        description: 'Werde zu einem Menschen nach Gottes eigenem Herzen.',
        levelRequirement: 10,
        parentSkillId: koenig.id,
        skillType: 'LEADERSHIP',
        effect: JSON.stringify({ leadership: 20, faith: 15 }),
      },
    });

    const anbeter = await prisma.skill.create({
      data: {
        skillTreeId: davidSkillTree.id,
        name: 'Anbeter',
        description: 'Werde zu einem großen Anbeter wie David.',
        levelRequirement: 12,
        parentSkillId: buesser.id,
        skillType: 'PROPHETIC',
        effect: JSON.stringify({ faith: 25, wisdom: 20 }),
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

