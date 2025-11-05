"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import {
  AuthFormState,
  initialRegisterState,
  registerAction,
} from "@/app/(auth)/register/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Wird gesendet..." : label}
    </button>
  );
}

function ErrorMessage({ state }: { state: AuthFormState }) {
  if (state.status !== "error" || !state.message) {
    return null;
  }

  return (
    <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
      {state.message}
    </p>
  );
}

export function RegisterForm() {
  const [state, action] = useFormState<AuthFormState, FormData>(
    registerAction,
    initialRegisterState,
  );

  return (
    <form action={action} className="space-y-6">
      <ErrorMessage state={state} />

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          E-Mail-Adresse
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
        />
        {state.fieldErrors?.email ? (
          <p className="text-xs text-red-300">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
        />
        {state.fieldErrors?.password ? (
          <p className="text-xs text-red-300">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-200">
          Passwort bestätigen
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
        />
        {state.fieldErrors?.confirmPassword ? (
          <p className="text-xs text-red-300">
            {state.fieldErrors.confirmPassword}
          </p>
        ) : null}
      </div>

      <SubmitButton label="Registrieren" />

      <p className="text-center text-sm text-slate-300">
        Bereits registriert?{" "}
        <Link href="/login" className="font-medium text-white underline">
          Zur Anmeldung
        </Link>
      </p>
    </form>
  );
}
