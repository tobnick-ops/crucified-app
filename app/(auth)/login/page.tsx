import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Anmeldung",
};

export default function LoginPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Willkommen zurück</h1>
        <p className="text-sm text-slate-300">
          Melde dich an, um auf dein Dashboard zuzugreifen.
        </p>
      </div>
      <LoginForm />
    </section>
  );
}
