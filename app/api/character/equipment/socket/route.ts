// Socket System API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { socketStone, removeStone, upgradeStone } from '@/lib/api/socket';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { characterEquipmentId, action, stoneType, stoneLevel, stoneIndex } = body;

    if (!characterEquipmentId || !action) {
      return NextResponse.json(
        { error: 'Character Equipment ID und Action sind erforderlich' },
        { status: 400 }
      );
    }

    // Prüfe ob Character Equipment zum User gehört
    const characterEquipment = await prisma.characterEquipment.findUnique({
      where: { id: characterEquipmentId },
      include: {
        character: true,
      },
    });

    if (!characterEquipment || characterEquipment.character.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Equipment nicht gefunden oder gehört nicht zu dir' },
        { status: 404 }
      );
    }

    if (action === 'socket') {
      if (!stoneType) {
        return NextResponse.json(
          { error: 'Stone Type ist erforderlich' },
          { status: 400 }
        );
      }
      await socketStone(characterEquipmentId, stoneType, stoneLevel || 1);
      return NextResponse.json({
        message: 'Stein erfolgreich eingesetzt',
      });
    } else if (action === 'remove') {
      if (stoneIndex === undefined) {
        return NextResponse.json(
          { error: 'Stone Index ist erforderlich' },
          { status: 400 }
        );
      }
      await removeStone(characterEquipmentId, stoneIndex);
      return NextResponse.json({
        message: 'Stein erfolgreich entfernt',
      });
    } else if (action === 'upgrade') {
      if (stoneIndex === undefined) {
        return NextResponse.json(
          { error: 'Stone Index ist erforderlich' },
          { status: 400 }
        );
      }
      await upgradeStone(characterEquipmentId, stoneIndex);
      return NextResponse.json({
        message: 'Stein erfolgreich aufgewertet',
      });
    } else {
      return NextResponse.json(
        { error: 'Ungültige Action' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Socket error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Socket-Management' },
      { status: 500 }
    );
  }
}

