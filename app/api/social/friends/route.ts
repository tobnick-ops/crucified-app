// Friends API - Get Friends List & Pending Requests
// Social Foundation

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    // Get friends (accepted)
    const acceptedFriendships = await prisma.friendship.findMany({
      where: {
        userId: session.user.id,
        status: 'ACCEPTED',
      },
    });

    // Get pending requests
    const pendingFriendships = await prisma.friendship.findMany({
      where: {
        friendId: session.user.id,
        status: 'PENDING',
      },
    });

    // Fetch friend details
    const friendIds = acceptedFriendships.map(f => f.friendId);
    const friends = await prisma.user.findMany({
      where: { id: { in: friendIds } },
      include: {
        characters: {
          include: {
            stats: true,
          },
        },
      },
    });

    const pendingIds = pendingFriendships.map(f => f.userId);
    const pending = await prisma.user.findMany({
      where: { id: { in: pendingIds } },
      include: {
        characters: {
          include: {
            stats: true,
          },
        },
      },
    });

    return NextResponse.json({
      friends: friends.map(f => ({
        id: f.id,
        name: f.email,
        characterName: f.characters[0]?.name || 'Unknown',
        level: f.characters[0]?.level || 1,
        totalStrength: f.characters[0]?.stats?.totalStrength || 0,
        streak: 0, // TODO: Get from StreakData
      })),
      pending: pending.map(p => ({
        id: p.id,
        name: p.email,
        characterName: p.characters[0]?.name || 'Unknown',
        level: p.characters[0]?.level || 1,
        totalStrength: p.characters[0]?.stats?.totalStrength || 0,
        streak: 0,
      })),
    });
  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add Friend
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { friendId } = await request.json();

    // Create friend request
    await prisma.friendship.create({
      data: {
        userId: session.user.id,
        friendId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
  }
}

