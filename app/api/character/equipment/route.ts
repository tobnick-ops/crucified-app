// Character Equipment API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCharacterEquipment, equipItem, unequipItem } from '@/lib/api/equipment';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }

    // Lade Character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (!character) {
      return NextResponse.json(
        { error: 'Charakter nicht gefunden' },
        { status: 404 }
      );
    }

    const equipment = await getCharacterEquipment(character.id);

    return NextResponse.json({
      equipment,
    });
  } catch (error) {
    console.error('Equipment error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Ausrüstung' },
      { status: 500 }
    );
  }
}

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
    const { equipmentId, slot, action } = body;

    if (!equipmentId || !slot || !action) {
      return NextResponse.json(
        { error: 'Equipment ID, Slot und Action sind erforderlich' },
        { status: 400 }
      );
    }

    // Lade Character
    const character = await prisma.character.findFirst({
      where: { userId: session.user.id },
    });

    if (!character) {
      return NextResponse.json(
        { error: 'Charakter nicht gefunden' },
        { status: 404 }
      );
    }

    if (action === 'equip') {
      await equipItem(character.id, equipmentId, slot);
      return NextResponse.json({
        message: 'Item erfolgreich angelegt',
      });
    } else if (action === 'unequip') {
      await unequipItem(character.id, slot);
      return NextResponse.json({
        message: 'Item erfolgreich abgelegt',
      });
    } else {
      return NextResponse.json(
        { error: 'Ungültige Action' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Equipment error:', error);
    return NextResponse.json(
      { error: error.message || 'Fehler beim Anlegen/Ablegen des Items' },
      { status: 500 }
    );
  }
}

