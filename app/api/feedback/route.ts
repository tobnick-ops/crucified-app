import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Feedback speichern (für Beta-Testing)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, message, rating, timestamp } = body;

    // Validiere Input
    if (!type || !message) {
      return NextResponse.json(
        { error: 'Type und Message sind erforderlich' },
        { status: 400 }
      );
    }

    // In Production: Speichere in Database
    // Für Beta: Logge für jetzt (später in DB speichern)
    console.log('Feedback received:', {
      type,
      message,
      rating,
      timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    // Optional: Speichere in Database (wenn Feedback-Tabelle existiert)
    // await prisma.feedback.create({
    //   data: {
    //     type,
    //     message,
    //     rating,
    //     timestamp: new Date(timestamp),
    //   },
    // });

    return NextResponse.json(
      { success: true, message: 'Feedback erfolgreich übermittelt' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback API Error:', error);
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten des Feedbacks' },
      { status: 500 }
    );
  }
}

// Feedback abrufen (Admin-only, später)
export async function GET(request: NextRequest) {
  // TODO: Implementiere Admin-Authentifizierung
  // Für jetzt: Return empty array
  return NextResponse.json({ feedback: [] });
}

