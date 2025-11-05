import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Registrierung",
};

export default function RegisterPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Konto erstellen</h1>
        <p className="text-sm text-slate-300">
          Fülle das Formular aus, um ein neues Konto zu erstellen.
        </p>
      </div>
      <RegisterForm />
    </section>
  );
}
