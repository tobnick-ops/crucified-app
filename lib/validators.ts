import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "E-Mail ist erforderlich").email("Ungültige E-Mail"),
    password: z
      .string()
      .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
        message: "Passwort benötigt Groß-/Kleinbuchstaben und eine Zahl",
      }),
    confirmPassword: z.string().min(8, "Bitte Passwort bestätigen"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "E-Mail ist erforderlich").email("Ungültige E-Mail"),
  password: z.string().min(1, "Passwort ist erforderlich"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
