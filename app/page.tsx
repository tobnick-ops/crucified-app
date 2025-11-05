"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";

type FormState = {
  email: string;
  password: string;
};

type SubmissionState = {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
};

const initialForm: FormState = {
  email: "",
  password: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle", message: null });

  const isSubmitting = submission.status === "loading";

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmission({ status: "loading", message: null });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmission({ status: "error", message: payload.error ?? "Registrierung fehlgeschlagen" });
        return;
      }

      setForm(initialForm);
      setSubmission({ status: "success", message: "Registrierung erfolgreich! Du kannst dich jetzt anmelden." });
    } catch (error) {
      console.error("Registrierung fehlgeschlagen", error);
      setSubmission({ status: "error", message: "Netzwerkfehler. Bitte später erneut versuchen." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-10 rounded-3xl bg-white px-10 py-12 shadow-lg dark:bg-zinc-900">
        <header className="flex flex-col gap-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Willkommen
          </p>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">Erstelle deinen Account</h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Registriere dich mit deiner E-Mail-Adresse und einem sicheren Passwort.
          </p>
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-left">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">E-Mail-Adresse</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange("email")}
              autoComplete="email"
              required
              className="h-12 rounded-xl border border-zinc-200 px-4 text-base text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              placeholder="beispiel@mail.de"
              aria-describedby="email-help"
            />
            <span id="email-help" className="text-xs text-zinc-500 dark:text-zinc-400">
              Wir verwenden deine E-Mail nur für die Anmeldung.
            </span>
          </label>

          <label className="flex flex-col gap-2 text-left">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Passwort</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange("password")}
              autoComplete="new-password"
              required
              minLength={8}
              className="h-12 rounded-xl border border-zinc-200 px-4 text-base text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              placeholder="Mindestens 8 Zeichen"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-12 items-center justify-center rounded-xl bg-black text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-400 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isSubmitting ? "Wird gesendet..." : "Registrieren"}
          </button>
        </form>

        {submission.message ? (
          <div
            role="alert"
            className={`rounded-xl border px-4 py-3 text-sm ${
              submission.status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
            }`}
          >
            {submission.message}
          </div>
        ) : null}
      </main>
    </div>
  );
}
