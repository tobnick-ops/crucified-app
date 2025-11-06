// Rabbi API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getAllRabbis } from '@/lib/api/rabbi';

export async function GET(request: NextRequest) {
  try {
    const rabbis = await getAllRabbis();

    return NextResponse.json({
      rabbis,
    });
  } catch (error) {
    console.error('Rabbi error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Rabbis' },
      { status: 500 }
    );
  }
}

