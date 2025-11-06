// Equipment API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getAllEquipment } from '@/lib/api/equipment';

export async function GET(request: NextRequest) {
  try {
    const equipment = await getAllEquipment();

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

