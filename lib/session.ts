import { cookies } from "next/headers";

import {
  SessionPayload,
  createSessionToken,
  getSessionCookieOptions,
  verifySessionToken,
} from "./auth";

const cookieConfig = getSessionCookieOptions();

export function createSession(payload: SessionPayload) {
  const token = createSessionToken(payload);
  const cookieStore = cookies();

  cookieStore.set(cookieConfig.name, token, {
    maxAge: cookieConfig.maxAge,
    path: cookieConfig.path,
    httpOnly: cookieConfig.httpOnly,
    sameSite: cookieConfig.sameSite,
    secure: cookieConfig.secure,
  });
}

export function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete(cookieConfig.name);
}

export function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(cookieConfig.name)?.value;

  if (!token) return null;

  return verifySessionToken(token);
}
