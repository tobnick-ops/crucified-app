// Fragments API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getAllFragments } from '@/lib/api/fragments';

export async function GET(request: NextRequest) {
  try {
    const fragments = await getAllFragments();

    return NextResponse.json({
      fragments,
    });
  } catch (error) {
    console.error('Fragments error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Fragmente' },
      { status: 500 }
    );
  }
}

