// Skill Tree Component gemäß Masterplan

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui';

interface SkillNode {
  id: string;
  name: string;
  description: string;
  levelRequirement: number;
  parentSkillId: string | null;
  skillType: string;
  effect: string;
  children?: SkillNode[];
}

interface SkillTreeProps {
  skillTree: SkillNode[];
  characterLevel: number;
  unlockedSkills: string[];
  onSkillUnlock: (skillId: string) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  skillTree,
  characterLevel,
  unlockedSkills,
  onSkillUnlock,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const isUnlocked = (skillId: string) => unlockedSkills.includes(skillId);
  const canUnlock = (skill: SkillNode) => {
    if (isUnlocked(skill.id)) return false;
    if (characterLevel < skill.levelRequirement) return false;
    if (skill.parentSkillId && !isUnlocked(skill.parentSkillId)) return false;
    return true;
  };

  const renderSkillNode = (skill: SkillNode, depth: number = 0) => {
    const unlocked = isUnlocked(skill.id);
    const canUnlockSkill = canUnlock(skill);
    const skillTypeColors: Record<string, string> = {
      PROPHETIC: 'text-purple-600',
      TONGUES: 'text-blue-600',
      FRUIT_OF_SPIRIT: 'text-green-600',
      TEMPLE_SERVICE: 'text-orange-600',
      LEADERSHIP: 'text-yellow-600',
    };

    return (
      <div key={skill.id} className="flex flex-col items-center">
        <div
          className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all ${
            unlocked
              ? 'bg-[var(--color-temple-gold)] border-[var(--color-temple-gold-dark)] text-white'
              : canUnlockSkill
              ? 'bg-gray-300 border-gray-400 text-gray-600 hover:bg-gray-400 hover:border-gray-500'
              : 'bg-gray-200 border-gray-300 text-gray-400 opacity-50'
          }`}
          onClick={() => {
            if (canUnlockSkill) {
              setSelectedSkill(skill);
            } else {
              setSelectedSkill(skill);
            }
          }}
          title={skill.name}
        >
          <span className="text-2xl font-bold">
            {skill.name.charAt(0)}
          </span>
          {skill.levelRequirement > characterLevel && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {skill.levelRequirement}
            </div>
          )}
        </div>
        <div className={`text-xs mt-1 text-center max-w-[80px] ${skillTypeColors[skill.skillType] || 'text-gray-600'}`}>
          {skill.name}
        </div>
        {skill.children && skill.children.length > 0 && (
          <div className="mt-4 flex flex-col items-center">
            <div className="w-0.5 h-4 bg-gray-400"></div>
            <div className="flex gap-4 mt-4">
              {skill.children.map((child) => renderSkillNode(child, depth + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fähigkeitsbaum</CardTitle>
      </CardHeader>
      <div className="p-6">
        <div className="flex flex-col items-center">
          {skillTree.map((skill) => renderSkillNode(skill))}
        </div>

        {selectedSkill && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">
              {selectedSkill.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              {selectedSkill.description}
            </p>
            <div className="text-xs text-[var(--text-secondary)] mb-4">
              <div>Level Requirement: {selectedSkill.levelRequirement}</div>
              <div>Type: {selectedSkill.skillType}</div>
            </div>
            {canUnlock(selectedSkill) && (
              <Button
                onClick={() => {
                  onSkillUnlock(selectedSkill.id);
                  setSelectedSkill(null);
                }}
                variant="primary"
                className="w-full"
              >
                Skill freischalten
              </Button>
            )}
            {isUnlocked(selectedSkill.id) && (
              <div className="text-sm text-green-600 font-semibold">
                ✓ Bereits freigeschaltet
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

