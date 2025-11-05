"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { registerSchema } from "@/lib/validators";

export type AuthFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"email" | "password" | "confirmPassword", string>>;
};

export const initialRegisterState: AuthFormState = {
  status: "idle",
};

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Bitte Eingaben prüfen.",
      fieldErrors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  try {
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    createSession({ userId: user.id, email: user.email });

    redirect("/dashboard");
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        status: "error",
        message: "Diese E-Mail ist bereits registriert.",
        fieldErrors: { email: "E-Mail wird bereits verwendet." },
      };
    }

    console.error("registerAction", error);

    return {
      status: "error",
      message: "Unerwarteter Fehler. Bitte später erneut versuchen.",
    };
  }

  return {
    status: "idle",
  };
}
