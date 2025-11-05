"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validators";
import { verifyPassword } from "@/lib/auth";

export type AuthFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export const initialLoginState: AuthFormState = {
  status: "idle",
};

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Bitte Eingaben prüfen.",
      fieldErrors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        status: "error",
        message: "Ungültige Anmeldedaten.",
      };
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash);

    if (!passwordMatches) {
      return {
        status: "error",
        message: "Ungültige Anmeldedaten.",
        fieldErrors: { password: "Falsches Passwort." },
      };
    }

    createSession({ userId: user.id, email: user.email });

    redirect("/dashboard");
  } catch (error) {
    console.error("loginAction", error);

    return {
      status: "error",
      message: "Unerwarteter Fehler. Bitte später erneut versuchen.",
    };
  }

  return {
    status: "idle",
  };
}
