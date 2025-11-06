// Registration API Route gemäß Masterplan

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, Password und Name sind erforderlich' },
        { status: 400 }
      );
    }

    // Prüfe ob User bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email bereits registriert' },
        { status: 400 }
      );
    }

    // Passwort hashen
    const passwordHash = await bcrypt.hash(password, 10);

    // User erstellen
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    // Character wird auf Character-Creation Seite erstellt (nur Rabbi-Auswahl)
    // Name aus Signup wird in temp storage gespeichert

    return NextResponse.json(
      { 
        message: 'Registrierung erfolgreich',
        user: { id: user.id, email: user.email },
        tempName: name, // Name wird im Frontend gespeichert
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registrierung fehlgeschlagen' },
      { status: 500 }
    );
  }
}

