import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 Stunden

export type SessionPayload = {
  userId: string;
  email: string;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "AUTH_SECRET (oder NEXTAUTH_SECRET) ist nicht gesetzt. Bitte .env konfigurieren.",
      );
    }

    return "development-secret";
  }

  return secret;
}

export async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 12);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function createSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getAuthSecret(), {
    expiresIn: SESSION_MAX_AGE_SECONDS,
  });
}

export function verifySessionToken(token: string): (SessionPayload & JwtPayload) | null {
  try {
    return jwt.verify(token, getAuthSecret()) as SessionPayload & JwtPayload;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  const maxAge = SESSION_MAX_AGE_SECONDS;

  return {
    name: "auth-session",
    maxAge,
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}
