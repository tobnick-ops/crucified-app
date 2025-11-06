import { PrismaClient, EquipmentSlot, Rarity } from "@prisma/client";

const prisma = new PrismaClient();

const lessons = [
  {
    slug: "einfuhrung-glaube",
    title: "Einführung in den Glauben",
    summary: "Überblick über die Grundpfeiler des Glaubenslebens.",
    difficulty: 1,
  },
  {
    slug: "gebet-grundlagen",
    title: "Grundlagen des Gebets",
    summary: "Praktische Schritte für ein konsequentes Gebetsleben.",
    difficulty: 2,
  },
  {
    slug: "charakter-entwicklung",
    title: "Charakterentwicklung",
    summary: "Wie geistliche Disziplinen beim Wachstum helfen.",
    difficulty: 3,
  },
];

const missions = [
  {
    code: "mission_daily_prayer",
    title: "Tägliches Gebet",
    summary: "Bete an drei verschiedenen Zeitpunkten des Tages.",
    rewardXp: 50,
  },
  {
    code: "mission_scripture_memorization",
    title: "Schrift auswendig lernen",
    summary: "Lerne einen Vers auswendig und teile ihn mit einem Freund.",
    rewardXp: 75,
  },
  {
    code: "mission_service_project",
    title: "Dienstprojekt",
    summary: "Plane eine konkrete Hilfsaktion für deine Gemeinschaft.",
    rewardXp: 120,
  },
];

const sets = [
  {
    code: "set_pilgrim",
    name: "Pilger-Set",
    description: "Unterstützt auf dem Weg durch geistliche Wüsten.",
    bonus: "+10% Erfahrung aus Missionen",
  },
  {
    code: "set_scholar",
    name: "Gelehrten-Set",
    description: "Fokussiert auf Studium und Lehre.",
    bonus: "+1 Skill-Punkt bei abgeschlossenen Lektionen",
  },
];

const equipment = [
  {
    code: "equip_pilgrim_hood",
    name: "Pilgerhaube",
    slot: EquipmentSlot.HEAD,
    rarity: Rarity.UNCOMMON,
    description: "Bietet Schutz und Fokus beim Gebet.",
    setCode: "set_pilgrim",
  },
  {
    code: "equip_pilgrim_cloak",
    name: "Pilgermantel",
    slot: EquipmentSlot.CHEST,
    rarity: Rarity.UNCOMMON,
    description: "Hält dich auf Reisen warm und konzentriert.",
    setCode: "set_pilgrim",
  },
  {
    code: "equip_scholar_quill",
    name: "Schreiberfeder des Gelehrten",
    slot: EquipmentSlot.MAIN_HAND,
    rarity: Rarity.RARE,
    description: "Erhöht die Lerngeschwindigkeit bei Studienlektionen.",
    setCode: "set_scholar",
  },
];

const skills = [
  {
    code: "skill_faith_resolve",
    name: "Glaubensstandhaftigkeit",
    description: "Erhöht die Resistenz gegen Rückschläge.",
    category: "Charakter",
    maxLevel: 5,
  },
  {
    code: "skill_scripture_mastery",
    name: "Schriftbeherrschung",
    description: "Verbessert das Verständnis für Lektionen.",
    category: "Lehre",
    maxLevel: 5,
  },
  {
    code: "skill_servant_leadership",
    name: "Dienende Leitung",
    description: "Steigert die Belohnungen aus Gruppenmissionen.",
    category: "Dienst",
    maxLevel: 5,
  },
];

const fragments = [
  {
    code: "fragment_scroll",
    name: "Fragment einer Schriftrolle",
    category: "Sammlung",
    description: "Teil eines alten Manuskripts.",
  },
  {
    code: "fragment_coin",
    name: "Antike Münze",
    category: "Sammlung",
    description: "Ein Erinnerungsstück aus der frühen Kirche.",
  },
];

async function seedLessons() {
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        summary: lesson.summary,
        difficulty: lesson.difficulty,
      },
      create: lesson,
    });
  }
}

async function seedMissions() {
  for (const mission of missions) {
    await prisma.mission.upsert({
      where: { code: mission.code },
      update: {
        title: mission.title,
        summary: mission.summary,
        rewardXp: mission.rewardXp,
      },
      create: mission,
    });
  }
}

async function seedSets() {
  for (const set of sets) {
    await prisma.set.upsert({
      where: { code: set.code },
      update: {
        name: set.name,
        description: set.description,
        bonus: set.bonus,
      },
      create: set,
    });
  }
}

async function seedEquipment() {
  const existingSets = await prisma.set.findMany();
  const setMap = new Map(existingSets.map((set) => [set.code, set]));

  for (const item of equipment) {
    const set = item.setCode ? setMap.get(item.setCode) : undefined;

    await prisma.equipment.upsert({
      where: { code: item.code },
      update: {
        name: item.name,
        slot: item.slot,
        rarity: item.rarity,
        description: item.description,
        setId: set?.id,
      },
      create: {
        code: item.code,
        name: item.name,
        slot: item.slot,
        rarity: item.rarity,
        description: item.description,
        setId: set?.id,
      },
    });
  }
}

async function seedSkills() {
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { code: skill.code },
      update: {
        name: skill.name,
        description: skill.description,
        category: skill.category,
        maxLevel: skill.maxLevel,
      },
      create: skill,
    });
  }
}

async function seedFragments() {
  for (const fragment of fragments) {
    await prisma.fragment.upsert({
      where: { code: fragment.code },
      update: {
        name: fragment.name,
        category: fragment.category,
        description: fragment.description,
      },
      create: fragment,
    });
  }
}

async function main() {
  console.info("🌱 Starte Seeding der Referenzdaten...");
  await seedLessons();
  await seedMissions();
  await seedSets();
  await seedEquipment();
  await seedSkills();
  await seedFragments();
  console.info("✅ Seeding abgeschlossen.");
}

main()
  .catch((error) => {
    console.error("❌ Seeding fehlgeschlagen:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
