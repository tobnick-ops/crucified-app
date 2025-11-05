import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

type RegisterPayload = {
  email?: unknown;
  password?: unknown;
};

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function POST(request: Request) {
  let payload: RegisterPayload;

  try {
    payload = (await request.json()) as RegisterPayload;
  } catch (cause) {
    console.error("Ungültiger JSON-Body", cause);
    return NextResponse.json({ error: "Ungültiger JSON-Body" }, { status: 400 });
  }

  const rawEmail = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  if (!EMAIL_REGEX.test(rawEmail)) {
    return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse angeben" }, { status: 422 });
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen haben` },
      { status: 422 },
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email: rawEmail } });

    if (existingUser) {
      return NextResponse.json({ error: "E-Mail wird bereits verwendet" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: rawEmail,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registrierung fehlgeschlagen", error);
    return NextResponse.json({ error: "Unerwarteter Fehler" }, { status: 500 });
  }
}
