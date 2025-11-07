// Public Profile API - Get User Profile
// Social Foundation

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession();
    const { userId } = params;

    // Get user and character
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        characters: {
          include: {
            stats: true,
            fragments: true,
          },
        },
      },
    });

    if (!user || !user.characters[0]) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Check if profile is public (TODO: check UserPreferences)
    const isOwnProfile = session?.user?.id === userId;
    const isPublic = true; // TODO: Get from UserPreferences

    if (!isPublic && !isOwnProfile) {
      return NextResponse.json({ error: 'Profile is private' }, { status: 403 });
    }

    const character = user.characters[0];

    // Check if friend
    let isFriend = false;
    if (session?.user?.id) {
      const friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { userId: session.user.id, friendId: userId, status: 'ACCEPTED' },
            { userId: userId, friendId: session.user.id, status: 'ACCEPTED' },
          ],
        },
      });
      isFriend = !!friendship;
    }

    // Count achievements (TODO: Get from CharacterAchievement)
    const achievementsUnlocked = 0; // TODO
    const totalAchievements = 65;

    // Get streak (TODO: Get from StreakData)
    const streak = 0; // TODO

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.email,
      },
      character: {
        name: character.name,
        level: character.level,
        totalStrength: character.stats?.totalStrength || 0,
        stats: {
          faith: character.stats?.faith || 0,
          wisdom: character.stats?.wisdom || 0,
          knowledge: character.stats?.knowledge || 0,
          service: character.stats?.service || 0,
          leadership: character.stats?.leadership || 0,
        },
      },
      streak,
      achievementsUnlocked,
      totalAchievements,
      fragmentsCollected: character.fragments.length,
      isPublic,
      isFriend,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

