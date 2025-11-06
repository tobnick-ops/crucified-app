// Equipment Sets API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getAllSets } from '@/lib/api/sets';

export async function GET(request: NextRequest) {
  try {
    const sets = await getAllSets();

    return NextResponse.json({
      sets,
    });
  } catch (error) {
    console.error('Sets error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Sets' },
      { status: 500 }
    );
  }
}

