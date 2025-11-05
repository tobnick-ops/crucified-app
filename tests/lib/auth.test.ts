import { beforeEach, describe, expect, it } from "vitest";

import {
  createSessionToken,
  getSessionCookieOptions,
  hashPassword,
  verifyPassword,
  verifySessionToken,
} from "@/lib/auth";

describe("auth utils", () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = "test-secret";
  });

  it("hasht Passwörter und verifiziert sie korrekt", async () => {
    const plain = "Secret123";
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash).toMatch(/\$2[aby]\$/);

    const isValid = await verifyPassword(plain, hash);
    const isInvalid = await verifyPassword("Wrong123", hash);

    expect(isValid).toBe(true);
    expect(isInvalid).toBe(false);
  });

  it("erstellt valide Session-Tokens", () => {
    const token = createSessionToken({
      userId: "user-1",
      email: "user@example.com",
    });

    const session = verifySessionToken(token);

    expect(session).not.toBeNull();
    expect(session?.userId).toBe("user-1");
    expect(session?.email).toBe("user@example.com");
    expect(typeof session?.exp).toBe("number");
  });

  it("gibt null für ungültige Tokens zurück", () => {
    const invalid = verifySessionToken("invalid");

    expect(invalid).toBeNull();
  });

  it("liefert sichere Cookie-Optionen", () => {
    const options = getSessionCookieOptions();

    expect(options.name).toBe("auth-session");
    expect(options.httpOnly).toBe(true);
    expect(options.path).toBe("/");
    expect(options.sameSite).toBe("lax");
  });
});
