// Character View Page gemäß Masterplan

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CharacterAvatar } from '@/components/character/CharacterAvatar';
import { StatsDisplay } from '@/components/character/StatsDisplay';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default async function CharacterPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  // Lade Character
  const character = await prisma.character.findFirst({
    where: { userId: session.user.id },
    include: {
      stats: true,
      currentRabbi: true,
    },
  });

  if (!character) {
    redirect('/character/create');
  }

  // Berechne XP für nächstes Level
  const { getXPForLevel } = await import('@/lib/game/formulas');
  const currentXP = character.experience;
  const currentLevelXP = getXPForLevel(character.level);
  const nextLevelXP = getXPForLevel(character.level + 1);
  const xpForNextLevel = nextLevelXP - currentLevelXP;
  const currentXPProgress = currentXP - currentLevelXP;

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-3xl">Dein Charakter</CardTitle>
          </CardHeader>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Character Avatar */}
              <div className="flex-shrink-0">
                <CharacterAvatar
                  characterName={character.name}
                  level={character.level}
                  size="lg"
                />
              </div>

              {/* Character Stats */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {character.name}
                  </h2>
                  {character.currentRabbi && (
                    <p className="text-[var(--text-secondary)]">
                      Rabbi: <span className="font-semibold">{character.currentRabbi.name}</span>
                    </p>
                  )}
                </div>

                {/* Level Progress */}
                <div>
                  <ProgressBar
                    current={currentXPProgress}
                    max={xpForNextLevel}
                    label={`Level ${character.level}`}
                    showPercentage
                    color="gold"
                  />
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {currentXPProgress} / {xpForNextLevel} XP bis Level {character.level + 1}
                  </p>
                </div>

                {/* Stats */}
                {character.stats && (
                  <StatsDisplay
                    stats={{
                      faith: character.stats.faith,
                      wisdom: character.stats.wisdom,
                      knowledge: character.stats.knowledge,
                      service: character.stats.service,
                      leadership: character.stats.leadership,
                      totalStrength: character.strength,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

