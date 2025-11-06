// Leaderboard API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/api/leaderboard';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') || 'total') as 'total' | 'level' | 'collection' | 'faith' | 'completion';
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const leaderboard = await getLeaderboard(category, limit);

    return NextResponse.json({
      leaderboard,
      category,
      limit,
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden des Leaderboards' },
      { status: 500 }
    );
  }
}

