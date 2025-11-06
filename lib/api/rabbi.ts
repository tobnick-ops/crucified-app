// Rabbi API Client gemäß Masterplan

import { prisma } from '@/lib/prisma';

export interface RabbiWithDetails {
  id: string;
  name: string;
  description: string;
  startingBookId: string | null;
  startingSkillTreeId: string | null;
  iconPath: string | null;
  startingBook?: {
    id: string;
    name: string;
    abbreviation: string;
  } | null;
  startingSkillTree?: {
    id: string;
    name: string;
    description: string;
    skills: SkillNode[];
  } | null;
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  levelRequirement: number;
  parentSkillId: string | null;
  skillType: string;
  effect: string;
  children?: SkillNode[];
}

/**
 * Get all available Rabbis
 */
export async function getAllRabbis(): Promise<RabbiWithDetails[]> {
  const rabbis = await prisma.rabbi.findMany({
    include: {
      startingBook: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
      startingSkillTree: {
        include: {
          skills: {
            orderBy: [
              { levelRequirement: 'asc' },
              { parentSkillId: 'asc' },
            ],
          },
        },
      },
    },
  });

  return rabbis.map((rabbi: { id: string; name: string; description: string; startingBookId: string | null; startingSkillTreeId: string | null; iconPath: string | null; startingBook: { id: string; name: string; abbreviation: string } | null; startingSkillTree: { id: string; name: string; description: string; skills: unknown[] } | null }) => ({
    id: rabbi.id,
    name: rabbi.name,
    description: rabbi.description,
    startingBookId: rabbi.startingBookId,
    startingSkillTreeId: rabbi.startingSkillTreeId,
    iconPath: rabbi.iconPath,
    startingBook: rabbi.startingBook,
    startingSkillTree: rabbi.startingSkillTree
      ? {
          id: rabbi.startingSkillTree.id,
          name: rabbi.startingSkillTree.name,
          description: rabbi.startingSkillTree.description,
          skills: buildSkillTree(rabbi.startingSkillTree.skills),
        }
      : null,
  }));
}

/**
 * Build hierarchical skill tree from flat list
 */
function buildSkillTree(skills: any[]): SkillNode[] {
  const skillMap = new Map<string, SkillNode>();
  const rootSkills: SkillNode[] = [];

  // First pass: create all skill nodes
  skills.forEach((skill) => {
    const node: SkillNode = {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      levelRequirement: skill.levelRequirement,
      parentSkillId: skill.parentSkillId,
      skillType: skill.skillType,
      effect: skill.effect,
      children: [],
    };
    skillMap.set(skill.id, node);
  });

  // Second pass: build tree structure
  skills.forEach((skill) => {
    const node = skillMap.get(skill.id)!;
    if (skill.parentSkillId) {
      const parent = skillMap.get(skill.parentSkillId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    } else {
      rootSkills.push(node);
    }
  });

  return rootSkills;
}

/**
 * Get character's skill progress
 */
export async function getCharacterSkillProgress(characterId: string) {
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      currentRabbi: {
        include: {
          startingSkillTree: {
            include: {
              skills: {
                orderBy: [
                  { levelRequirement: 'asc' },
                  { parentSkillId: 'asc' },
                ],
              },
            },
          },
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!character || !character.currentRabbi) {
    return null;
  }

  const skillTree = character.currentRabbi.startingSkillTree;
  if (!skillTree) {
    return null;
  }

  const unlockedSkills = new Set(
    character.skills.map((cs: { skillId: string }) => cs.skillId)
  );

  return {
    skillTree: buildSkillTree(skillTree.skills),
    unlockedSkills: Array.from(unlockedSkills),
    characterSkills: character.skills.map((cs: { skillId: string; level: number; unlockedAt: Date }) => ({
      skillId: cs.skillId,
      level: cs.level,
      unlockedAt: cs.unlockedAt,
    })),
  };
}

