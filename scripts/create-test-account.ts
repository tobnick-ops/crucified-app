import {
  PrismaClient,
  LessonStatus,
  MissionStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_EMAIL = process.env.TEST_ACCOUNT_EMAIL ?? "test@crucified.app";
const DEFAULT_PASSWORD = process.env.TEST_ACCOUNT_PASSWORD ?? "Test123456";
const DEFAULT_NAME = process.env.TEST_ACCOUNT_NAME ?? "Testing Account";

async function ensureTestUser() {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: DEFAULT_EMAIL },
    update: {
      passwordHash,
      name: DEFAULT_NAME,
    },
    create: {
      email: DEFAULT_EMAIL,
      passwordHash,
      name: DEFAULT_NAME,
    },
  });

  console.info(`👤 Test-User bereit (ID: ${user.id})`);
  return user;
}

async function ensureTestCharacter(userId: string) {
  const character = await prisma.character.upsert({
    where: { userId },
    update: {
      name: "Testcharakter",
      title: "Pionier",
      level: 3,
      experience: 180,
      coins: 250,
      biography: "Automatisch generierter Testcharakter für Integrations-Tests.",
    },
    create: {
      userId,
      name: "Testcharakter",
      title: "Pionier",
      level: 3,
      experience: 180,
      coins: 250,
      biography: "Automatisch generierter Testcharakter für Integrations-Tests.",
    },
  });

  console.info(`🛡️  Test-Charakter bereit (ID: ${character.id})`);
  return character;
}

async function seedProgress(characterId: string) {
  const [lesson, mission, skill] = await Promise.all([
    prisma.lesson.findFirst({ orderBy: { difficulty: "asc" } }),
    prisma.mission.findFirst({ orderBy: { rewardXp: "asc" } }),
    prisma.skill.findFirst({ orderBy: { maxLevel: "desc" } }),
  ]);

  if (lesson) {
    await prisma.lessonProgress.upsert({
      where: {
        characterId_lessonId: {
          characterId,
          lessonId: lesson.id,
        },
      },
      update: {
        status: LessonStatus.COMPLETED,
        completedAt: new Date(),
      },
      create: {
        characterId,
        lessonId: lesson.id,
        status: LessonStatus.COMPLETED,
        completedAt: new Date(),
      },
    });
  }

  if (mission) {
    await prisma.missionProgress.upsert({
      where: {
        characterId_missionId: {
          characterId,
          missionId: mission.id,
        },
      },
      update: {
        status: MissionStatus.ACTIVE,
        startedAt: new Date(),
      },
      create: {
        characterId,
        missionId: mission.id,
        status: MissionStatus.ACTIVE,
        startedAt: new Date(),
      },
    });
  }

  if (skill) {
    await prisma.characterSkill.upsert({
      where: {
        characterId_skillId: {
          characterId,
          skillId: skill.id,
        },
      },
      update: {
        level: 2,
      },
      create: {
        characterId,
        skillId: skill.id,
        level: 2,
      },
    });
  }
}

async function run() {
  const user = await ensureTestUser();
  const character = await ensureTestCharacter(user.id);
  await seedProgress(character.id);

  console.info("✅ Test-Account vollständig eingerichtet:");
  console.info(`   E-Mail:    ${DEFAULT_EMAIL}`);
  console.info(`   Passwort:  ${DEFAULT_PASSWORD}`);
}

run()
  .catch((error) => {
    console.error("❌ Erstellung des Test-Accounts fehlgeschlagen:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
